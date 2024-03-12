let offset = 0;
const limit = 10; // Cantidad inicial de GIFs a cargar

document.getElementById('search-button').addEventListener('click', searchGifs);

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // Usuario ha llegado al final de la página
        loadMoreGifs();
    }
});

async function searchGifs() {
    // Limpiar contenedor de GIFs antes de realizar la nueva búsqueda
    const gifContainer = document.getElementById('gif-container');
    gifContainer.innerHTML = '';

    const apiKey = 'Dvt7gpElQ3OK7WtS4wcztYn0r1wtnDDZ';
    const searchTerm = document.getElementById('search-input').value;
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayGifs(data.data);
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
        gifContainer.appendChild(img);
    });
}

async function loadMoreGifs() {
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
