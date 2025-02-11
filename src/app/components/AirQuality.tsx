import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "../types/weather"

interface AirQualityProps {
  data: WeatherData["current"]["air_quality"]
}

export function AirQuality({ data }: AirQualityProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Air Quality</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-2">
          US EPA Index: {data["us-epa-index"]} - {getAirQualityDescription(data["us-epa-index"])}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <p>CO: {data.co.toFixed(2)} μg/m³</p>
          <p>NO₂: {data.no2.toFixed(2)} μg/m³</p>
          <p>O₃: {data.o3.toFixed(2)} μg/m³</p>
          <p>SO₂: {data.so2.toFixed(2)} μg/m³</p>
          <p>PM2.5: {data.pm2_5.toFixed(2)} μg/m³</p>
          <p>PM10: {data.pm10.toFixed(2)} μg/m³</p>
        </div>
      </CardContent>
    </Card>
  )
}

function getAirQualityDescription(index: number) {
  const descriptions = [
    "Good",
    "Moderate",
    "Unhealthy for Sensitive Groups",
    "Unhealthy",
    "Very Unhealthy",
    "Hazardous",
  ]
  return descriptions[Math.min(index - 1, 5)]
}

