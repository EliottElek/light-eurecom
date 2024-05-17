"use client"
import React, { useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Connection, Edge, Panel, Background, BackgroundVariant } from 'reactflow';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import Link from 'next/link';
import CacheIcon from '../CacheIcon';
import ProgressBar from './ProgessBar';

const nodeTypes = {
  custom: CustomNode,
};


const Canva = ({ data }: { data: any }) => {

  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    setNodes(data.nodes);
    setEdges(data.edges);
  }, [data.nodes, data.edges]);

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
        className="bg-primary/10"
      >
        <Background variant={"dots" as BackgroundVariant} />
        <Controls className='bg-gray-900'/>
        <Panel position="top-left">
          <div className='prose relative p-4 bg-white shadow rounded-md'>
            <Link className='absolute text-primary top-2 left-2 underline flex items-center gap-1 text-sm' href="/playground"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
              Back to playground
            </Link>
            <h2 className='!mt-8 !mb-4'>
              {data.name}
            </h2>
            <p> {data.description}</p>
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
