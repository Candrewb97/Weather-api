
var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var temp = document.querySelector(".temperature");
var city = document.querySelector(".city");
var desc = document.querySelector(".description");
var icon = document.querySelector(".icon");
var timezone =
  
  button.addEventListener("click", function () {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
        inputValue.value +
        ",us" +
        "&appid=b278274f83cd4f81b715ce235212c73c"
    )
      .then((response) => response.json())
      .then((data) => {
        
        var cityValue = data.name;
        var tempValue = (data["main"]["temp"] =
          (Math.floor(data["main"]["temp"] - 273.15) * 9) / 5 + 32 + " °F"); 
        var descValue = data["weather"][0]["description"];
        var timezone = data.timezone;
        const clock = document.getElementById("clock");

        updateTime = () => {
          
          setInterval(() => {
            const now = moment()
              .utcOffset(timezone / 60)
              .format("MMMM Do YYYY, h:mm a");
            clock.textContent = now;
          }, 1000);
        };
        
        city.innerHTML = cityValue;
        temp.innerHTML = tempValue;
        desc.innerHTML = descValue;
        console.log(data);
        updateTime();
      })

      .catch((err) => alert("Not a valid Zipcode!"));
  });
