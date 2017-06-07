'use strict';
const StationDetails = (update) => {
  const detail = $('<section class="detail"></section>');
  const mapa = $('<div id="map"></div>');
  const stationDetail = $('<div class="station-detail"></div>');
  const dataDetail = $('<div class="data-detail"></div>');
  const gasTypeDetail = $('<div class="gasType-detail"></div>');
  const h3 = $(`<h3>${state.selectedStation.name}</h3>`);
  const hr = $('<hr>');
  const address = $(`<p>${state.selectedStation.address}</p>`);

  detail.append(mapa);
  stationDetail.append(h3);
  stationDetail.append(address);
  stationDetail.append(hr);

  state.selectedStation.products.forEach((e)=>{
    const gasType = $(`<div class="gas-type">${e}</div>`);
    gasTypeDetail.append(gasType);
  })
  const divDistance = $(`<div class="distance"></div>`);

  dataDetail.append(gasTypeDetail);
  dataDetail.append(divDistance);
  stationDetail.append(dataDetail);
  detail.append(stationDetail);

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
        content: '<div style="color:#212121;"><strong>Estacion de gas:</strong><p>'+state.selectedStation.address+'</p><7div>'
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
            content: '<div style="color:#212121;"><strong>Tu ubicacion:</strong><p>lima</p></div>'
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
              divDistance.append(`<strong>Distancia: </strong> ${distance} Km. <br> <strong>Tiempo: </strong>${duration}`)
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
