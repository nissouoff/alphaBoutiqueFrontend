import { go } from "../router/router.js";  // chemin relatif correct
import { ROUTES } from "../router/routes.js"; // routes vers public/main/

// ==== Gestion du toggle sur les éléments .contenu-a div ====
document.querySelectorAll('.contenu-a div').forEach((element) => {
    element.addEventListener('click', function() {
        this.classList.toggle('active'); // Activer ou désactiver la classe active au tap
    });
});

const API_URL = "http://localhost:3000"; // URL backend Node

// ==== Vérification auto-login ====
async function autoLoginCheck() {
    try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
            method: "GET",
            credentials: "include" // 🔑 obligatoire
        });

        if (res.ok) {
            await go("penal"); // go doit retourner une promesse

            // importer dynamiquement le JS de penal
            const module = await import("./js/penal.js");
            module.initLogin(); // initialise tous les événements et fonctions de la page

            window.go = go;
        }
    } catch (e) {
        console.log("Pas connecté, rester sur login");
    }
}
autoLoginCheck();

// ==== Animation scroll pour le bouton star ====
document.getElementById("star")?.addEventListener("click", function(event) {
    event.preventDefault();
    const target = document.getElementById("cont");
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let startTime = null;

    // Afficher les éléments au début
    document.getElementById("contenu")?.style.display = 'flex';
    document.getElementById("contenu2")?.style.display = 'flex';

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, startPosition + (distance * ease));

        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            window.scrollTo(0, 0);
            document.getElementById("hero")?.style.display = 'none';
        }
    }

    requestAnimationFrame(animation);
});

// ==== Gestion du clic sur le bouton principal ====
let clickCount = 0;

document.getElementById("btn")?.addEventListener("click", async function(event) {
    event.preventDefault();
    clickCount++;

    if (clickCount === 1) {
        const currentScrollPosition = window.pageYOffset;
        const contenu2 = document.getElementById("contenu2");
        const contenu3 = document.getElementById("contenu3");
        const contenu4 = document.getElementById("contenu4");
        const footer = document.getElementById("footer");

        if (contenu2) contenu2.style.display = "block";
        if (contenu3) contenu3.style.display = "block";
        if (contenu4) contenu4.style.display = "block";
        if (footer) footer.style.display = "block";

        const targetPosition = contenu2?.getBoundingClientRect().top + window.pageYOffset || 0;
        const startPosition = currentScrollPosition;
        const distance = targetPosition - startPosition;
        const duration = 1000;
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
                window.scrollTo(0, 0);
                document.getElementById("contenu")?.style.display = "none";
                const h3 = document.getElementById("h3");
                if (h3) h3.textContent = "Perder pas plus de temps !!!";
                document.getElementById("btn")?.textContent = "Créez votre compte";
            }
        }

        requestAnimationFrame(animationScroll);

    } else if (clickCount === 2) {
        try {
            // Naviguer vers login1.html dans public/main/
            await go("login");

            // Import dynamique depuis public/js/login1.js
            const module = await import("./js/login1.js");
            module.initLogin();
        } catch (err) {
            console.error("Erreur lors du chargement de la page login :", err);
        }
    }
});
