import React from "react";

function WeatherInfo(props) {
    return (
        <div className="card mx-auto" style={{"width": "15rem",
                                              "marginTop": "40px"}}>
        <div className="card-body">
        <h5 className="card-title">{props.city}, {props.country}</h5>
        
        <img src={props.icon} alt="weather icon"/>
        
        <h6 className="card-subtitle mb-2">{props.description}</h6>
        <div>
            H:{props.hi}° L:{props.lo}°
        </div>
        <br/> {/* adding a break for spacing */}
        <table className="mx-auto">
            <tr>
                <td>
                    Temperature
                </td>
                <td className="right">
                    {props.temperature} °C
                </td>
            </tr>
            <tr>
                <td>
                    Humidity
                </td>
                <td className="right">
                    {props.humidity} %
                </td>
            </tr>
            <tr>
                <td>
                    Sunrise
                </td>
                <td className="right">
                    {props.sunrise}
                </td>
            </tr>
            <tr>
                <td>
                    Sunset
                </td>
                <td className="right">
                    {props.sunset}
                </td>
            </tr>
        </table>
        </div>

        </div>
    );
}

export default WeatherInfo;