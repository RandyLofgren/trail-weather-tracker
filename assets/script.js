var APIkey = "200975281-2d283bf1ff307c50113654f42a31551f"
// var hikingURL = "https://cors-anywhere.herokuapp.com/https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=30&key=200975281-2d283bf1ff307c50113654f42a31551f";
var state = $("#state").val()
var city = $("#city").val()
var currentResults = {}
// city = "Charlotte"
if (localStorage.getItem("trails")) {
    currentResults = JSON.parse(localStorage.getItem("trails"))
    loadTrails()
}
if (!state) {
    state = "NorthCarolina"
}
if (!city) {
    city = "Charlotte"
}


///////////////////just holding onto this in case i need the URL and key
// $.ajax({
//     url: "https://www.hikingproject.com/data/get-trails?lat=35.227&lon=-80.843&maxDistance=300&key=" + APIkey,
//     method: "GET"
// }).then(function (response) {
//     // console.log(response)
//     $(".message-body").text(response.trails[0].name)
//     console.log(response)


// });



//  need to set the id to an HTML
var submit = $("#submitBtn")
function mainTrail(selected) {
    $("#mainTitle").text(currentResults.trails[selected].name)
    $("#mainLocation").text(currentResults.trails[selected].location)
    $("#mainIMG").attr("src", currentResults.trails[selected].imgMedium)
    $("#mainInfo").text(currentResults.trails[selected].summary)
}

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

        // for (let i = 0; i < array.length; i++) {
        //     // weather data
        //     // $("#weatherForecast").weather.

        // }
        console.log(lat, long);
        trailSearch(lat, long);
    })
})
function trailSearch(lat, long) {
    $.ajax({
        url: "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&&maxResults=12&key=200975281-2d283bf1ff307c50113654f42a31551f",
        method: "GET"
        
    }).then(function (response) {
        console.log(response);
        
        // showTrail()
        currentResults = response;
        localStorage.setItem("trails", JSON.stringify(currentResults));
        loadTrails();
    })

};

function loadTrails() {
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
            article.append(newP, content);
            $(".trailList2").append(article)
        }

    };
}

$(document).on("click", ".trail", function () {
    mainTrail($(this).attr("data-trailNum"));
})

// function to get trail data //
// function to show hiking trail results //

// var resultOfTrails = (trails[i].name);
// var trails = data.trails;

// function showTrail() {
//     $("#mainTitle").text("");
//     if (currentResults.trails.length === "0") {
//         $("#mainTitle").text("Please Enter a Valid City");
//         // $(".trailResult").text(resultOfTrails);
//     }
// }




//  At the opening of the page there is a search function for city, State
        //  Use the search function in weather API and use the lat and long variables and store them as variables

//  after searching.  use that result to generate a result
        // using the lat and long variables 

//  turn that result to fill in all the information for the sections.

//  use the results from the search to give weather readings for the area.

//  populate the bottom section with other recommended local trails






