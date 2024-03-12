// Definir la función initMap
function initMap() {
    // Esta función puede permanecer vacía o se puede inicializar el mapa aquí si es necesario
}

document.getElementById('getLocationButton').addEventListener('click', () => {
    if ("geolocation" in navigator) {
        // Obtener la ubicación del usuario
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Mostrar la ubicación en consola
            console.log("Latitud:", latitude);
            console.log("Longitud:", longitude);

            // Crear un nuevo mapa
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: latitude, lng: longitude }, // Establecer el centro del mapa en las coordenadas proporcionadas
                zoom: 10 // Establecer el nivel de zoom del mapa
            });

            // Crear un marcador en las coordenadas proporcionadas
            const marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude }, // Establecer la posición del marcador
                map: map, // Asignar el marcador al mapa
                title: "Tu ubicación" // Título del marcador (opcional)
            });
        }, function(error) {
            // Manejar errores de geolocalización
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    console.error("El usuario denegó la solicitud de geolocalización.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("La información de ubicación no está disponible.");
                    break;
                case error.TIMEOUT:
                    console.error("La solicitud de geolocalización ha caducado.");
                    break;
                default:
                    console.error("Se produjo un error desconocido al obtener la ubicación:", error.message);
                    break;
            }
        });
    } else {
        // El navegador no soporta geolocalización
        console.error("La geolocalización no está disponible en este navegador.");
    }
});
