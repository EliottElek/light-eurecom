import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: any) {
    const isServer = typeof window === "undefined";
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (!isServer) {
            const storedValue = localStorage.getItem(key);
            if (storedValue !== null) {
                setValue(JSON.parse(storedValue));
            }
        }
    }, [key, isServer]);

    const setStoredValue = (newValue: any) => {
        setValue(newValue);
        if (!isServer) {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    };

    return [value, setStoredValue];
}