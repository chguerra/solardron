var hotspotsCollection;
var map;

function showSolarplantReport(zoom, coord_x, coord_y, hotspots)
    {
        var myLatlng = {lat: coord_x, lng: coord_y};
        var myOptions = {
            zoom: zoom,
            scrollwheel: true,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };
        map = new google.maps.Map(document.getElementById("mapreport"), myOptions);
        var hotspotsarray = hotspots;
        hotspotsarray.forEach(function(hotspot){
            var latlang = {lat: hotspot.coord_x, lng: hotspot.coord_y};
            if(hotspot.hidden == 0){
            $('.hotspot-collection').append('<div class="card">' + 
            '<div class="card-image-report">' +
              '<img src="/reports/' + hotspot.report_id + '/' + hotspot.date + '_' + hotspot.hotspot_id + '.png">' +
              '<span class="card-title">Punto nº ' + hotspot.hotspot_id + '</span>' +
            '</div>' +
            '<div class="card-content">' + 
              '<p>Temperatura máxima: ' + hotspot.max_temp + 'º<br>Temperatura mínima: ' + hotspot.min_temp + 'º</p>' +
            '</div>' +
            '<div class="card-action">' +
              '<a class="js-printed-report" data-hotspotid="' + hotspot.id + '"href="#" >Añadir al informe</a>' +
            '</div>' +
          '</div>');
            placeMarker(latlang, hotspot.hotspot_type, hotspot);
                                    };
        });                                                                       ;

        function placeMarker(location, hotspotType, hotspot) {
            // first remove all markers if there are any

            var marker = new google.maps.Marker({
                position: location, 
                animation: google.maps.Animation.DROP,
                map: map
            });
            if(hotspotType == 1){
            marker.setIcon('http://www.googlemapsmarkers.com/v1/' + hotspot.hotspot_id + '/00ccff/');
            }else if( hotspotType == 2){
            marker.setIcon('http://www.googlemapsmarkers.com/v1/' + hotspot.hotspot_id + '/00cc00/');    
            }else if( hotspotType == 3){
            marker.setIcon('http://www.googlemapsmarkers.com/v1/' + hotspot.hotspot_id + '/ffff00/');    
            }else if( hotspotType == 4){
            marker.setIcon('http://www.googlemapsmarkers.com/v1/' + hotspot.hotspot_id + '/ff9900/');
            }else if( hotspotType == 5){
            marker.setIcon('http://www.googlemapsmarkers.com/v1/' + hotspot.hotspot_id + '/ff0000/');    
            };
            // add marker in markers array
            markersArray.push(marker);
            marker.addListener('click', function() {
            map.setZoom(18);
            map.setCenter(marker.getPosition());
            window.location.hash = '#js-focus-point';
            $('.card-image-main').empty();
            $('.chip-collection').empty();
            $('.card-image-main').html('<img src="/reports/' + hotspot.report_id + '/' + hotspot.date + '_' + hotspot.hotspot_id + '.png" >');
            $('.chip-collection').html('<div class="chip"> ID: ' + hotspot.hotspot_id + '</div><div class="chip"> TªMax: ' + hotspot.max_temp + 'º</div><div class="chip">TªMin: ' + hotspot.min_temp + 'º</div>');
            });
            //map.setCenter(location);
        }

    }

function fetchHotspots(){
    var request = $.get('/api/hotspots/' + $('#js-report_id').data('reportid'));
    
    function handleHotspots(request) {
        hotspotsCollection = request;
        var lat = $('#js-coord_x').data('coordx');
        var lng = $('#js-coord_y').data('coordy');
        var zoom = $('#js-zoom').data('zoom');
        showSolarplantReport(zoom, lat, lng, request);
        getMaxAndMinTemp();   
    }

    function handleError (err1, err2, err3) {
        console.error('OH NO!!', err1, err2, err3);
    }

    request.done(handleHotspots);
    request.fail(handleError);
};

function initShowReport (){
    document.getElementById('tipo1').checked = true;
    document.getElementById('tipo2').checked = true;
    document.getElementById('tipo3').checked = true;
    document.getElementById('tipo4').checked = true;
    document.getElementById('tipo5').checked = true;
    fetchHotspots();
    

};

function hideMarkers(hstype){
    hotspotsCollection.forEach(function(hotspot){
        if(hotspot.hotspot_type == hstype){
            hotspot.hidden = 1;
        }
    });
        var lat = $('#js-coord_x').data('coordx');
        var lng = $('#js-coord_y').data('coordy');
        var zoom = $('#js-zoom').data('zoom');
        showSolarplantReport(zoom, lat, lng, hotspotsCollection); 
};

function showMarkers(hstype){
    hotspotsCollection.forEach(function(hotspot){
        if(hotspot.hotspot_type == hstype){
            hotspot.hidden = 0;
        }
    });
        var lat = $('#js-coord_x').data('coordx');
        var lng = $('#js-coord_y').data('coordy');
        var zoom = $('#js-zoom').data('zoom');
        showSolarplantReport(zoom, lat, lng, hotspotsCollection);
};

$(document).on('click', '.js-refresh-report', function(event){
    deleteOverlays();
    $('.hotspot-collection').empty();
    if(event.currentTarget.checked === true){
        showMarkers(event.currentTarget.dataset.type);
    } else {
        hideMarkers(event.currentTarget.dataset.type);
    };
});

$(document).on('click', '.js-printed-report', function(event){
    if(document.getElementById(parseInt(event.currentTarget.dataset.hotspotid)).checked == true ){
        event.currentTarget.toggle();
    } else {
        document.getElementById(parseInt(event.currentTarget.dataset.hotspotid)).checked = true;
        event.currentTarget.toggle();
    };
});

$(document).on('click', '#js-generate-advanced-report', function(event){
    event.preventDefault();
    console.log("It's here");
    var reportArray = [];
    var boxes = $('.js-report-generator');
    for (i = 0; i < boxes.length; i++) { 
        if(boxes[i].checked == true){
            reportArray.push(parseInt(boxes[i].dataset.hotspotid));
        }
    }
    $('#hiddenform').append('<form action="/advanced" method="post">' +
        '<input name="authenticity_token" value="<%= form_authenticity_token %>" type="hidden">' +
       '<input name="hotspotarray" type="text" value="' + reportArray + '">' +
       '<input name="reportid" type="text" value="' + $('#js-report_id').data('reportid') + '">' +
       '<button type="submit" id="hiddenreportbutton" ></button>' + 
       '</form>');

    $('#hiddenreportbutton').click();


    reportArray = [];
});

function getMaxAndMinTemp(){
    var max = 0;
    var min = 100;
    hotspotsCollection.forEach(function(hotspot){
        if(hotspot.max_temp > max){
            max = hotspot.max_temp; 
        };
        if(hotspot.min_temp < min){
            min = hotspot.min_temp;
        };
    });
    var mid = (max + min)/2
    $('#toprange').html(max + 'ºC')
    $('#medrange').html(mid + 'ºC')
    $('#botrange').html(min + 'ºC')
    addRangeSlider(max, min);
};

function filterByTemperature(tempArray){
    maxTemp = tempArray[1];
    minTemp = tempArray[0];
    hotspotsCollection.forEach(function(hotspot){
        if(hotspot.max_temp > maxTemp || hotspot.min_temp < minTemp){
            hotspot.hidden = 1;
        }
        if(hotspot.max_temp < maxTemp || hotspot.min_temp > minTemp){
            hotspot.hidden = 0;
        }
    })

    var lat = $('#js-coord_x').data('coordx');
    var lng = $('#js-coord_y').data('coordy');
    var zoom = $('#js-zoom').data('zoom');
    $('.hotspot-collection').empty();
    showSolarplantReport(zoom, lat, lng, hotspotsCollection); 
};

function addRangeSlider(maxTemp, minTemp) {
    $( "#slider-range" ).slider({
        orientation: "vertical",
      range: true,
      min: minTemp,
      max: maxTemp,
      values: [ parseInt(minTemp), parseInt(maxTemp) ],
      change: function( event, ui ) {
        $( "#amount" ).val(ui.values[ 0 ] + " º - " + ui.values[ 1 ] + 'º' );
        filterByTemperature(ui.values);
      }
    });
    $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
      " - " + $( "#slider-range" ).slider( "values", 1 ) );
  };

  function temperatureCheck(hstype){
    hotspotsCollection.forEach(function(hotspot){
        if(hotspot.hotspot_type == hstype){
            hotspot.hidden = 1;
        }
    });
        var lat = $('#js-coord_x').data('coordx');
        var lng = $('#js-coord_y').data('coordy');
        var zoom = $('#js-zoom').data('zoom');
        showSolarplantReport(zoom, lat, lng, hotspotsCollection); 
};

$(document).on('change', '#js-select-hotspot', function(event){
    var hotspot = hotspotsCollection[($('#js-select-hotspot').val())-1];

    $('.card-image-main').empty();
    $('.chip-collection').empty();
    $('.card-image-main').html('<img src="/reports/' + hotspot.report_id + '/' + hotspot.date + '_' + hotspot.hotspot_id + '.png" >');
    $('.chip-collection').html('<div class="chip"> ID: ' + hotspot.hotspot_id + '</div><div class="chip"> TªMax: ' + hotspot.max_temp + 'º</div><div class="chip">TªMin: ' + hotspot.min_temp + 'º</div>');
            
});