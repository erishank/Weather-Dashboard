let dynamicText=document.querySelector('h1 span');
let words= ['Dashboard','London','New York', 'Tokyo','Kathmandu','World'];

let wordIndex=0;
let charIndex=0;
let Delete=false;

    let typeEffect = () => {
    let currentWord = words[wordIndex];
    let currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent =currentChar;
    dynamicText.classList.add ('stop-blinking');

    if(!Delete && charIndex < currentWord.length){
        charIndex++;
        setTimeout(typeEffect,150);
    } else if(Delete && charIndex>0){
        charIndex--;
        setTimeout(typeEffect,100);
    } else {
        Delete =!Delete;
        dynamicText.classList.remove('stop-blinking');
        wordIndex =!Delete ?(wordIndex +1) % words.length: wordIndex;
        setTimeout(typeEffect,1200);
    }

} 
typeEffect();


const apiKey="89bdce7c99681db7bfd824551c732552";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherIcon =document.querySelector( ".weather-icon");

async function checkWeather(city){
     let response= await fetch(apiUrl + city + `&appid=${apiKey}`);
     let data = await response.json();
     if (response.status == 404){
        document.querySelector(".error").style.display ="block";
        document.querySelector(".weather").style.display ="none";
     }
     else {
        document.querySelector(".city").innerHTML= data.name;
     document.querySelector(".temp").innerHTML= Math.round(data.main.temp) + "°C" ;
     document.querySelector(".humidity").innerHTML= data.main.humidity + "%";
     document.querySelector(".wind").innerHTML= data.wind.speed + " km/h";
    
     if (data.weather[0].main =="Clouds"){
        weatherIcon.src ="/JS Project2/image/rainy day.png";
    }
    else if(data.weather[0].main =="Clear"){
        weatherIcon.src ="/JS Project2/image/humid day.png";
    }
    else if(data.weather[0].main =="Rain"){
        weatherIcon.src ="/JS Project2/image/heavy rain.png";
    }
    else if(data.weather[0].main ==" Mist"){
        weatherIcon.src ="/JS Project2/image/rainy-sun.png";
    }
        else if(data.weather[0].main ==" Windy"){
            weatherIcon.src ="/JS Project2/image/windy day.png";
    }
    document.querySelector(".weather").style.display ="block";
    document.querySelector(".error").style.display ="none";
    }
}
searchBtn.addEventListener("click", function(){
checkWeather(searchBox.value);
})