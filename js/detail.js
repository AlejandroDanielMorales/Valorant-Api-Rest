console.log(window.location);
let agent = null;

// Obtener el ID del agente desde la URL
const urlParams = new URLSearchParams(window.location.search);
let agentId = urlParams.get('agentId');
console.log(agentId);

// Función para obtener los datos del agente desde la API
async function obtenerAgente(id) {
    try {
        let response = await axios.get(`https://valorant-api.com/v1/agents/${id}`);
        agent = response.data.data;
        console.log(agent);
        crearElemento(); // Llamamos a la función solo después de obtener los datos
    } catch (error) {
        console.log("Error al obtener datos:", error);
    }
}

// Función para crear la tarjeta del agente
function crearElemento() {
    if (!agent) {
        console.error("No hay datos del agente");
        return;
    }

    // Crear el contenedor principal de la tarjeta
    let card = document.createElement("div");
    card.className = "card mb-4 shadow-lg";
    card.style.width = "18rem";

    // Imagen del agente
    let img = document.createElement("img");
    img.src = agent.fullPortrait;
    img.className = "card-img-top";
    img.alt = agent.displayName;

    // Cuerpo de la tarjeta
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Nombre del agente
    let title = document.createElement("h5");
    title.className = "card-title text-center";
    title.textContent = agent.displayName;

    // Descripción del agente
    let description = document.createElement("p");
    description.className = "card-text";
    description.textContent = agent.description;

    // Rol del agente
    let role = document.createElement("p");
    role.className = "card-text fw-bold";
    role.innerHTML = `Rol: <img src="${agent.role.displayIcon}" width="20"> ${agent.role.displayName}`;

    // Lista de habilidades del agente
    let abilitiesList = document.createElement("ul");
    abilitiesList.className = "list-group list-group-flush";
    
    agent.abilities.forEach(ability => {
        let abilityItem = document.createElement("li");
        abilityItem.className = "list-group-item";
        abilityItem.textContent = ability.displayName;
        abilitiesList.appendChild(abilityItem);
    });

    // Agregar elementos al cuerpo de la tarjeta
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(role);
    
    // Agregar elementos a la tarjeta
    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(abilitiesList);

    // Agregar la tarjeta al contenedor en el HTML
    document.getElementById("agent-container").appendChild(card);
}

// Obtener y mostrar los datos del agente al cargar la página
if (agentId) {
    obtenerAgente(agentId);
} else {
    console.error("No se encontró agentId en la URL");
}