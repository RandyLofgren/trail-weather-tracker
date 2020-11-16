var APIkey = "200975281-2d283bf1ff307c50113654f42a31551f"

$.ajax({
    url: "https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=" + APIkey,
    method: "GET"
}).then(function (response) {
    console.log(response)
});