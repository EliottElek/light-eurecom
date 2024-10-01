import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface ServerStatusContextType {
    serverUp: boolean | null
}

export const ServerStatusContext = createContext<ServerStatusContextType | undefined>(undefined);

export function ServerStatusProvider({ children }: { children: ReactNode }) {

    const [serverUp, setServerUp] = useState<boolean | null>(null);

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/health`); 
                if (data.ok) {
                    setServerUp(true);
                }
            } catch (error) {
                setServerUp(false);
            }
        };
        checkServerStatus();
    }, []);



    return (
        <ServerStatusContext.Provider value={{ serverUp }}>
            {children}
        </ServerStatusContext.Provider>
    );
}

export function useServerStatus() {
    const context = useContext(ServerStatusContext);
    if (!context) {
        throw new Error("usePlayground must be used within a PlaygroundProvider");
    }
    return context;
}
