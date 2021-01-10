const API = "YOUR_API_KEY[openweathermap.org]";
const WICON = "http://openweathermap.org/img/wn/";
let world = [];
$(function(){
    $.get("https://restcountries.eu/rest/v2", function (data) {
        data.forEach(v=>{
            $('#countries').append(new Option(v.name, v.name));
        });
        world = data;
    });

    $('#countries').on('change',function(){
        let countryName = $("#countries :selected").val();
        let country = world.find(c=>c.name === countryName);
        $('#country-name').text(country.name);
        $('#native-name').text(country.nativeName);
        $('#capital').text(country.capital);
        $('#region').text(country.region);
        $('#call').text(country.callingCodes[0]);
        $('#population').text(country.population);
        $('#language').text(country.languages[0].nativeName);
        $('#time-zone').text(country.timezones[0]);

        $('#flag').attr('src',country.flag);
        $('.map-flag').show();
        console.log(country);
        let map = new Microsoft.Maps.Map('#map', {
            credentials: 'AhpO7thHQ2n5HGBqJXhScM_wTcG_CICBYjhQ5_KTqwGU759K9EBTgl7btuBqk4og',
            center: new Microsoft.Maps.Location(country.latlng[0], country.latlng[1]),
            zoom: 7
        });
        let centerMap = map.getCenter();
        let pin = new Microsoft.Maps.Pushpin(centerMap, {
            title: country.name,
            icon: 'assets/image/marker.png'
        });
        map.entities.push(pin);

        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name}&appid=${API}`, function (weather) {
            we = weather;
            let icon = weather.weather[0].icon;
            $('#weather-img').attr("src",`${WICON+icon}@2x.png`).fadeIn();
            $('#weather-description').text(weather.weather[0].description);
            $('#temp').text(weather.main.temp+"F");
            $('#wind').text(weather.wind.speed+"MS");
            $('#humidity').text(weather.main.humidity+"%");
            $('#visibility').text(weather.visibility+"m");
        });
        setInterval(()=>{
            $('#weather-img').animate({top: '-10px'});
            setTimeout(()=>{
                $('#weather-img').animate({top: '+10px'});
            }, 1500);
        }, 1500);
    });

});