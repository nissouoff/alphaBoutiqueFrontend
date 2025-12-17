
const API_URL = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) throw new Error("Non connecté");

        const data = await res.json();
        console.log("Utilisateur connecté :", data.user);

       

        // Tu peux continuer ici avec toutes les fonctions qui dépendent de l'utilisateur
        // ex: getBoutiqueData(data.user.uid, ...), getUserSold(data.user.uid) etc.

    } catch (err) {
        console.log("Utilisateur non connecté ou token invalide :", err.message);
        // Redirection vers login
        window.location.href = "../main/login1.html";
    }
});


// ========================
// 1. Liste des wilayas
// ========================
const wilayas = [
    "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar",
    "Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger",
    "Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma",
    "Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh",
    "Illizi","Bordj Bou Arreridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued",
    "Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma","Aïn Témouchent",
    "Ghardaïa","Relizane","El M'ghair","El Menia","Ouled Djellal","Bordj Badji Mokhtar",
    "Béni Abbès","Timimoun","Touggourt","Djanet","In Salah","In Guezzam"
];

// Remplissage du select wilaya
const wilayaSelect = document.getElementById("wilaya-boutique");
wilayas.forEach((w, i) => {
    const opt = document.createElement("option");
    opt.value = w;
    opt.textContent = `${i+1} - ${w}`;
    wilayaSelect.appendChild(opt);
});

// ========================
// 2. Animation des slogans
// ========================

// ========================
// 3. Gestion du formulaire
// ========================
const form = document.getElementById("create-boutique-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Récupération des valeurs
    const nom = document.getElementById("nom-boutique").value.trim();
    const wilaya = document.getElementById("wilaya-boutique").value;
    const type = document.getElementById("type-boutique").value;
    const tel = document.getElementById("telephone-boutique").value.trim();

    // Validation simple
    if (!nom || !wilaya || !type || !tel) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Préparer l'objet boutique
    const boutiqueData = {
        nom,
        wilaya,
        type,
        telephone: tel
    };

    console.log("Boutique à créer :", boutiqueData);

    // Ici tu peux faire un fetch pour envoyer les données au backend
    // Exemple :
    /*
    fetch('http://localhost:3000/boutique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(boutiqueData)
    })
    .then(res => res.json())
    .then(data => console.log("Réponse backend :", data))
    .catch(err => console.error(err));
    */

    alert("Boutique créée avec succès !");
    form.reset();
});

// ========================
// 4. Validation input téléphone
// ========================
const telInput = document.getElementById("telephone-boutique");
telInput.addEventListener("input", function() {
    const regex = /^[0-9]{2,3}-[0-9]{3}-[0-9]{3}$/;
    if (!regex.test(this.value)) {
        this.style.borderColor = "red";
    } else {
        this.style.borderColor = "#aaa";
    }
});


// === Slider images ===
const slides = document.querySelectorAll('.background .slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000); // change toutes les 5s

showSlide(currentSlide); // affichage initial

// === Animation slogans ===
const slogans = document.querySelectorAll(".slogan");
let currentSlogan = 0;

function showSlogan(index) {
    slogans.forEach((slogan, i) => {
        slogan.classList.toggle('active', i === index);
    });
}

setInterval(() => {
    currentSlogan = (currentSlogan + 1) % slogans.length;
    showSlogan(currentSlogan);
}, 4000);

showSlogan(currentSlogan);
