
export function initLogin() {
// Fonction pour récupérer les données de la boutique
function getBoutiqueData(uid, nomb) {
    if (uid) {
        database.ref(`boutiques/${uid}/${nomb}`).once('value')
            .then((snapshot) => {
                const boutiqueData = snapshot.val();
                const boutiqueetat = boutiqueData.etat
                if (boutiqueData) {
                    console.log('Données de la boutique:', boutiqueData);
                    document.getElementById('n-boutique').textContent = boutiqueData.name;
                    document.getElementById('e-boutique').textContent = boutiqueData.etat;

                    if (boutiqueetat === 'hor service'){
                        document.getElementById('e-boutique').style.color = 'red';

                    } else {
                        document.getElementById('e-boutique').style.color = 'green';

                    }
                    
                    return boutiqueData; // Cette valeur est retournée à l'intérieur d'une promesse.
                } else {
                    console.log('Boutique non trouvée');
                    return null;
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données:', error);
                return null;
            });
    } else {
        console.log('Aucun utilisateur connecté');
        return null;
    }
}

// Fonction pour récupérer et afficher le solde de l'utilisateur
function getUserSold(uid) {
    if (uid) {
        database.ref(`users/${uid}`).once('value')
            .then((snapshot) => {
                const userData = snapshot.val();
                if (userData && userData.solde) {  // Utilisez `solde` ici pour correspondre à la clé dans Firebase
                    document.getElementById('s-sold').textContent = '$ '+ userData.solde +'.00';
                } else {
                    document.getElementById('s-sold').textContent = '0 $'; // Affiche 0 si `solde` est inexistant
                }
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du solde:', error);
                document.getElementById('s-sold').textContent = '0 $';
            });
    }
}
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


document.getElementById("plann").addEventListener("click", async () => {
  try {
    // Appel backend pour supprimer le cookie
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include"
    });

    // Vider le localStorage
    localStorage.clear();

    // Rediriger vers login
    window.location.href = "../main/login1.html";
  } catch (err) {
    console.error("Erreur lors de la déconnexion :", err);
  }
});



document.getElementById("st-1").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    
    document.getElementById('kk').style.width = '900px';
    document.getElementById("put").style.display = 'block';
    document.getElementById("cnf").style.display = 'block';
    document.getElementById("st-1").style.display = 'none';  
});

document.getElementById("put").addEventListener("input", function() {
    if (this.value.length > 0) {
        document.getElementById("cnf").style.opacity = "1";
        document.getElementById("cnf").style.cursor = "pointer";
    } else {
        document.getElementById("cnf").style.opacity = "0.5";
        document.getElementById("cnf").style.cursor = "no-drop";
    }
  
});


document.getElementById("s-bord").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-bord").classList.add("clikable");
    document.querySelector('.parti-home').style.display = 'block';
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable");
    document.getElementById("s-produit").classList.remove("clikable"); 
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
});

document.getElementById("s-boutique").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-boutique").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable");
    document.getElementById("s-produit").classList.remove("clikable"); 
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-commandes").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-commandes").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-produit").classList.remove("clikable"); 
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-produit").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-produit").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-factur").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-factur").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-produit").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-analys").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-analys").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-produit").classList.remove("clikable");
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-support").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-support").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-produit").classList.remove("clikable");
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-reglage").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

document.getElementById("s-reglage").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton
    document.getElementById("s-reglage").classList.add("clikable");
    document.getElementById("s-bord").classList.remove("clikable");
    document.getElementById("s-boutique").classList.remove("clikable");
    document.getElementById("s-commandes").classList.remove("clikable"); 
    document.getElementById("s-produit").classList.remove("clikable");
    document.getElementById("s-factur").classList.remove("clikable");
    document.getElementById("s-analys").classList.remove("clikable");
    document.getElementById("s-support").classList.remove("clikable");
    document.querySelector('.parti-home').style.display = 'none';
});

}
