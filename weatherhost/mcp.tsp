import "@typespec/mcp";
import "./weather.tsp";
using Mcp;

@@resource(WeatherService.Weather.getWeatherByCity, "weather://", "get weather by city", "get weather by city name with optional unio");

@@tool(WeatherService.Weather.getForecast, "get forecast", "get weather forecast for a specific location with optional unit");