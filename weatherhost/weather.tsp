import "@typespec/http";
import "@typespec/rest";

using TypeSpec.Http;
using TypeSpec.Rest;

@service(#{ title: "Weather Service API" })
namespace WeatherService;

model Location {
  /** The latitude coordinate (decimal degrees) */
  latitude: float64;

  /** The longitude coordinate (decimal degrees) */
  longitude: float64;

  /** Optional city name */
  city?: string;

  /** Optional country code (ISO 3166-1 alpha-2) */
  country?: string;
}

model TemperatureUnit {
  /** Temperature unit type (C = Celsius, F = Fahrenheit, K = Kelvin) */
  unit: "C" | "F" | "K";
}

model WeatherCondition {
  /** Main weather condition (e.g., Clear, Clouds, Rain, etc.) */
  main: string;

  /** Detailed description of the weather condition */
  description: string;

  /** Weather icon code */
  icon: string;
}

model CurrentWeather {
  /** Unique ID for the weather data */
  id: string;

  /** Temperature in the requested unit */
  temperature: float64;

  /** Feels like temperature in the requested unit */
  feelsLike: float64;

  /** Humidity percentage */
  humidity: int32;

  /** Atmospheric pressure in hPa */
  pressure: int32;

  /** Wind speed in meters/sec or miles/hour depending on the unit system */
  windSpeed: float64;

  /** Wind direction in degrees */
  windDegree: int32;

  /** Cloud coverage percentage */
  clouds: int32;

  /** Weather condition details */
  condition: WeatherCondition;

  /** Visibility in meters */
  visibility: int32;

  /** Timestamp of data calculation, UTC */
  timestamp: utcDateTime;
}

model DailyForecast {
  /** Date for the forecast */
  date: utcDateTime;

  /** Minimum temperature */
  minTemp: float64;

  /** Maximum temperature */
  maxTemp: float64;

  /** Humidity percentage */
  humidity: int32;

  /** Weather condition details */
  condition: WeatherCondition;

  /** Precipitation probability (0-1) */
  precipProbability: float64;
}

model ForecastResponse {
  /** Location information */
  location: Location;

  /** Daily forecast for multiple days */
  forecast: DailyForecast[];

  /** Unit of measurement used for temperature values */
  unit: TemperatureUnit;
}

@error
model Error {
  /** Error code */
  code: int32;

  /** Error message */
  message: string;

  /** Optional detailed error information */
  details?: string;
}

@route("/weather")
@tag("Weather")
interface Weather {
  /**
   * Get current weather for a specific location
   * @query unit Optional parameter to specify temperature unit (C, F, or K). Defaults to C.
   */
  @route("/current")
  @get
  getCurrentWeather(
    @query latitude: float64,
    @query longitude: float64,
    @query unit?: "C" | "F" | "K" = "C",
  ): CurrentWeather | Error;

  /**
   * Get weather forecast for a specific location
   * @query days Number of days to forecast (1-7)
   * @query unit Optional parameter to specify temperature unit (C, F, or K). Defaults to C.
   */
  @route("/forecast")
  @get
  getForecast(
    @query latitude: float64,
    @query longitude: float64,
    @query days: int32 = 5,
    @query unit?: "C" | "F" | "K" = "C",
  ): ForecastResponse | Error;

  /**
   * Get weather by city name
   * @query unit Optional parameter to specify temperature unit (C, F, or K). Defaults to C.
   */
  @route("/city/{cityName}")
  @get
  getWeatherByCity(
    @path cityName: string,
    @query unit?: "C" | "F" | "K" = "C",
  ): CurrentWeather | Error;
}
