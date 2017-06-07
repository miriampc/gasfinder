'use strict';
const StationDetails = (update) => {
  const mapa = $('<div id="map"></div>');
  const detail = $('<section class="station-detail"></section>');
  const h3 = $(`<h3>${state.selectedStation.name}</h3>`);
  const hr = $('<hr>');
  const address = $(`<p>${state.selectedStation.address}</p>`);
  detail.append(mapa);
  detail.append(h3);
  detail.append(hr);
  detail.append(address);

  var gasType;
  state.selectedStation.products.forEach((e,i)=>{
    gasType = $('<div class="gas-type">'+e+'</div>');
    detail.append(gasType);
  })
  const divDistance = $(`<div class="distance"></div>`);

  detail.append(divDistance);

  var latitud, longitud;
  $(_=>{
    //Crea el mapa
    const map = new GMaps({
      div: '#map',
      lat: state.selectedStation.lat,
      lng: state.selectedStation.long
    });
    //Añade marcador de la direccion de la estacion seleccionada
    map.addMarker({
      lat: state.selectedStation.lat,
      lng: state.selectedStation.long,
      title: state.selectedStation.name,
      infoWindow: {
        content: '<strong>Estacion de gas:</strong><p>'+state.selectedStation.address+'</p>'
      }
    });

    //Determina la ubicación actual
    GMaps.geolocate({
      success: function(position) {
        latitud = position.coords.latitude;
        longitud = position.coords.longitude;
        map.setCenter(latitud, longitud);

        //Funcion que añade marcador de la ubicacion actual
        map.addMarker({
          lat: latitud,
          lng: longitud,
          infoWindow: {
            content: '<strong>Tu ubicacion:</strong><p>lima</p>'
          }
        });
        //Funcion para trazar la ruta
        map.drawRoute({
          origin: [latitud, longitud],
          destination: [state.selectedStation.lat, state.selectedStation.long],
          travelMode: 'driving',
          strokeColor: '#131540',
          strokeOpacity: 0.6,
          strokeWeight: 6
        });

        map.getRoutes({
          origin: [latitud, longitud],
          destination: [state.selectedStation.lat, state.selectedStation.long],
          callback: function(response){
              var duration = response[0].legs[0].duration.text;
              var distance = response[0].legs[0].distance.value/1000;
              divDistance.append(`Distancia: ${distance} \n Tiempo:${duration}`)
          }
        });
      },
      error: function(error) {
        alert('Geolocalización fallada: '+error.message);
      },
      not_supported: function() {
        alert("Tu navegador no soporta la API geolocation");
      }
    });
  })
  return detail;
}
