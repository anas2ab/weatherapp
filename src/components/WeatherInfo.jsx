import React from "react";

function WeatherInfo(props) {
    return (
        <div className="card mx-auto" style={{"width": "15rem",
                                              "margin-top": "40px"}}>
        <div className="card-body">
        <h5 className="card-title">Current Weather</h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.description}</h6>
        <img src={props.icon} alt="weather icon"/>
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
                    Pressure
                </td>
                <td className="right">
                    {props.pressure} hPa
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
        </table>
        </div>

        </div>
    );
}

export default WeatherInfo;