var apiKey = "d3f12c880b658acd3d519c8cfcc9cfbf";
var lon;
var lat;
var uviColor;

const $locationBtn = document.querySelector(`#locationBtn`);
const $input = document.querySelector(`input`);
const $currentWx = document.querySelector('#currentWx')
const $msg = document.querySelector(`.msg`)
const $history = document.querySelector('#historyInner');
const $weatherIcon = document.querySelector('#weather-icon');
const $histButton = document.querySelector('#historyBtn');
const $historyInner = document.querySelector('#historyInner');
$locationBtn.addEventListener('click', function () {
    let Input = $input.value;
    getWx(Input);


    
});

$historyInner.addEventListener('click', function(e){
    let clickLocation = e.target
    let city = "";
    if (clickLocation.className == ("history-city")){
        city = clickLocation.innerText;
    } 
    console.log(city);
    getWx(city);
});




function getWx(userInput){
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=imperial`;


    fetch (weatherURL)
        .then(response => response.json())
        .then(data => {
            const { main, name, weather, wind, coord, dt } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
            document.getElementById('deg').innerHTML=main.temp;
            document.getElementById('wSpeed').innerHTML=wind.speed;
            document.getElementById('hum').innerHTML=main.humidity;
            lon = coord.lon;
                //console.log(lon);
                //console.log(coord.lon);
            lat = coord.lat;
            const date = new Date(dt*1000);
            //console.log(date);
            document.getElementById('date').innerHTML="Date: " + date;
            const oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

        fetch (oneCall)
        .then(res => res.json())
        .then(data2 => {
            const { current, daily } = data2;
        
            document.getElementById('uvi').innerHTML=current.uvi;
            if (current.uvi < 3){
                uviColor = "green";
            }
            if(current.uvi>= 3 && current.uvi < 7){
                uviColor = "orange";
            }
            if (current.uvi>=8){
                uviColor = "red";}

            uviColorFunc(uviColor);

               // console.log(daily[0]["temp"]["min"])
                //Day1
                document.getElementById('d1Temp').innerHTML="Temp: " + daily[0]["temp"]["day"];
                document.getElementById('d1Wnd').innerHTML="Wind Speed: " + daily[0]["wind_speed"];
                document.getElementById('d1Hum').innerHTML="Humidity: " + daily[0]["humidity"];
                const icon1 =  `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${daily[0]["weather"][0]["icon"]}.svg`
                document.getElementById('d1Img').src= icon1;

                //Day2
                document.getElementById('d2Temp').innerHTML="Temp: " + daily[1]["temp"]["day"];
                document.getElementById('d2Wnd').innerHTML="Wind Speed: " + daily[1]["wind_speed"];
                document.getElementById('d2Hum').innerHTML="Humidity: " + daily[1]["humidity"];
                const icon2 =  `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${daily[1]["weather"][0]["icon"]}.svg`
                document.getElementById('d2Img').src= icon2;
                
                //Day3
                document.getElementById('d3Temp').innerHTML="Temp: " + daily[2]["temp"]["day"];
                document.getElementById('d3Wnd').innerHTML="Wind Speed: " + daily[2]["wind_speed"];
                document.getElementById('d3Hum').innerHTML="Humidity: " + daily[2]["humidity"];
                const icon3 =  `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${daily[2]["weather"][0]["icon"]}.svg`
                document.getElementById('d3Img').src= icon3;

                //Day4
                document.getElementById('d4Temp').innerHTML="Temp: " + daily[3]["temp"]["day"];
                document.getElementById('d4Wnd').innerHTML="Wind Speed: " + daily[3]["wind_speed"];
                document.getElementById('d4Hum').innerHTML="Humidity: " + daily[3]["humidity"];
                const icon4 =  `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${daily[3]["weather"][0]["icon"]}.svg`
                document.getElementById('d4Img').src= icon4;

                //Day5
                document.getElementById('d5Temp').innerHTML="Temp: " + daily[4]["temp"]["day"];
                document.getElementById('d5Wnd').innerHTML="Wind Speed: " + daily[4]["wind_speed"];
                document.getElementById('d5Hum').innerHTML="Humidity: " + daily[4]["humidity"];
                const icon5 =  `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${daily[4]["weather"][0]["icon"]}.svg`
                document.getElementById('d5Img').src= icon5;
        })
            

            

            const $div = document.createElement("div");
            $div.setAttribute("id", "weather-icon")
            const contBox = `<h2 class="city-name" data-name="${name}">
            <span>${name} ${Math.round(main.temp)}<sup>??F</sup>  </span>
            </h2>
            <figure>
                <img class="city-icon" src="${icon}" alt="${
                    weather[0]["description"]
                }">
            <figcaption>${weather[0]["description"]}</figcaption>
             </figure>`;

             $div.innerHTML = contBox;
             document.getElementById("weather-icon").innerHTML=contBox;


             const $div2 = document.createElement("li");
             $div2.setAttribute("class","history-city");
             $div2.setAttribute('id', 'history-city' );
             const contBox2 = `${name}`;
            
             $div2.innerHTML = contBox2;
             $history.prepend($div2);

             
        
        })
        // .catch(() => {
        //     $msg.textContent = "try again";
        // });
        
        function uviColorFunc (color) {
            var uvi = document.getElementById("uvi");
            uvi.style.backgroundColor = `${color}`;
            //color.removeAttribute("disabled");
        }
        
        // document.getElementById("history-Inner").addEventListener('click', function(e){
        //     if (e.target && e.target.matches("li.history-city")){
        //         console.log(e.target.innerHTML);
        //         //getWx(e.target.innerHTML);
        //     }
        // });

    $msg.textContent = "";
    $input.focus();
}