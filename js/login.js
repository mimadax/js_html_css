document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector('#login-form');
  const errorDiv = document.querySelector("#error");  // Récupérer la div pour les erreurs

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Masquer l'erreur au début de chaque tentative
    errorDiv.classList.add("hidden");

    const formData = new FormData(loginForm);
    const username = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:8000/api/login_check", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.status >= 400) {
        const data = await res.json();
        errorDiv.innerText = data.error || "Erreur lors de la connexion";  // Afficher le message d'erreur
        errorDiv.classList.remove("hidden");  // Afficher la div d'erreur
        errorDiv.style.color = "red";  // Afficher les erreurs en rouge
        return;
      }

      // Si la connexion est réussie
      const data = await res.json();
      localStorage.setItem("token", data.token);  // Stocker le JWT
      window.location.href = "index.html";  // Redirection vers la page principale

    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      errorDiv.innerText = "Erreur de connexion, veuillez réessayer.";
      errorDiv.classList.remove("hidden");
    }
  });
});
