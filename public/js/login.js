// ================================================================================
//                           AUTH LOGIN
// ================================================================================

// CIBLE LE FORMULAIRE POUR RECUPERER LES DONNEES VIA ECOUTE DES EVENEMENTS
const form_login = document.getElementById("form_login");

if (form_login) {
    form_login.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const data = {
            email: email,
            password: password
        };

        // DECLARATION DE LA REPONSE POUR RECUPERER LE TOKEN AU FORMAT JSON ET STOCKER DANS LE LOCAL STORAGE
        try {
            const res = await fetch("users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const json = await res.json();
            console.log(json);

            // token stocker en localstorage
            if (json.token) {
                localStorage.setItem("token", json.token);
                globalThis.location.href = "/list";
            }
        } catch (error) {
            console.error({ message: error.message });
        }
    });
}
