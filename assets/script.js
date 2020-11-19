var APIkey = "200975281-2d283bf1ff307c50113654f42a31551f";
// var hikingURL = "https://cors-anywhere.herokuapp.com/https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=30&key=200975281-2d283bf1ff307c50113654f42a31551f";
var state = $("#state").val();
var city = $("#city").val();
var currentResults = {};
mapboxgl.accessToken = 'pk.eyJ1IjoiZGltaXRyaW5ha29zIiwiYSI6ImNraG04emxjdTAzdmIyc2xnZDU1OHptdzQifQ.wLfsubXg_PoFLbSd9ZcGpg';


function init() {
    currentResults = JSON.parse(localStorage.getItem("trails")) || { trails: [] };
    if (currentResults.trails.length) {
        console.log(currentResults);
        loadTrails();

    }

    if (!state) {
        state = "NorthCarolina";
    }

    if (!city) {
        city = "Charlotte";
    }
}





//  need to set the id to an HTML
function mainTrail(selected) {
    console.log(currentResults.trails[selected]);
    $("#mainTitle").text(currentResults.trails[selected].name);
    $("#mainLocation").text(currentResults.trails[selected].location);
    $("#mainIMG").attr("src", currentResults.trails[selected].imgSmall);
    $("#mainInfo").text(currentResults.trails[selected].summary);
    $("#mainDiff").text("Difficulty Color: " + currentResults.trails[selected].difficulty.toUpperCase());
    $("#mainLength").text("Trail Distance: " + currentResults.trails[selected].length + " Miles");
    $("#mainStars").text("Trail Rating: " + currentResults.trails[selected].stars + " Out of 5");
    loadMap(currentResults.trails[selected].latitude, currentResults.trails[selected].longitude);
}

function loadMap(lat, long) {

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [long, lat],
        zoom: 12
    });

    var marker = new mapboxgl.Marker()
        .setLngLat([long, lat])
        .addTo(map);

}


var submit = $("#submitBtn")

$("#submitBtn").on("click", function (event) {
    event.preventDefault();

    city = $("#city").val();

    // https://cors-anywhere.herokuapp.com/https://www.hikingproject.com/data/get-trails?lat=35.23&lon=-80.84&maxDistance=10&key=200975281-2d283bf1ff307c50113654f42a31551f
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=93048a14e536394603a5f5173a41d761",
        method: "GET"
    }).then(function (weather) {

        console.log(weather);

        let lat = weather.coord.lat;
        let long = weather.coord.lon;

        //loadMap(lat, long)


        // var el = document.createElement('div');
        // el.style.backgroundImage = 'url(https://placekitten.com/g/40/40/)';
        // el.style.width = 40 + 'px';
        // el.style.height = 40 + 'px';




        trailSearch(lat, long);
    })
})
function trailSearch(lat, long) {
    $.ajax({
        url: "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxResults=12&key=200975281-2d283bf1ff307c50113654f42a31551f",
        method: "GET"

    }).then(function (response) {
        console.log(response);

        // showTrail()
        currentResults = response;
        localStorage.setItem("trails", JSON.stringify(currentResults));
        // console.log(currentResults)
        loadTrails();
    })

};

function loadTrails() {
    if (!currentResults.trails.length) {
        return false
    }
    mainTrail(0);
    // var nameResp = response.trails[1].name;
    // var infoResp = response.trails[1].summary;
    // // $("#name" + i).text(nameResp);
    // $("#info1").text(infoResp);
    // $("#name1").text(nameResp);

    $(".trailList1").empty()
    $(".trailList2").empty()

    for (var i = 0; i < currentResults.trails.length; i++) {
        console.log("test");
        if (i <= 5) {
            var article = $('<article id="trailOpt' + i + '" class="tile is-child box trail is-2">');
            article.css("cursor", "pointer");
            article.attr("data-trailNum", i);
            var newP = $('<p class="subtitle difColor" id="name' + i + '">').text(currentResults.trails[i].name);
            // <div class="content">

            var content = $('<p class="content difColor">').text(currentResults.trails[i].summary);

            var content = $('<img class="content">').attr("src", currentResults.trails[i].imgSqSmall);

            article.append(newP, content);
            $(".trailList1").append(article);

        }
        else if (i > 5) {
            var article = $('<article id="trailOpt' + i + '" class="tile is-child box trail is-2">');
            article.css("cursor", "pointer");
            article.attr("data-trailNum", i);
            var newP = $('<p class="subtitle difColor" id="name' + i + '">').text(currentResults.trails[i].name);
            // <div class="content">

            var content = $('<p class="content difColor">').text(currentResults.trails[i].summary);

            var content = $('<img class="content">').attr("src", currentResults.trails[i].imgSqSmall);
            article.append(newP, content);
            $(".trailList2").append(article)
        }

    };
}

$(document).on("click", ".trail", function () {
    mainTrail($(this).attr("data-trailNum"));
    console.log("here")
})








// function handleKitten(e) {
//     e.target.style.backgroundImage = 'url(http://placekitten.com/g/50/50)';
//     e.stopPropagation();
// }

function handleMapClick(e) {
    console.log('handleMapClick', e);
    map.off('click', handleMapClick.bind(this));
}

// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v9',
//     center: [lat, long],
//     zoom: 5
// });

// var el = document.createElement('div');
// el.style.backgroundImage = 'url(https://placekitten.com/g/40/40/)';
// el.style.width = 40 + 'px';
// el.style.height = 40 + 'px';



// new mapboxgl.Marker(el)
//     .setLngLat([lat, long])
//     .addTo(map);

// map.on('click', handleMapClick.bind(el));


// el.addEventListener('click', handleKitten, false);
init()