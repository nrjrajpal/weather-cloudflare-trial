"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { WeatherData } from "../types/weather"

interface ForecastProps {
  data: WeatherData["forecast"]["forecastday"]
}

type ForecastDay = WeatherData["forecast"]["forecastday"][number]
type ForecastHour = ForecastDay["hour"][number]

interface DailyForecastProps {
  day: ForecastDay
}

function DailyForecast({ day }: DailyForecastProps) {
  return (
    <div className="text-center p-4 border rounded-lg">
      <p className="font-bold text-lg">
        {new Date(day.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
      </p>
      <Image
        src={`https:${day.day.condition.icon}`}
        alt={day.day.condition.text}
        width={64}
        height={64}
        className="mx-auto my-2"
      />
      <p className="text-2xl font-semibold">{day.day.avgtemp_c}°C</p>
      <p className="text-sm">{day.day.condition.text}</p>
      <div className="mt-2 text-sm">
        <p>Max: {day.day.maxtemp_c}°C</p>
        <p>Min: {day.day.mintemp_c}°C</p>
        <p>Humidity: {day.day.avghumidity}%</p>
        <p>Rain Chance: {day.day.daily_chance_of_rain}%</p>
        <p>Max Wind: {day.day.maxwind_kph} km/h</p>
      </div>
    </div>
  )
}

interface HourlyForecastProps {
  hours: ForecastHour[]
}

function HourlyForecast({ hours }: HourlyForecastProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="p-2">Time</th>
            <th className="p-2">Temp</th>
            <th className="p-2">Condition</th>
            <th className="p-2">Rain Chance</th>
            <th className="p-2">Wind</th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour.time} className="border-t">
              <td className="p-2">
                {new Date(hour.time).toLocaleTimeString("en-US", { hour: "numeric", hour12: true })}
              </td>
              <td className="p-2">{hour.temp_c}°C</td>
              <td className="p-2">
                <div className="flex items-center">
                  <Image src={`https:${hour.condition.icon}`} alt={hour.condition.text} width={32} height={32} />
                  <span className="ml-2">{hour.condition.text}</span>
                </div>
              </td>
              <td className="p-2">{hour.chance_of_rain}%</td>
              <td className="p-2">
                {hour.wind_kph} km/h {hour.wind_dir}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Forecast({ data }: ForecastProps) {
  const [activeTab, setActiveTab] = useState(data[0].date)

  return (
    <Card>
      <CardHeader>
        <CardTitle>3-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            {data.map((day) => (
              <TabsTrigger key={day.date} value={day.date}>
                {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
              </TabsTrigger>
            ))}
          </TabsList>
          {data.map((day) => (
            <TabsContent key={day.date} value={day.date}>
              <div className="grid grid-cols-1 gap-4">
                <DailyForecast day={day} />
                <HourlyForecast hours={day.hour} />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

