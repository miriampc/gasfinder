'use strict';
const StationDetails = (update) => {
  console.log(state.selectedStation);
  const map = $('<div class="map">hola</div>');
  const detail = $('<section class="station-detail"></section>');
  const h3 = $(`<h3>${state.selectedStation.name}</h3>`);
  const hr = $('<hr>');
  const address = $(`<p>${state.selectedStation.address}</p>`);
  // const gas90 = $(`<div>${state.selectedMovie.products[0]}</div>`);

  detail.append(h3);
  detail.append(hr);
  detail.append(address);

  return detail;

}
