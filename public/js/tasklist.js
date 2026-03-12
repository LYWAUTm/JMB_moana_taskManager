// ================================================================================
//                           TASKLIST FRONTEND
// ================================================================================

const form_list = document.getElementById("form_list");
const listContainer = document.getElementById("list");

if (form_list) {
    form_list.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("task_name").value;
        const description = document.getElementById("task_def").value;
        const done = document.getElementById("checkbox").checked;

        const data = { title, description, done };
        console.log("données envoyées :", data);

        try {
            const res = await fetch("tasks/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(data),
                // a vérifier utilité
                credentials: "include"

            });

            const result = await res.json();
            console.log("Réponse backend :", result);

            // Si la tâche est créée, on l'affiche dans la liste
            if (result.title) {
                taskUI.render(result);
                form_list.reset();
            }

        } catch (err) {
            console.error("Erreur :", err);
        }
    });
}

// ================================================================================
//                           RENDER LIST
// ================================================================================

// GESTION AFFICHAGE DES TACHES DANS LA LISTE
const taskUI = {
    list: listContainer,

    render(task) {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        li.innerHTML = `
            <div>
                <strong>${task.title}</strong><br>
                <small>${task.description || ""}</small>
            </div>
            
            <span class="badge ${task.done ? "bg-success" : "bg-secondary"}">
                ${task.done ? "Effectué" : "À faire"}
            </span>
        `;

        this.list.appendChild(li);
    }
};

// ================================================================================
//                           LOGOUT
// ================================================================================

const logout = () => {
    localStorage.removeItem('token');
    window.location.replace('/login');
}

document.getElementById("btn_logout").addEventListener('click', logout);