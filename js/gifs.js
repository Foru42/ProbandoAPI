let offset = 0;
const limit = 10; // Cantidad inicial de GIFs a cargar
let loading = false; // Variable para evitar cargar múltiples veces al llegar al final de la página

document.getElementById('search-button').addEventListener('click', searchGifs);

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !loading) {
        // Usuario ha llegado al final de la página
        loadMoreGifs();
    }
});

async function searchGifs() {
    // Limpiar contenedor de GIFs antes de realizar la nueva búsqueda
    const gifContainer = document.getElementById('gif-container');
    gifContainer.innerHTML = '';
    offset = 0; // Reiniciar el offset cuando se realiza una nueva búsqueda

    const apiKey = 'Dvt7gpElQ3OK7WtS4wcztYn0r1wtnDDZ';
    const searchTerm = document.getElementById('search-input').value;
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${limit}&offset=${offset}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGifs(data.data);
        offset += limit; // Incrementa el offset para la próxima carga
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayGifs(gifs) {
    const gifContainer = document.getElementById('gif-container');

    gifs.forEach(gif => {
        const gifUrl = gif.images.fixed_height.url;
        const img = document.createElement('img');
        img.src = gifUrl;
        img.classList.add('gif');
        img.loading = 'lazy'; // Añadir atributo loading="lazy" para lazy loading
        gifContainer.appendChild(img);
    });
}

async function loadMoreGifs() {
    loading = true; // Marcar que se está cargando para evitar cargas múltiples
    const apiKey = 'Dvt7gpElQ3OK7WtS4wcztYn0r1wtnDDZ';
    const searchTerm = document.getElementById('search-input').value;
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=${limit}&offset=${offset}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGifs(data.data);
        offset += limit; // Incrementa el offset para la próxima carga
        loading = false; // Marcar que la carga ha finalizado
    } catch (error) {
        console.error('Error fetching data:', error);
        loading = false; // Marcar que la carga ha finalizado, incluso en caso de error
    }
}
