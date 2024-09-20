"use client"
import React, { useEffect } from 'react';
import { FitAddon } from '@xterm/addon-fit';
import { useXTerm } from 'react-xtermjs';

interface SSETerminalProps {
    event_source_endpoint: string;
    title: string
}

const SSETerminal: React.FC<SSETerminalProps> = ({ event_source_endpoint, title }) => {
    const { instance, ref } = useXTerm();
    const fitAddon = new FitAddon();

    useEffect(() => {
        if (instance) {
            // Set up the xterm.js terminal with the fit addon
            instance.loadAddon(fitAddon);
            fitAddon.fit();
            // Subscribe to SSE
            const eventSource = new EventSource(event_source_endpoint);

            eventSource.onmessage = (event) => {
                if (event.data) {
                    // Write the new message directly to the terminal
                    instance.writeln(event.data);
                }
            };

            eventSource.onerror = () => {
                eventSource.close();
            };

            // Handle window resize
            const handleResize = () => fitAddon.fit();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                eventSource.close();
            };
        }
    }, [instance, event_source_endpoint, fitAddon]);

    return (
        <div className='bg-[#111420]'>
            <div className='w-full p-0.5 text-white font-semibold text-sm px-2 bg-slate-700'>{title}<span className='text-xs font-light opacity-50'> (read only)</span></div>
            <div ref={ref} className='h-full w-full bg-transparent p-2' />;
        </div>)
};

export default SSETerminal;
