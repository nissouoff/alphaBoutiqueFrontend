// src/router/router.js
import { ROUTES } from "./routes.js";

async function go(pageKey) {
    const file = ROUTES[pageKey];
    const app = document.getElementById("app");

    if (!file) {
        app.innerHTML = "<h1>404</h1>";
        return;
    }

    const html = await fetch(file).then(r => r.text());
    app.innerHTML = html;

    // Mettre l'URL propre
    history.pushState({}, "", "/p/" + pageKey);
}

function initRouter() {
    window.addEventListener("popstate", () => {
        const key = location.pathname.split("/p/")[1];
        if (key) go(key);
    });

    // Chargement initial
    const initialKey = location.pathname.split("/p/")[1] || "login";
    go(initialKey);
}

// **EXPORTS**
export { go, initRouter };
