import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SportsData } from "../types/weather"

interface SportsProps {
  data: SportsData
}

export function Sports({ data }: SportsProps) {
  const sportTypes = Object.keys(data)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sports Events</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={sportTypes[0]}>
          <TabsList>
            {sportTypes.map((sport) => (
              <TabsTrigger key={sport} value={sport}>
                {sport.charAt(0).toUpperCase() + sport.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          {sportTypes.map((sport) => (
            <TabsContent key={sport} value={sport}>
              {data[sport].length > 0 ? <SportEvents events={data[sport]} /> : <p>No upcoming {sport} events.</p>}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

function SportEvents({ events }) {
  return (
    <div className="space-y-2">
      {events.map((event, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <h3 className="font-bold">{event.match}</h3>
            <p>Tournament: {event.tournament}</p>
            <p>Stadium: {event.stadium}</p>
            <p>Start: {new Date(event.start).toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

