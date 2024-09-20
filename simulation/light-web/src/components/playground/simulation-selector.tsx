"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CaretSortIcon, CheckIcon, ReloadIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"
import useSWR from 'swr'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { fetcher } from "@/lib/fetcher"
import Link from "next/link"
import { usePlayground } from "@/context/PlaygroundContext"

interface SimulationSelectorProps extends PopoverProps {
  simulationId: string
}

export function SimulationSelector({ simulationId, ...props }: SimulationSelectorProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedPreset, setSelectedPreset] = React.useState<string>(simulationId)
  const { serverUp } = usePlayground()

  const { data: simulations, isLoading } = useSWR('http://127.0.0.1:5002/simulations', fetcher, { revalidateOnFocus: true })

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading || !serverUp}
          variant="outline"
          role="combobox"
          aria-label="Load a simulation..."
          aria-expanded={open}
          className="flex-1 truncate text-ellipsis justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {/* {isLoading && "Loading simulations..."} */}
          {selectedPreset ? <span className="truncate text-ellipsis">{selectedPreset}</span> : "Load a simulation..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search simulations..." />
          <CommandList>
            <CommandEmpty>No simulation found.</CommandEmpty>
            {simulations && Array.isArray(simulations) && simulations.length > 0 &&
              <CommandGroup heading="Examples">
                {simulations?.map((sim: any) => (
                  <CommandItem
                    className="truncate text-ellipsis"
                    key={sim.id}
                    onSelect={() => {
                      setSelectedPreset(sim.id)
                      setOpen(false)
                    }}
                  >
                    <Link className="flex w-full items-center justify-between py-2" href={`/playground/s/${sim.id}`}>
                      <p className="w-full flex items-center justif-between"><p>{sim.id}</p> {sim.status == "pending" && <p className="ml-auto"><ReloadIcon className="h-4 w-4 animate-spin" /></p>
                      }</p>
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedPreset === sim.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover >
  )
}
