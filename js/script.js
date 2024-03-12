class MiComponente extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        this.contenedor = shadow;
    }

    connectedCallback() {
        console.log('Iniciando carga de datos...');
        setTimeout(() => {
            this.loadData();
        }, 10000); 
    }

    loadData() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }
                return response.json();
            })
            .then(data => {
                const firstTenPosts = data.slice(0, 10);
                firstTenPosts.forEach(post => {
                    const contenedorPosts = document.createElement('div');
                    const parrafo = document.createElement('p');
                    parrafo.innerHTML = `Título: ${post.title} <br>
                                         Contenido: ${post.body} <br>
                                         Usuario ID: ${post.id} <br><br>`;
                    contenedorPosts.appendChild(parrafo);
                    this.contenedor.appendChild(contenedorPosts);
                });
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
            });
    }
}

customElements.define('mi-componente', MiComponente);

// Agregar evento al botón para cargar datos de SpaceX
document.getElementById('fetchButton').addEventListener('click', () => {
    fetchSpaceXData();
});

// Agregar evento al botón para cargar los posts
document.getElementById('loadPostsButton').addEventListener('click', () => {
    const componente = document.querySelector('mi-componente');
    componente.loadData();
});

function fetchSpaceXData() {
    fetch('https://api.spacexdata.com/v4/launches/latest')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos de SpaceX');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de SpaceX:', data);
            displaySpaceXData(data);
        })
        .catch(error => {
            console.error('Error al cargar los datos de SpaceX:', error);
        });
}

function displaySpaceXData(data) {
    const contenedorSpaceX = document.createElement('div');
    contenedorSpaceX.innerHTML = `
        <h2>Último Lanzamiento de SpaceX:</h2>
        <p>Nombre del cohete: ${data.name}</p>
        <p>Detalles del lanzamiento: ${data.date_utc}</p>
        <img src="${data.links.patch.small}" alt="Imagen del cohete">
    `;
    document.body.appendChild(contenedorSpaceX);
}