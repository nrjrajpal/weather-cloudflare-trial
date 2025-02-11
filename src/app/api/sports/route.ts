import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  const apiKey = process.env.API_KEY
  const apiUrl = `https://api.weatherapi.com/v1/sports.json?key=${apiKey}&q=${encodeURIComponent(city)}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching sports data:", error)
    return NextResponse.json({ error: "Failed to fetch sports data" }, { status: 500 })
  }
}

