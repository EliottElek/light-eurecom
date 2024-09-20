"use client"

import * as React from "react"
import { Dialog } from "@radix-ui/react-dialog"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"

import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { usePlayground } from "@/context/PlaygroundContext"
import { ModeToggle } from "../ThemeSwitcher"

export function PresetActions() {
  const [open, setIsOpen] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const { setShowLegend, showLegend, setShowTitle, showTitle } = usePlayground()
  const { toast } = useToast()


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">
            <span className="sr-only">Actions</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer" onSelect={() => setIsOpen(true)}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="text-red-600 cursor-pointer"
          >
            Delete simulation
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pyalground settings</DialogTitle>
            <DialogDescription>
              Manage your playground settings here.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-sm text-muted-foreground">
              Title and description
            </h4>
            <div className="flex items-start justify-start space-x-4 pt-3">
              <Switch name="show" id="show" defaultChecked={showTitle} onCheckedChange={setShowTitle} />
              <Label className="grid gap-1 font-normal" htmlFor="show">
                <span className="font-semibold">
                  Show title and description on the playground
                </span>
                <span className="text-sm text-muted-foreground">
                  Shows you the title and description of the simulation.
                </span>
              </Label>
            </div>
          </div>
          <div className="py-4">
            <h4 className="text-sm text-muted-foreground">
              Legend
            </h4>
            <div className="flex items-start justify-start space-x-4 pt-3">
              <Switch name="show" id="show" defaultChecked={showLegend} onCheckedChange={setShowLegend} />
              <Label className="grid gap-1 font-normal" htmlFor="show">
                <span className="font-semibold">
                  Show legend on the playground
                </span>
                <span className="text-sm text-muted-foreground">
                  Shows you the main components of the simulation.
                </span>
              </Label>
            </div>
          </div>
          <div className="py-4">
            <h4 className="text-sm text-muted-foreground">
              Theme
            </h4>
            <div className="flex items-start justify-start space-x-4 pt-3">
              <ModeToggle />
              <Label className="grid gap-1 font-normal" htmlFor="show">
                <span className="font-semibold">
                  Theme
                </span>
                <span className="text-sm text-muted-foreground">
                  Choose between light, dark or system theme.
                </span>
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This preset will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false)
                toast({
                  variant: "destructive",
                  title: "Simulation deleted.",
                  description: "You simulation has been deleted.",
                })
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
