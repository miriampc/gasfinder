'use strict';
const StationDetails = (update) => {
  const mapa = $('<div id="map"></div>');
  const detail = $('<section class="station-detail"></section>');
  const h3 = $(`<h3>${state.selectedStation.name}</h3>`);
  const hr = $('<hr>');
  const address = $(`<p>${state.selectedStation.address}</p>`);
  const gas90 = $(`<div>${state.selectedStation.products[0]}</div>`);

  detail.append(mapa);
  detail.append(h3);
  detail.append(hr);
  detail.append(address);
  detail.append(gas90);

  $(_=>{
    var map = new GMaps({
        div: '#map',
        lat: state.selectedStation.lat,//-12.1191427,
        lng: state.selectedStation.long// -77.0349046
      });

    map.addMarker({
      lat: state.selectedStation.lat,
      lng: state.selectedStation.long,
      title: state.selectedStation.name,
      click: function(e) {
        alert('You clicked in this marker');
      }
    });
  })
  return detail;
}
