document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
  
    if (token === null) {
      // Rediriger vers la page de login si pas de token
      window.location.href = "login.html";
      return;
    }
  
    try {
      const res = await fetch("http://localhost:8000/api/articles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        // Si l'authentification échoue, rediriger vers la page de login
        window.location.href = "login.html";
        return;
      }
  
      const data = await res.json();
      const articles = data["hydra:member"];
      const articlesList = document.querySelector("#articles-list");
  
      // Insérer les articles dans la page
      articles.forEach(article => {
        const li = document.createElement("li");
        li.textContent = article.title;
        articlesList.appendChild(li);
      });
  
    } catch (err) {
      console.error("Erreur lors de la récupération des articles :", err);
      window.location.href = "login.html";  // Rediriger en cas d'erreur
    }
  });
  
  // Fonction de déconnexion
  function logout() {
    localStorage.removeItem("token");  // Supprimer le token JWT
    window.location.href = "login.html";  // Rediriger vers la page de login
  }