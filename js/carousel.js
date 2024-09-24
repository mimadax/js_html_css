class Carousel {
    constructor(rootElement) {
      this.root = rootElement;  // Élément racine du carrousel
      this.itemsContainer = this.root.querySelector(".items");  // Conteneur des slides
      this.currentIndex = 0;  // On commence par la première image
      this.maxIndex = this.itemsContainer.children.length - 1;  // Dernière image
      this.slideWidth = 640;  // Largeur d'une slide (par exemple, 640px)
      this.prevBtn = this.root.querySelector(".btn.prev button");
      this.nextBtn = this.root.querySelector(".btn.next button");
  
      // Ajouter les écouteurs d'événements
      this.addEventListeners();
    }
  
    // Méthode pour passer à la slide suivante
    next() {
      if (this.currentIndex < this.maxIndex) {
        this.currentIndex++;
        this.updateCarousel();
      }
    }
  
    // Méthode pour revenir à la slide précédente
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateCarousel();
      }
    }
  
    // Méthode pour mettre à jour l'affichage du carrousel
    updateCarousel() {
      const translateX = -(this.currentIndex * this.slideWidth);  // Calcul du décalage
      this.itemsContainer.style.transform = `translateX(${translateX}px)`;  // Appliquer la transformation
    }
  
    // Attacher les événements de clic aux boutons "Suivant" et "Précédent"
    addEventListeners() {
      this.nextBtn.addEventListener("click", () => this.next());
      this.prevBtn.addEventListener("click", () => this.prev());
    }
  }
  
  // Instanciation du carrousel
  const myCarousel = new Carousel(document.querySelector(".slider"));