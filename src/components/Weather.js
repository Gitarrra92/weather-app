import React from 'react'
import '../App.css'
import moment from 'moment'

class Weather extends React.Component {

    state = {
        weather: null,
        quote: null,
        geo: null

    }

    componentWillMount() {
        this.getGeoData()

        this.getQuoteData()

    }

    getWeatherData = () => {
        const city = this.state.geo && this.state.geo.city
        const countryCode = this.state.geo && this.state.geo.countryCode
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&lang=pl&APPID=dabd8394d3f47226e331477d5ccf265e`)
            .then(response => response.json())
            .then(dataWeather => this.setState({
                weather: dataWeather

            }))
            .catch((err) => console.log(err))
    }

    getGeoData = () => {
        fetch("http://ip-api.com/json")
            .then(response => response.json())
            .then(dataGeo => {this.setState ({
                geo : dataGeo
            })
                this.getWeatherData()
            })
            .catch((err) => console.log(err))
    }

    getQuoteData = () => {
        fetch("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1")
            .then(response => response.json())
            .then(dataQuote => this.setState({
                quote: dataQuote
            }))
            .catch((err) => console.log(err))
    }

    render() {
        //console.log(this.state.weather)
        //console.log(this.state.quote)
        console.log(this.state.geo)
        return (
            <div className={
                this.state.weather
                &&
                this.state.weather.main.temp < 0 ?
                    "cold"
                    :
                    "warm"
            }>
                <div>
                    {
                        <img
                            src={`${process.env.PUBLIC_URL}/img/${this.state.weather && this.state.weather.weather[0].icon}.svg`}
                            alt={""}
                        />
                    }
                    {
                        this.state.weather
                        &&
                        this.state.weather.name
                    }
                </div>
                <div>{
                    this.state.weather
                    &&
                    this.state.weather.main.temp
                } &deg;C
                </div>
                <div className="weather">
                    {
                        this.state.weather
                        &&
                        this.state.weather.weather[0].description
                    }
                </div>
                <div>{
                    this.state.quote
                    &&
                    this.state.quote[0].content
                }
                </div>
                <div>{
                    this.state.quote
                    &&
                    this.state.quote[0].title
                }
                </div>
                <div className="w-datetime">
                    {
                        moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
                    }
                </div>
            </div>

        )
    }
}

export default Weather