"use client"
import { useState } from "react"
import { CopyIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { usePathname } from 'next/navigation'

export function PresetShare() {
  const pathname = usePathname()
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      const link = `${process.env.NEXT_PUBLIC_HOST}${pathname}`
      await navigator.clipboard.writeText(link)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000) // Reset copy status after 2 seconds
    } catch (error) {
      return
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Share</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[520px]">
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <h3 className="text-lg font-semibold">Share preset</h3>
          <p className="text-sm text-muted-foreground">
            Anyone who has this link and an OpenAI account will be able to view
            this.
          </p>
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">Link</Label>
            <Input
              id="link"
              defaultValue={`${process.env.NEXT_PUBLIC_HOST}${pathname}`}
              readOnly
              className="h-9"
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={copyToClipboard}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        {isCopied && <p className="text-sm text-green-500 pt-2">Link copied to clipboard!</p>}
      </PopoverContent>
    </Popover>
  )
}
