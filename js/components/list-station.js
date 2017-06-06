'use strict';
const listItem = (station, update) => {
  const boxStation = $('<div class="box-station"></div>');
  const divData = $('<div class="data-station"></div>')
  const h3 = $(`<h3>${station.name}</h3>`);
  const address = $(`<p>${station.address}</p>`);
  const district = $(`<p>${station.district}</p>`);
  const iconMap = $('<i class="fa fa-map" aria-hidden="true"></i>');

  divData.append(h3);
  divData.append(address);
  divData.append(district);
  boxStation.append(divData);
  boxStation.append(iconMap);
  boxStation.on('click',(e)=>{
    e.preventDefault();
    update();
  })
  return boxStation;
}

const ListStation = (update) => {
  const main = $('<section class="main"></section>');
  const listContainer = $('<div class="list"></div>');
  const input = $('<input id="search" type="search" placeholder="Ingresa tu distrito a buscar" autofocus>');
  const hr = $('<hr>');

  main.append(input);
  main.append(hr);
  main.append(listContainer);

  input.on('keyup',(e)=>{
      if (input.val() != "") {
        var districtFiltered = filterByDistrict(state.stations,input.val());
        reRender(listContainer,districtFiltered);
      }
      // }else {
      //   render(root);
      // }
  })
  return main;
}

const reRender = (listContainer, districtFiltered) => {
  listContainer.empty();
  districtFiltered.forEach(district => {
    listContainer.append(listItem(district,_ =>{reRender(listContainer,districtFiltered);}));
  });
}
