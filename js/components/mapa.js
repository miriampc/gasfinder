// $(_=>{

  //
  // var map = new GMaps({
  //     el: '#map',
  //     lat: -12.043333,
  //     lng: -77.028333
  //   });
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -12.043333, lng: -77.028333}
        });

    var geocoder = new google.maps.Geocoder;
      var infowindow = new google.maps.InfoWindow;

    geocodeLatLng(geocoder, map, infowindow);

    function geocodeLatLng(geocoder, map, infowindow) {
        // var input = "Avenida del Ejército, Distrito de Lima"
        // var latlngStr = input.split(',', 2);
        var latlng = {lat: -12.1093606, lng: -77.0565751};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
              console.log(latlng);
              map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[1].formatted_address);
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
}
// })
