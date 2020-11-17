var APIkey = "200975281-2d283bf1ff307c50113654f42a31551f"


$("#testBtn").on("click", function (event) {
    event.preventDefault()

    $.ajax({
        url: "https://www.hikingproject.com/data/get-trails?lat=35.227&lon=-80.843&maxDistance=300&key=" + APIkey,
        method: "GET"
    }).then(function (response) {
        // console.log(response)
        $(".message-body").text(response.trails[0].name)
        console.log(response)


    });
})

$.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=93048a14e536394603a5f5173a41d761",
    method: "GET"
}).then(function (weather) {
    // console.log(response)
    console.log(weather)


});