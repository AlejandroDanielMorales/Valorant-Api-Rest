let agentes = [];
let armas = [];
let mapas = [];

let url = 'https://valorant-api.com/v1';

function fetchData(tabName) {
    switch (tabName) {
        case 'agentes':
            if (agentes.length === 0) {
                axios.get(`${url}/agents`).then(response => {
                    agentes = response.data.data;
                    pintarAgentes(agentes);
                }).catch(error => console.log("Error al obtener agentes:", error));
            } else {
                pintarAgentes(agentes);
            }
            break;
        case 'armas':
            if (armas.length === 0) {
                axios.get(`${url}/weapons`).then(response => {
                    armas = response.data.data;
                    pintarArmas(armas);
                }).catch(error => console.log("Error al obtener armas:", error));
            } else {
                pintarArmas(armas);
            }
            break;
        case 'mapas':
            if (mapas.length === 0) {
                axios.get(`${url}/maps`).then(response => {
                    mapas = response.data.data;
                    pintarMapas(mapas);
                }).catch(error => console.log("Error al obtener mapas:", error));
            } else {
                pintarMapas(mapas);
            }
            break;
        default:
            fetchData('agentes');
    }
}

// Carga inicial
fetchData('agentes');

function showContent(tabName) {
    fetchData(tabName);
}function pintarAgentes(agentes) {
    let container = document.getElementById('agent-section');
    container.innerHTML = '';

    // Crear título solo una vez
    let tittleContent = document.createElement("h2");
    tittleContent.textContent = "Agentes";
    tittleContent.className = "text-light text-center bg-dark";
  
    container.appendChild(tittleContent); // Agregar título antes de las tarjetas

    agentes.forEach(agente => {
        let id = extraerUuid(agente.displayIcon);

        let card = document.createElement("div");
        card.className = "col-md-3 col-sm-6 bg-dark p-5";

        let cardInner = document.createElement("div");
        cardInner.className = "card h-100 shadow-sm bg-secondary";

        let img = document.createElement("img");
        img.className = "card-img-top p-3";
        img.src = agente.fullPortraitV2 || "https://studio.uxpincdn.com/studio/wp-content/uploads/2023/03/404-page-best-practice.png.webp";
        img.alt = agente.displayName;
        img.style.background = `radial-gradient(ellipse 25% 50% at center, 
            #${agente.backgroundGradientColors[0]}, 
            #${agente.backgroundGradientColors[1]}, 
            #${agente.backgroundGradientColors[2]}, 
            #${agente.backgroundGradientColors[3]})`;

        let cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column bg-secondary";

        let title = document.createElement("h5");
        title.className = "card-title text-dark";
        title.textContent = agente.displayName;
        
        let description = document.createElement("p");
        description.className = "card-text fw-bold";
        description.textContent = agente.description;

        let btn = document.createElement("a");
        btn.href = `detail.html?agentId=${id}`;
        btn.className = "btn btn-danger mt-auto";
        btn.textContent = "Leer más";

        cardBody.appendChild(title);
        cardBody.appendChild(description);
        cardBody.appendChild(btn);

        cardInner.appendChild(img);
        cardInner.appendChild(cardBody);
        card.appendChild(cardInner);
        container.appendChild(card);
    });
}

function pintarMapas(mapas) {
    let container = document.getElementById('agent-section');
    container.innerHTML = '';

    mapas.forEach(mapa => {
        let card = document.createElement("div");
        card.className = "col-md-4 col-sm-6";

        let cardInner = document.createElement("div");
        cardInner.className = "card h-100 shadow-sm";
        cardInner.style.backgroundColor = "transparent";

        let img = document.createElement("img");
        img.className = "card-img-top p-3";
        img.src = mapa.splash;
        img.alt = mapa.displayName;

        let cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";

        let title = document.createElement("h5");
        title.className = "card-title text-success";
        title.textContent = mapa.displayName;

        let coords = document.createElement("p");
        coords.className = "card-text fw-bold";
        coords.textContent = `Coordenadas: ${mapa.coordinates}`;

        let btn = document.createElement("button");
        btn.className = "btn btn-success mt-auto";
        btn.textContent = "Explorar";
       

        cardBody.appendChild(title);
        cardBody.appendChild(coords);
        cardBody.appendChild(btn);

        cardInner.appendChild(img);
        cardInner.appendChild(cardBody);
        card.appendChild(cardInner);
        container.appendChild(card);
    });
}
function pintarArmas(armas) {
    let container = document.getElementById('agent-section'); 
    container.innerHTML = '';

    armas.forEach(arma => {
        let card = document.createElement("div");
        card.className = "col-md-3 col-sm-6";

        let cardInner = document.createElement("div");
        cardInner.className = "card h-100 shadow-sm";
        cardInner.style.backgroundColor = "transparent";

        let img = document.createElement("img");
        img.className = "card-img-top p-3";
        img.src = arma.displayIcon;
        img.alt = arma.displayName;

        let cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";

        let title = document.createElement("h5");
        title.className = "card-title text-primary";
        title.textContent = arma.displayName;

        let category = document.createElement("p");
        category.className = "card-text fw-bold";
        category.textContent = `Categoría: ${arma.category.replace('EEquippableCategory::', '')}`;

        let btn = document.createElement("button");
        btn.className = "btn btn-secondary mt-auto";
        btn.textContent = "Ver detalles";

        cardBody.appendChild(title);
        cardBody.appendChild(category);
        cardBody.appendChild(btn);

        cardInner.appendChild(img);
        cardInner.appendChild(cardBody);
        card.appendChild(cardInner);
        container.appendChild(card);
    });
}

// Función para extraer el UUID de la URL de la imagen
function extraerUuid(url) {
    let urlSplited = url.split('/');
    return urlSplited.at(-2);
}