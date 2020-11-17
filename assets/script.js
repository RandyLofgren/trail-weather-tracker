var APIkey = "200975281-2d283bf1ff307c50113654f42a31551f"
// var hikingURL = "https://cors-anywhere.herokuapp.com/https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=30&key=200975281-2d283bf1ff307c50113654f42a31551f";
var state = $("#state").val()
var city = $("#city").val()
// state = "NorthCarolina"
city = "Charlotte"


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

$("#submitBtn").on("click", function (event) {
    event.preventDefault()

    city = $("#city").val()


    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&appid=93048a14e536394603a5f5173a41d761",
        method: "GET"
    }).then(function (weather) {

        console.log(weather)

        let lat = weather.coord.lat
        let long = weather.coord.lon



        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=10&key=200975281-2d283bf1ff307c50113654f42a31551f",
            method: "GET"
        }).then(function (response) {
            // console.log(response)

            // showTrail()

            $("#mainTitle").text(response.trails[0].name)
            $("#mainLocation").text(response.trails[0].location)
            $("#mainIMG").attr("src", response.trails[0].imgSmall)
            console.log(response)
            console.log(response)
            $(".trailList").empty()
            for (var i = 1; i < response.trails.length; i++) {
                console.log("test")
                // var nameResp = response.trails[i].name;
                var infoResp = response.trails[i].summary;
                // $("#name" + i).text(nameResp);
                $("#info" + i).text(infoResp);
                var article = $('<article id="trailOpt' + i + '" class="tile is-child box">');
                var newP = $('<p class="subtitle" id="name' + i + '">').text(response.trails[i].name);
                // <div class="content">
                var content = $('<p class="content">').text(response.trails[i].summary);
                article.append(newP, content)
                $(".trailList").append(article)


            };

        })

    });
});


// function to get trail data //
// function to show hiking trail results //

// var resultOfTrails = (trails[i].name);
// var trails = data.trails;

function showTrail() {
    $("#mainTitle").text("");
    if (response.trails.length === 0) {
        $("#mainTitle").text("Please Enter a Valid City");
        // $(".trailResult").text(resultOfTrails);
    }
}





//  At the opening of the page there is a search function for city, State
        //  Use the search function in weather API and use the lat and long variables and store them as variables

//  after searching.  use that result to generate a result
        // using the lat and long variables 

//  turn that result to fill in all the information for the sections.

//  use the results from the search to give weather readings for the area.

//  populate the bottom section with other recommended local trails






