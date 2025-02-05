let agentes = [];
let url = 'https://valorant-api.com/v1/agents';

axios.get(url)
    .then((response) => {
        agentes = response.data.data; // Accede correctamente a la propiedad 'data' de la respuesta
        pintarAgentes(agentes); // Llama a la función para pintar los agentes
        console.log(response.data); // Para ver la estructura completa de la respuesta
    })
    .catch((error) => console.log("Error al obtener agentes:", error));

function pintarAgentes(agentes) {
    let html = '';
    // Recorremos los agentes y creamos una tarjeta para cada uno
    agentes.forEach(agente => {
        html += `
            <div class="col-md-3 col-sm-6" >
                <div class="card h-100 shadow-sm" style="background-color: transparent;">
                    <img style="background-image: radial-gradient(ellipse 25% 50% at center,#${agente.backgroundGradientColors[0]},#${agente.backgroundGradientColors[1]},#${agente.backgroundGradientColors[2]},#${agente.backgroundGradientColors[3]});" src="${agente.fullPortraitV2}" class="card-img-top p-3" alt="${agente.displayName}">
                    <div class="card-body  d-flex flex-column">
                        <h5 class="card-title text-danger">${agente.displayName}</h5>
                        <p class="card-text  fw-bold">${agente.description}</p>
                        <button class="btn btn-primary mt-auto">Leer más</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Añadimos las tarjetas al contenedor 'agent-section'
    document.getElementById('agent-section').innerHTML = html;
}
