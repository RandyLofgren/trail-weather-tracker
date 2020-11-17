var APIkey = "200975281-2d283bf1ff307c50113654f42a31551f"






/////////////////////just holding onto this in case i need the URL and key
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

$("#testBtn").on("click", function (event) {
    event.preventDefault()



    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=Charlotte,NorthCarolina&appid=93048a14e536394603a5f5173a41d761",
        method: "GET"
    }).then(function (weather) {
        // console.log(response)
        let lat = weather.coord.lat
        let long = weather.coord.long

        $.ajax({
            url: "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + long + "&maxDistance=300&key=200975281-2d283bf1ff307c50113654f42a31551f",
            method: "GET"
        }).then(function (response) {
            // console.log(response)
            $(".message-body").text(response.trails[0].name)
            console.log(response)


        });



    });
})
//  At the opening of the page there is a search function for city, State
        //  Use the search function in weather API and use the lat and long variables and store them as variables

//  after searching.  use that result to generate a result
        // using the lat and long variables 

//  turn that result to fill in all the information for the sections.

//  use the results from the search to give weather readings for the area.

//  populate the bottom section with other recommended local trails






