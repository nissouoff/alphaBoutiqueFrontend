
import { go } from "../router/router.js";  // chemin relatif correct



document.querySelectorAll('.contenu-a div').forEach((element) => {
    element.addEventListener('click', function() {
        this.classList.toggle('active'); // Activer ou désactiver la classe active au tap
    });
});

const API_URL = "http://localhost:3000"; // URL backend Node


async function autoLoginCheck() {
    try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
            method: "GET",
            credentials: "include" // 🔑 obligatoire
        });

        if (res.ok) {
            await go("penal"); // go doit retourner une promesse

            // importer dynamiquement le JS de login1
            const module = await import("./src/js/penal.js");
            module.initLogin(); // initialise tous les événements et fonctions de la page

            // exposer go si besoin
            window.go = go;
        }
    } catch (e) {
        console.log("Pas connecté, rester sur login");
    }
}

autoLoginCheck();

document.getElementById("star").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    const target = document.getElementById("cont");
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset; // Position de la section cible
    const startPosition = window.pageYOffset; // Position actuelle
    const distance = targetPosition - startPosition; // Distance à parcourir
    const duration = 1000; // Durée du défilement en millisecondes
    let startTime = null;
    
    // Afficher les éléments au début
    document.getElementById("contenu").style.display = 'flex';
    document.getElementById("contenu2").style.display = 'flex';

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Progrès de l'animation (0 à 1)
        const ease = easeInOutQuad(progress); // Fonction d'accélération
        window.scrollTo(0, startPosition + (distance * ease)); // Défilement

        // Continue l'animation si elle n'est pas encore terminée
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            // Changer la position de défilement à la fin
            window.scrollTo(0, 0); // Se déplacer vers le haut de la page

            // Masquer l'élément 'hero' une fois le défilement terminé
            document.getElementById("hero").style.display = 'none';
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // Fonction d'accélération
    }

    requestAnimationFrame(animation); // Démarre l'animation
});




let clickCount = 0; // compteur de clics

document.getElementById("btn")?.addEventListener("click", async function(event) {
    event.preventDefault(); // Empêche le comportement par défaut
    clickCount++;

    if (clickCount === 1) {
        // ===== ANIMATION SCROLL ET AFFICHAGE SECTIONS =====
        const currentScrollPosition = window.pageYOffset;

        const contenu3 = document.getElementById("contenu3");
        const contenu2 = document.getElementById("contenu2");
        const contenu4 = document.getElementById("contenu4");
        const footer = document.getElementById("footer");

        if (contenu3) contenu3.style.display = "block";
        if (contenu4) contenu4.style.display = "block";
        if (footer) footer.style.display = "block";

        const targetPosition = contenu2?.getBoundingClientRect().top + window.pageYOffset || 0;
        const duration = 1000;
        const startPosition = currentScrollPosition;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animationScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuad(progress);
            window.scrollTo(0, startPosition + (distance * ease));

            if (progress < 1) {
                requestAnimationFrame(animationScroll);
            } else {
                window.scrollTo(0, 0); // fin du scroll
                const hero = document.getElementById("contenu");
                if (hero) hero.style.display = "none";

                const h3 = document.getElementById("h3");
                if (h3) h3.textContent = "Perder pas plus de temps !!!";

                const btn = document.getElementById("btn");
                if (btn) btn.textContent = "Créez votre compte";
            }
        }

        requestAnimationFrame(animationScroll);

    } else if (clickCount === 2) {
        // ===== CHARGER LA PAGE LOGIN1 ET INIT JS =====
        try {
            // attendre que le HTML soit injecté
            await go("login"); // go doit retourner une promesse

            // importer dynamiquement le JS de login1
            const module = await import("./src/js/login1.js");
            module.initLogin(); // initialise tous les événements et fonctions de la page

            // exposer go si besoin
            window.go = go;
        } catch (err) {
            console.error("Erreur lors du chargement de la page login :", err);
        }
    }
});

