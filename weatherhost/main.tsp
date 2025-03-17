import "@typespec/mcp";

import "./weather.tsp";

using Mcp;


@mcpServer(#{ title: "WeatherHost", description: "Weather Host Service"})
namespace WeatherHost;

model WeatherForecastInput {
  /** The location for the weather forecast */
  location: string;
  
  /** The date for the forecast (optional) */
  date?: string;
  }

  model WeatherForecastOutput {
    /** The location for the weather forecast */
    location: string;
    
    /** The date for the forecast (optional) */
    temperature?: float64;
    }

@linkOperation("GetWeatherForecast", "Get the weather forecast for a specific location and date.")
op GetForecast<WeatherForecastInput extends {}| void, WeatherForecastOutput extends {} |void> 
    is McpApiOperation<WeatherForecastInput, WeatherForecastOutput>;
