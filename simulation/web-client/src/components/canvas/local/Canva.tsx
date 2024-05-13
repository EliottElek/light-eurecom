"use client"
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Connection, Edge, Panel, Background, BackgroundVariant } from 'reactflow';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import CacheIcon from '../../CacheIcon';
import ProgressBar from '../ProgessBar';
import DbIcon from '@/components/DbIcon';

const nodeTypes = {
  custom: CustomNode,
};


const Canva = ({ data }: { data: any }) => {
  const [step, setStep] = useState(0)
  const [nodes, setNodes, onNodesChange] = useNodesState(data.steps[step].nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.steps[step].edges);

  const updateStep = (s: number) => {
    if (step + s >= data.steps.length || step + s < 0) return
    setStep(step + s)
  }

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);
  useEffect(() => {
    setNodes(data.steps[step].nodes);
    setEdges(data.steps[step].edges);
  }, [data.steps[step].nodes, data.steps[step].edges]);
  return (
    <div className='relative' style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-teal-50"
      >
        <Background variant={"dots" as BackgroundVariant} />
        <Controls />
        <Panel position="top-left">
          <div className='prose relative p-4 bg-white shadow rounded-md'>
            <Link className='absolute text-teal-600 top-2 left-2 underline flex items-center gap-1 text-sm' href="/playground"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
              Back to playground
            </Link>
            <h2 className='!mt-8 !mb-4'>
              {data.name}
            </h2>
            <p>{data.steps[step].description || data.description}</p>
            <div className='absolute top-4 right-4'>
              <div>
                <span className="isolate inline-flex rounded-md shadow-sm">
                  <button
                    disabled={step === 0}
                    onClick={() => updateStep(-1)}
                    type="button"
                    className="relative disabled:opacity-50 inline-flex items-center rounded-l-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    disabled={step === data.steps.length - 1}
                    onClick={() => updateStep(1)}
                    type="button"
                    className="relative disabled:opacity-50 -ml-px inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </span>
              </div>
              <div>
                <span className='text-sm'>Step {step + 1} of {data.steps.length}</span>
              </div>
            </div>
          </div>
        </Panel>
        <Panel position="bottom-right">
          <div className='p-4 max-w-xl flex flex-col gap-2 bg-white shadow rounded-md'>
            <h2 className='mb-3 italic underline text-sm'>
              Legends:
            </h2>
            <div className='flex items-center justify-between text-sm gap-1'>
              <CacheIcon size="20px" />
              <p>Local cache</p>
            </div>
            <div className='flex items-center justify-between text-sm gap-1'>
              <DbIcon size="20px" />
              <p>Database</p>
            </div>
            <div className='flex items-center max-w-32 overflow-hidden justify-between text-sm gap-1'>
              <ProgressBar progress={70} />
              <p>Overload</p>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default Canva;