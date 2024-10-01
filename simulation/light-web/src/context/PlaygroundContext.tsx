import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLocalStorage } from "@/hooks/use-local-storage";

// Define the context type to include values and setters for clients and routers
interface PlaygroundContextType {
    clients: number[];
    setClients: (value: number[]) => void;
    routers: number[];
    setRouters: (value: number[]) => void;
    loading: boolean,
    startSimulation: () => void;
    setShowLegend: (state: boolean) => void;
    showLegend: boolean,
    setShowTitle: (state: boolean) => void;
    showTitle: boolean,
    setShowMinimap: (state: boolean) => void;
    showMinimap: boolean
}

export const PlaygroundContext = createContext<PlaygroundContextType | undefined>(undefined);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
    const { toast } = useToast()
    const [clients, setClients] = useState<number[]>([2]);
    const [routers, setRouters] = useState<number[]>([1]);
    const [loading, setLoading] = useState(false);
    const [showStartDialog, setShowStartDialog] = useState(false)
    const [showLegend, setShowLegend] = useLocalStorage("SHOW_LEGEND", true)
    const [showTitle, setShowTitle] = useLocalStorage("SHOW_TITLE", true)
    const [showMinimap, setShowMinimap] = useLocalStorage("SHOW_MINIMAP", true)

    const router = useRouter()

    const start = async () => {
        setLoading(true)
        toast({
            title: "Starting simulation",
            description: "Starting simulation ! Should not take long.",
        })
        try {
            const { data } = await axios.post(`/api/simulations/new`, {
                nb_receivers: clients[0],
                nb_routers: routers[0]
            })
            toast({
                title: "Simulation created !",
                description: "Simulation created ! The simulation should be finished in a couple of seconds.",
            })
            router.push(`/playground/s/${data.simulation_id}`)
        } catch (e) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "An error occured with the remote server. It might be down.",
            })
        }
        setLoading(false)
    }

    const startSimulation = () => {
        setShowStartDialog(true)
    }


    return (
        <PlaygroundContext.Provider value={{ clients, setClients, routers, setRouters, loading, startSimulation, setShowLegend, showLegend, setShowTitle, showTitle, setShowMinimap, showMinimap }}>
            {children}
            <AlertDialog open={showStartDialog} onOpenChange={setShowStartDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>You are about to start a new simulation with: </AlertDialogTitle>
                        <AlertDialogDescription className="p-6">
                            <ul className="text-md list-disc">
                                <li><span className="font-bold">{clients[0]}</span> clients</li>
                                <li><span className="font-bold">{routers[0]}</span> routers</li>
                            </ul>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                            variant="default"
                            onClick={() => {
                                setShowStartDialog(false)
                                start()
                            }}
                        >
                            Start
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </PlaygroundContext.Provider>
    );
}

export function usePlayground() {
    const context = useContext(PlaygroundContext);
    if (!context) {
        throw new Error("usePlayground must be used within a PlaygroundProvider");
    }
    return context;
}
