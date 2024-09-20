"use client"

import * as React from "react"
import { SliderProps } from "@radix-ui/react-slider"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { usePlayground } from "@/context/PlaygroundContext"
import clsx from "clsx"

interface ClientsSelectorProps {
  defaultValue: SliderProps["defaultValue"]
}

export function ClientsSelector({ defaultValue }: ClientsSelectorProps) {
  // Access the clients value and setter from the PlaygroundContext
  const { clients, setClients, serverUp } = usePlayground()
  return (
    <div className="grid gap-2 pt-2">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="clients">Number of receivers</Label>
              <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                {clients}
              </span>
            </div>
            <Slider
              disabled={!serverUp}
              defaultValue={defaultValue}
              id="clients"
              max={10}
              value={clients}
              step={1}
              min={1}
              onValueChange={setClients}  // Use the new handler
              className={clsx("[&_[role=slider]]:h-4 [&_[role=slider]]:w-4", !serverUp && "opacity-50")}
              aria-label="Number of receivers"
            />
          </div>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[260px] text-sm" side="left">
          Controls the number of receivers.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
