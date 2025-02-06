import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "../types/weather"

interface WeatherDisplayProps {
  data: WeatherData["current"]
  location: WeatherData["location"]
}

export function WeatherDisplay({ data, location }: WeatherDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Current Weather in {location.name}, {location.country}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">{data.temp_c}°C</p>
          <p className="text-xl">{data.condition.text}</p>
          <p>Feels like: {data.feelslike_c}°C</p>
          <p>Humidity: {data.humidity}%</p>
          <p>
            Wind: {data.wind_kph} km/h {data.wind_dir}
          </p>
        </div>
        <Image src={`https:${data.condition.icon}`} alt={data.condition.text} width={64} height={64} />
      </CardContent>
    </Card>
  )
}

