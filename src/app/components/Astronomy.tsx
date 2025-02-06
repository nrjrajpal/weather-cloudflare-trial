import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sunrise, Sunset, Moon } from "lucide-react"
import type { AstronomyData } from "../types/weather"

interface AstronomyProps {
  data: AstronomyData
}

export function Astronomy({ data }: AstronomyProps) {
  const { astro } = data.astronomy

  return (
    <Card>
      <CardHeader>
        <CardTitle>Astronomy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <Sunrise className="mr-2" />
            <span>Sunrise: {astro.sunrise}</span>
          </div>
          <div className="flex items-center">
            <Sunset className="mr-2" />
            <span>Sunset: {astro.sunset}</span>
          </div>
          <div className="flex items-center">
            <Moon className="mr-2" />
            <span>Moonrise: {astro.moonrise}</span>
          </div>
          <div className="flex items-center">
            <Moon className="mr-2" />
            <span>Moonset: {astro.moonset}</span>
          </div>
        </div>
        <div className="mt-4">
          <p>Moon Phase: {astro.moon_phase}</p>
          <p>Moon Illumination: {astro.moon_illumination}%</p>
          <p>Moon is up: {astro.is_moon_up ? "Yes" : "No"}</p>
          <p>Sun is up: {astro.is_sun_up ? "Yes" : "No"}</p>
        </div>
      </CardContent>
    </Card>
  )
}

