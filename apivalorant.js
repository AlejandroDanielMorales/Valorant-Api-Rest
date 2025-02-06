let agentes = [];
let armas = [];
let mapas = [];
let url = 'https://valorant-api.com/v1';

// Se ejecutan todas las peticiones en paralelo
Promise.all([
    axios.get(`${url}/agents`),
    axios.get(`${url}/weapons`),
    axios.get(`${url}/maps`)
]).then(([agentsResponse, weaponsResponse, mapsResponse]) => {
    agentes = agentsResponse.data.data;
    console.log(agentes);
    armas = weaponsResponse.data.data;
    console.log(armas);
    mapas = mapsResponse.data.data;
    console.log(mapas); 

    // Cuando todos los datos están cargados, se muestra la primera pestaña
    showContent('agentes');
}).catch((error) => {
    console.log("Error al obtener datos:", error);
});

function showContent(tabName) {
    switch (tabName) {
        case 'agentes':
            pintarAgentes(agentes);
            break;
        case 'armas':
            pintarArmas(armas);
            break;
        case 'mapas':
            pintarMapas(mapas);
            break;
        default:
            pintarAgentes(agentes);
    }
}

function pintarAgentes(agentes) {
    let html = '';

    agentes.forEach(agente => {
        html += `
            <div class="col-md-3 col-sm-6">
                <div class="card h-100 shadow-sm" style="background-color: transparent;">
                    <img style="background-image: radial-gradient(ellipse 25% 50% at center,#${agente.backgroundGradientColors[0]},#${agente.backgroundGradientColors[1]},#${agente.backgroundGradientColors[2]},#${agente.backgroundGradientColors[3]});" src="${agente.fullPortraitV2}" class="card-img-top p-3" alt="${agente.displayName}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-danger">${agente.displayName}</h5>
                        <p class="card-text fw-bold">${agente.description}</p>
                        <button class="btn btn-primary mt-auto">Leer más</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('agent-section').innerHTML = html;
}

function pintarArmas(armas) {
    let html = '';

    armas.forEach(arma => {
        html += `
            <div class="col-md-3 col-sm-6">
                <div class="card h-100 shadow-sm" style="background-color: transparent;">
                    <img src="${arma.displayIcon}" class="card-img-top p-3" alt="${arma.displayName}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary">${arma.displayName}</h5>
                        <p class="card-text fw-bold">Categoría: ${arma.category.replace('EEquippableCategory::', '')}</p>
                        <button class="btn btn-secondary mt-auto">Ver detalles</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('agent-section').innerHTML = html;
}

function pintarMapas(mapas) {
    let html = '';

    mapas.forEach(mapa => {
        html += `
            <div class="col-md-4 col-sm-6">
                <div class="card h-100 shadow-sm" style="background-color: transparent;">
                    <img src="${mapa.splash}" class="card-img-top p-3" alt="${mapa.displayName}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-success">${mapa.displayName}</h5>
                        <p class="card-text fw-bold">Coordenadas: ${mapa.coordinates}</p>
                        <button class="btn btn-success mt-auto">Explorar</button>
                    </div>
                </div>
            </div>
        `;
    });

    document.getElementById('agent-section').innerHTML = html;
}