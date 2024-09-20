"use client";
import React from 'react';
import Canva from './Canva';

interface SSESchemaProps {
    simulation: any;
}

const CanvaIndex: React.FC<SSESchemaProps> = ({ simulation }) => {

    return <Canva data={{ ...simulation.default_setup }} steps={simulation.steps} />; // Pass the data to the Canva component
};

export default CanvaIndex;
