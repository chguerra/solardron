// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
if ("geolocation" in navigator) {
	console.log("Geolocation is OK");
	} else {
	console.log("Geolocation is not OK");
	}
var coord_x;
var coord_y;
var map;
    var markersArray = [];

    function initMap()
    {
        var myLatlng = {lat: 40.131, lng: -4.237};
        var myOptions = {
            zoom: 4,
            scrollwheel: true,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);

        // add a click event handler to the map object
        google.maps.event.addListener(map, "click", function(event)
        {
            // place a marker
            placeMarker(event.latLng);

        });
    }
    function placeMarker(location) {
        // first remove all markers if there are any
        deleteOverlays();

        var marker = new google.maps.Marker({
            position: location, 
            map: map
        });

        // add marker in markers array
        markersArray.push(marker);

        //map.setCenter(location);
    }

    // Deletes all markers in the array by removing references to them
    function deleteOverlays() {
        if (markersArray) {
            for (i in markersArray) {
                markersArray[i].setMap(null);
            }
        markersArray.length = 0;
        }
    }

$(document).on('click', '#map',function(){
	document.getElementById('js-coord_x').value = markersArray[0].position.lat();
	document.getElementById('js-coord_y').value = markersArray[0].position.lng();
	document.getElementById('js-zoom').value = markersArray[0].map.zoom;
});

function showSolarplant(zoom, coord_x, coord_y)
    {
        var myLatlng = {lat: coord_x, lng: coord_y};
        var myOptions = {
            zoom: zoom,
            scrollwheel: true,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
        map = new google.maps.Map(document.getElementById("map_show"), myOptions);

        // add a click event handler to the map object
        google.maps.event.addListener(map, "click", function(event)
        {
            // place a marker
            placeMarker(event.latLng);

            // display the lat/lng in your form's lat/lng fields
            //document.getElementById("latFld").value = event.latLng.lat();
            //document.getElementById("lngFld").value = event.latLng.lng();
        });
    }

function loadMap(){
	var coord_x = parseFloat($('.js-coord_x').val());
	var coord_y = parseFloat($('.js-coord_y').val());
	var zoom = parseInt($('.js-zoom').val());
	showSolarplant(zoom, coord_x, coord_y);
}