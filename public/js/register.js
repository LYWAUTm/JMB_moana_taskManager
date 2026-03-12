// ================================================================================
//                           AUTH REGISTER
// ================================================================================

// CIBLE LE FORMULAIRE POUR RECUPERER LES DONNEES VIA ECOUTE DES EVENEMENTS
const form_register = document.getElementById("form_register");

if (form_register) {
    form_register.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = {
            username: username,
            email: email,
            password: password
        };

        // DECLARATION DE LA REPONSE AU FORMAT JSON 
        try {
            const res = await fetch("users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const json = await res.json();
            console.log(json);

            // SI TOKEN REDIRECT PAGE LIST SINON PAGE LOGIN
            if (json.token) {
                localStorage.setItem("token", json.token);
                window.location.replace("/list");
            } else {
                window.location.replace("/login");
            }

            // 
        } catch (error) {
            console.error("Erreur de connexion lors de l'inscription :", error);
        }

    });
}
