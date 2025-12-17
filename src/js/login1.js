
const API_URL = "https://backendalpha.onrender.com"; // URL backend Node
let clickCount = 0;

// Références aux inputs
const putEmail = document.getElementById("put-email");
const putPassword = document.getElementById("put-password");

// ==================== AUTO LOGIN ====================


document.getElementById("cnx").addEventListener("click", async e => {
    e.preventDefault();
    hideErrors();

    const email = putEmail.value.trim();
    const password = putPassword.value.trim();
    if (!email || !password) return;

    showOverlay(true);

    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        console.log("LOGIN STATUS:", res.status, res.statusText);

        let data;
        try {
            data = await res.json();
        } catch {
            throw new Error("Réponse serveur non valide");
        }

        console.log("LOGIN DATA:", data);

        if (!res.ok) throw new Error(data.message || "Erreur de connexion");

        if (data.status === "NO_CONFIRM") {
            showStep("cont-e");  // Étape activation
            startTimer();        // Timer compte à rebours
        } else if (data.status === "OK") {
            if (data.user.boutique === 0) showStep("cont-f");
            else window.location.href = "./main/penal.html";
        }

    } catch (err) {
        console.error("Frontend login error:", err);
        showError("erreur", err.message);
    } finally {
        showOverlay(false); // Retire toujours l’overlay
    }
});



// ==================== GESTION DU CLICK "SINGUP" ====================
document.getElementById("singup").addEventListener("click", function(event) {
    event.preventDefault(); 
    clickCount++;

    const contC = document.querySelector('.cont-c');
    const contD = document.querySelector('.cont-d');

    if (clickCount === 1){
        this.textContent = "Vous avez un compte";
        contC.classList.add('active');
        setTimeout(() => contC.style.display = 'none', 300);
        contD.style.display = 'flex';
        setTimeout(() => contD.classList.add('active2'), 10);

    } else if (clickCount === 2){
        clickCount = 0;
        this.textContent = "Cree un compte";
        contD.classList.remove('active2');
        setTimeout(() => {
            contD.style.display = 'none';
            contC.style.display = 'flex';
        }, 300);
        setTimeout(() => contC.classList.remove('active'), 10);
    }
});

// ==================== CHECK INPUTS ====================
putEmail.addEventListener("input", checkLoginInputs);
putPassword.addEventListener("input", checkLoginInputs);

document.getElementById("cree-nom").addEventListener("input", checkSignupInputs);
document.getElementById("cree-email").addEventListener("input", checkSignupInputs);
document.getElementById("cree-password").addEventListener("input", checkSignupInputs);
document.getElementById("cree-rpassword").addEventListener("input", checkSignupInputs);
document.getElementById("code-activation").addEventListener("input", handleInput);
document.getElementById("nom-boutique").addEventListener("input", checkNomBoutique);

function checkLoginInputs() {
    const email = putEmail.value.trim();
    const password = putPassword.value.trim();
    
    const btn = document.getElementById("cnx");
    if (email && password) {
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    } else {
        btn.style.opacity = "0.3";
        btn.style.cursor = "no-drop";
    }
}

function checkSignupInputs() {
    const cname = document.getElementById("cree-nom").value.trim();
    const cemail = document.getElementById("cree-email").value.trim();
    const cpassword = document.getElementById("cree-password").value.trim();
    const crpassword = document.getElementById("cree-rpassword").value.trim();
       
    const btn = document.getElementById("inc");
    if (cname && cemail && cpassword && cpassword === crpassword) {
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    } else {
        btn.style.opacity = "0.3";
        btn.style.cursor = "no-drop";
    }
}

function checkNomBoutique() {
    const nomBoutique = document.getElementById("nom-boutique").value.trim();
    const btn = document.getElementById("lunch");

    if (nomBoutique) {
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        btn.style.background = "#8282f3";
    } else {
        btn.style.opacity = "0.3";
        btn.style.cursor = "no-drop";
    }
}


// ==================== UTILS ====================
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideErrors() {
    document.querySelectorAll('.error').forEach(el => el.style.display = 'none');
}

function showOverlay(show = true) {
    const overlay = document.getElementById("overlay");
    if (overlay) overlay.style.display = show ? "block" : "none";
}

// ==================== ACTIVATION ====================
async function handleInput() {
    const codeInput = document.getElementById("code-activation");
    let code = codeInput.value.trim();

    if (code.length > 5) code = code.slice(0, 5);

    if (code.length === 5) {
        showOverlay(true);

        const userId = localStorage.getItem('UID');
        if (!userId) {
            showError('erreur2', "Informations utilisateur manquantes");
            showOverlay(false);
            return;
        }

        try {
            // ✅ Activation
            const activateRes = await fetch(`${API_URL}/api/auth/activate/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code })
            });

            const activateData = await activateRes.json();

            if (!activateRes.ok) {
                showError('erreur2', activateData.message || "Code incorrect");
                return;
            }

            hideErrors();
            console.log("Activation réussie :", activateData.message);

            // 🔄 Actualiser la page après activation
            window.location.reload();

        } catch (err) {
            showError('erreur2', "Erreur serveur");
            console.error(err);
        } finally {
            showOverlay(false);
        }
    }
}


// ==================== TIMER ====================
function startTimer() {
    let timeLeft = 60;
    const cronoElement = document.getElementById("crono");
    if (!cronoElement) return;

    cronoElement.textContent = `${timeLeft} secondes restantes`;
    const timerId = setInterval(() => {
        timeLeft--;
        cronoElement.textContent = `${timeLeft} secondes restantes`;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            cronoElement.textContent = "Renvoyez le code";
            cronoElement.style.cursor = "pointer";
            cronoElement.style.color = "#0505fb";
            cronoElement.style.opacity = "1";
        }
    }, 1000);
}

function showStep(stepId) {
    const steps = document.querySelectorAll('.cont-c, .cont-d, .cont-e, .cont-f'); // toutes les étapes
    steps.forEach(el => el.style.display = 'none'); // on cache tout
    const step = document.getElementById(stepId);
    if (step) step.style.display = 'flex'; // on affiche l’étape demandée
}


document.getElementById("inc")?.addEventListener("click", async function(event) {
    event.preventDefault();
    hideErrors();

    const name = document.getElementById("cree-nom")?.value;
    const email = document.getElementById("cree-email")?.value;
    const password = document.getElementById("cree-password")?.value;

    if (!name || !email || !password) {
        showError('erreur1', 'Veuillez remplir tous les champs');
        return;
    }

    document.getElementById("overlay").style.display = "block";

    try {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Erreur lors de l\'inscription');
        }

        const data = await res.json();
        console.log(data);

        if (data.user?.uid) {
            localStorage.setItem('UID', data.user.uid);
            localStorage.setItem('email', data.user.email);
            localStorage.setItem('name', data.user.name);
        }

        const contC = document.querySelector('.cont-c');
        const contD = document.querySelector('.cont-d');
        const contE = document.querySelector('.cont-e');
        if (contC && contD && contE) {
            contD.style.display = 'none';
            contC.classList.add('visi');
        }

        const singupElement = document.getElementById("singup");
        if (singupElement) singupElement.style.display = 'none';

        const putEmail = document.getElementById("put-email");
        const putPassword = document.getElementById("put-password");
        if (putEmail && putPassword) {
            putEmail.value = email;
            putPassword.value = password;
        }

    } catch (error) {
        showError('erreur1', error.message);
    } finally {
        document.getElementById("overlay").style.display = "none";
    }
});

document.getElementById("crono")?.addEventListener("click", async function(event) {
    startTimer();

    const cronoBtn = document.getElementById("crono");
    if (cronoBtn) {
        cronoBtn.style.cursor = "no-drop";
        cronoBtn.style.color = "red";
        cronoBtn.style.opacity = "0.5";
    }

    const uid = localStorage.getItem('UID');
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');

    if (!uid || !email || !name) {
        console.error("Erreur : informations utilisateur manquantes dans le localStorage.");
        return;
    }

    document.getElementById("overlay").style.display = "block";

    try {
        const res = await fetch(`${API_URL}/api/auth/email-send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, email, name }),
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Erreur lors de l\'envoi du code');
        }

        const data = await res.json();
        console.log(data);

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error.message);
    } finally {
        document.getElementById("overlay").style.display = "none";
    }
});


/*document.getElementById("cnx")?.addEventListener("click", async (e) => {
    e.preventDefault();
    hideErrors();

    const email = document.getElementById("put-email").value;
    const password = document.getElementById("put-password").value;

    if (!email || !password) {
        showError("erreur1", "Champs manquants");
        return;
    }

    document.getElementById("overlay").style.display = "block";

    try {
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        // 👇 CAS NO CONFIRM
        if (data.status === "NO_CONFIRM") {
            localStorage.setItem("UID", data.uid);
            localStorage.setItem("email", data.email);

            showStep("cont-e");
            startTimer();
            return;
        }

        // 👇 LOGIN OK
        if (data.status === "OK") {
            localStorage.setItem("UID", data.user.uid);
            localStorage.setItem("email", data.user.email);
            localStorage.setItem("name", data.user.name);

            window.location.href = "../main/penal.html";
        }

    } catch (err) {
        showError("erreur1", err.message);
    } finally {
        document.getElementById("overlay").style.display = "none";
    }
});*/



document.getElementById("put-email").addEventListener("click", function(event) {
    document.getElementById("cont-c").classList.add("force")

});

document.getElementById("cree-nom").addEventListener("click", function(event) {
    document.getElementById("cont-c").classList.add("force")

});

document.getElementById("put-password").addEventListener("click", function(event) {
    document.getElementById("cont-c").classList.add("force")

});

document.getElementById("recup").addEventListener("click", function(event) {
    event.preventDefault();
    const email = document.getElementById("put-email").value;
    
    if (!email) {
        hideErrors();
        showError('erreur', "Veuillez entrer votre adresse email.");
        return;
    }

    auth.sendPasswordResetEmail(email)
        .then(() => {
            hideErrors();
            showError('erreur', "Un email de récupération a été envoyé à votre adresse.");
        })
        .catch((error) => {
            hideErrors();
            showError('erreur', "Erreur lors de l'envoi de l'email de récupération.");
        });
});



