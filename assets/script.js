//  global variables
var APIkey = "200975281-2d283bf1ff307c50113654f42a31551f";
var state = $("#state").val();
var city = $("#city").val();
var currentResults = {};
var submit = $("#submitBtn");
mapboxgl.accessToken = 'pk.eyJ1IjoiZGltaXRyaW5ha29zIiwiYSI6ImNraG04emxjdTAzdmIyc2xnZDU1OHptdzQifQ.wLfsubXg_PoFLbSd9ZcGpg';

// initial function to check local storage and values inside the search parameters
function init() {
    currentResults = JSON.parse(localStorage.getItem("trails")) || { trails: [] };
    if (currentResults.trails.length) {
        loadTrails();
    }
    if (!state) {
        state = "NorthCarolina";
    }
    if (!city) {
        city = "Charlotte";
    }
}

//  function that populates the content for the main div
function mainTrail(selected) {
    $("#mainTitle").text(currentResults.trails[selected].name);
    $("#mainLocation").text(currentResults.trails[selected].location);
    $("#mainIMG").attr("src", currentResults.trails[selected].imgSmall);
    $("#mainInfo").text(currentResults.trails[selected].summary);
    $("#mainDiff").text("Difficulty Color: " + currentResults.trails[selected].difficulty.toUpperCase());
    $("#mainLength").text("Trail Distance: " + currentResults.trails[selected].length + " Miles");
    $("#mainStars").text("Trail Rating: " + currentResults.trails[selected].stars + " Out of 5");
    loadMap(currentResults.trails[selected].latitude, currentResults.trails[selected].longitude);
    fiveCityInfo(currentResults.trails[selected].latitude, currentResults.trails[selected].longitude);
}

//  function that loads map to specific coords and drops a marker in that spot
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

//  event listener on submit button that checks the input value of the form and adds it to the API URL 
//  fires off multiple functions to populate the main div, the local trails on the bottom of the page,
//   the map generation, and the weather 
$("#submitBtn").on("click", function (event) {
    event.preventDefault();
    city = $("#city").val();
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=93048a14e536394603a5f5173a41d761",
        method: "GET"
    }).then(function (weather) {

        let lat = weather.coord.lat;
        let long = weather.coord.lon;

        trailSearch(lat, long);
        fiveCityInfo(lat, long);
    })
})

// takes the latitude and longitude from the weather search and produces it for the trail search.
//  also takes the ajax array and set it into the local storage.
function trailSearch(lat, long) {
    $.ajax({
        url: "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxResults=12&key=200975281-2d283bf1ff307c50113654f42a31551f",
        method: "GET"

    }).then(function (response) {
        currentResults = response;
        localStorage.setItem("trails", JSON.stringify(currentResults));
        loadTrails();
    })
};

//  function used to handle the generation of the two rows of trails at the bottom of the page.
function loadTrails() {
    if (!currentResults.trails.length) {
        return false;
    }
    mainTrail(0);

    $(".trailList1").empty();
    $(".trailList2").empty();

    for (var i = 0; i < currentResults.trails.length; i++) {
        if (i <= 5) {
            var article = $('<article id="trailOpt' + i + '" class="tile is-child box trail is-2">');
            article.css("cursor", "pointer");
            article.attr("data-trailNum", i);
            var newP = $('<p class="subtitle difColor" id="name' + i + '">').text(currentResults.trails[i].name);
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

    }
};

//  onclick event for the local trails that are part of the bottom divs.
$(document).on("click", ".trail", function () {
    mainTrail($(this).attr("data-trailNum"));
})

//  generates the weather forecast below the main trail.
function fiveCityInfo(lat, long) {
    $("#fiveDayCast").empty();

    var APIKey = "3047b4fdf5e4cef615044702d2f6aa10";
    var fiveURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + APIKey

    // Creates AJAX call for the specific city button being clicked
    $.ajax({
        url: fiveURL,
        method: "GET"
    }).then(function (fiveresponse) {
        results = fiveresponse.list;

        for (var i = 0; i < results.length; i++) {
            if (fiveresponse.list[i].dt_txt.split(" ")[1] === "15:00:00") {
                var currentDay = results[i];
                fiveDayDiv = $("<div>");
                p = $("<p>");
                p.text(moment.unix(currentDay.dt).format("L"));
                fiveDayDiv.addClass("five-day");
                fiveDayDiv.addClass("box");
                fiveDayDiv.append(p);
                $("#fiveDayCast").append(fiveDayDiv);
                cloudImage = $("<img>")
                cloudImage.attr("src", "https://openweathermap.org/img/wn/" + currentDay.weather[0].icon + ".png");
                fiveDayDiv.append(cloudImage);
                ptemp = $("<h6>");
                ptemp.text("Temp: " + results[i].main.temp + "\u00B0F");
                fiveDayDiv.append(ptemp);
                phum = $("<h5>");
                phum.text("Humidity: " + results[i].main.humidity + "%");
                fiveDayDiv.append(phum);
            }
        }
    });
};

function handleMapClick(e) {
    console.log('handleMapClick', e);
    map.off('click', handleMapClick.bind(this));
};

init()