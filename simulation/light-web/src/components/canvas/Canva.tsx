"use client"
import React, { useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, Connection, Edge, Panel, Background, BackgroundVariant } from 'reactflow';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import CacheIcon from '../CacheIcon';
import ProgressBar from './ProgessBar';
import { usePlayground } from '@/context/PlaygroundContext';
import Joyride from 'react-joyride';

const nodeTypes = {
  custom: CustomNode,
};

const proOptions = { hideAttribution: true };

const Canva = ({ data, steps }: { data: any, steps: any }) => {

  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);
  const { showLegend, showTitle } = usePlayground()


  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    setNodes(data.nodes);
    setEdges(data.edges);
  }, [data.nodes, data.edges]);

  return (
    <div className='relative' style={{ width: '100%', height: '100%' }}>
      <Joyride
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
        steps={steps}
      />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        fitView
        className="bg-background"
      >
        <Background variant={"dots" as BackgroundVariant} />
        <Controls className='bg-background' />
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
    </div>
  );
};

export default Canva;
