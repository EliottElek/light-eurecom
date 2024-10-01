"use client"
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Connection, Edge, Panel, Background, BackgroundVariant, ControlButton } from 'reactflow';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import CacheIcon from '../../../CacheIcon';
import ProgressBar from '../../ProgessBar';
import dynamic from 'next/dynamic';
import { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';
import { usePlayground } from '@/context/PlaygroundContext';



const Joyride = dynamic(() => import('react-joyride'), { ssr: false })


const nodeTypes = {
  custom: CustomNode,
};

const proOptions = { hideAttribution: true };


const Canva = ({ data }: { data: any }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [nodes, setNodes, onNodesChange] = useNodesState(data.schema_steps[stepIndex].nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.schema_steps[stepIndex].edges);
  const { showTitle, showLegend, showMinimap } = usePlayground()


  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);
  useEffect(() => {
    setNodes(data.schema_steps[stepIndex].nodes);
    setEdges(data.schema_steps[stepIndex].edges);
  }, [data.schema_steps]);


  return (
    <div className='relative' style={{ width: '100%', height: '100%' }}>
      <Joyride
        steps={data.steps}
        showProgress
        styles={{
          options: {
            primaryColor: 'hsl(var(--primary))',
            zIndex: 10000,
          }
        }}
        spotlightPadding={2}
        run={true}
        continuous
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        maxZoom={1.7}
        minZoom={.1}
        proOptions={proOptions}
        className="bg-background"
      >
        <Background variant={"dots" as BackgroundVariant} />
        <Controls className='p-1 !bg-background'>
        </Controls>
        <Panel position="top-left">
          {showTitle &&
            <div className='prose relative text-foreground relative p-2 bg-background shadow rounded-md'>
              <h2 className='!mt-2 text-foreground !mb-4 text'>
                {data.name}
              </h2>
              <p> {data.description}</p>
            </div>
          }
        </Panel>
        {showMinimap && <MiniMap maskColor='hsl(var(--primary-foreground))' className='!bg-background' pannable zoomable position='top-right' nodeStrokeWidth={3} />
        }
        {showLegend &&
          <Panel position="bottom-right">
            <div className='p-4 max-w-xl flex flex-col gap-2 bg-background shadow rounded-md'>
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
          </Panel>}
      </ReactFlow>
    </div >
  );
};

export default Canva;
