import React, {useEffect, useState} from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";


function WeatherForm(props) {
    // setting all the states
    const [city, updateCity] = useState("Toronto, CA");
    const [weather, setWeather] = useState('');
    const [temperature, setTemperature] = useState(0);
    const [description, setDescription] = useState('');
    const [humidity, setHumidity] = useState(0);
    const [hi, setHi] = useState(0);
    const [lo, setLo] = useState(0);
    const [sunrise, setSunrise] = useState(0);
    const [sunset, setSunset] = useState(0);
    const [icon, setIcon] = useState("");
    const [cityName, setCityName] = useState("");
    const [countryCode, setCountryCode] = useState("");
  

    const apiKey = "apikey";
    const units = "metric";

    // building URL
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=" + units;

    // handling the change for the input. This saves the state of the input value
    function handleChange(event) {
        updateCity(event.target.value);
    }
    // when input is clicked, this empties the input
    function handleClick(){
        updateCity("");
    }
    function convertUnixTime(time) {
        return new Date(time * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    // gets the weather from the API
    const fetchWeather = async () => {
        try {
            const res = await axios.get(url);
            
            //setting the states of the variables
            setWeather(res.data.weather[0].main);
            setTemperature(Math.round(res.data.main.temp));
            setDescription(res.data.weather[0].description);
            setHumidity(res.data.main.humidity);
            setHi(Math.round(res.data.main.temp_max));
            setLo(Math.round(res.data.main.temp_min));
            setSunrise(convertUnixTime(res.data.sys.sunrise));
            setSunset(convertUnixTime(res.data.sys.sunset));
            setCityName(res.data.name);
            setCountryCode(res.data.sys.country);

            setIcon("http://openweathermap.org/img/wn/" + res.data.weather[0].icon + "@2x.png")
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchWeather();
    },[]) // need the dependancy array []

    return (
        <div className="center">
        
                <form>

                <div className="justify-content-center input-group">
                <input className="form-control-sm" name="city" type="text" onClick={handleClick} onChange={handleChange} value={city} placeholder="City, Country" autoComplete="off"/>
                <button className="btn btn-dark" type="submit" onClick={(event) => {
                        event.preventDefault();
                        fetchWeather();
                        }
                    }>Submit</button>
                </div>
                </form>
            <div>
                <WeatherInfo
                icon={icon}
                city={cityName}
                country={countryCode}
                weather={weather}
                temperature={temperature}
                description={description}
                humidity={humidity}
                hi={hi}
                lo={lo}
                sunrise={sunrise}
                sunset={sunset}
                />
            </div>
        </div>

    );
}

export default WeatherForm;