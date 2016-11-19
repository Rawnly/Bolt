$(document).ready(function() {
    // "use strict";
    var delay, temp, soundSpeed;

    $('#bt').click(function() {
        delay = $('#delay').val(); // in seconds
        soundSpeed = getSoundSpeed(temp); // ms
        $('#si').html(getDistance(soundSpeed, delay));

        $.ajax({
           url: 'http://freegeoip.net/json/',
           data: {
              format: 'json'
           },
           error: function(e) {
             console.log('An error is occurred!', e);
           },
           dataType: 'jsonp',
           success: function(data) {
             $.ajax({
               url: 'https://api.forecast.io/forecast/5884bb7f746da897d43f2189e5f3221a/' + data.latitude + ',' + data.longitude + '?units=si',
               data: {
                 format: 'json'
               },
               error: function(e) {
                 return console.error('An error is occurred');
               },
               dataType: 'jsonp',
               success: function(data) {
                 temp = data.currently.temperature;
                 console.log(temp + ' Gradi Celsius');
                 return temp
               },
               type: 'GET'
             });
           },
           type: 'GET'
        });
    })

    $('a').click(function() {
        $('html, body').animate({
            scrollTop: $('[id="' + $.attr(this, 'href').substr(1) + '"]').offset().top
        }, 500);
        return false;
    });
});

function getSoundSpeed(temperature) {
    speed = Math.round( 331.45 + ( 0.62 * temperature ) );
    if ( speed > 0 && speed !== NaN ) {
      console.log(speed);
      return speed;
    } else {
      console.log(speed);
      return 0;
    }
}

function getDistance(speed, delay) {
    mt = Math.round(speed * delay); // METERS
    km = (speed / 1000) * delay; // KILOMETERS
    return km.toLocaleString() + ' <span class="unit">km</span>  | ' + mt.toLocaleString() + ' <span class="unit">mt</span>';
}
