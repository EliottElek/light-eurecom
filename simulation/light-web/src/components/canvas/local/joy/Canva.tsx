"use client"
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Connection, Edge, Panel, Background, BackgroundVariant } from 'reactflow';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import CacheIcon from '../../../CacheIcon';
import ProgressBar from '../../ProgessBar';
import DbIcon from '@/components/DbIcon';
import dynamic from 'next/dynamic';
import { ACTIONS, EVENTS, ORIGIN, STATUS, CallBackProps } from 'react-joyride';



const Joyride = dynamic(() => import('react-joyride'), { ssr: false })


const nodeTypes = {
  custom: CustomNode,
};

const proOptions = { hideAttribution: true };


const Canva = ({ data }: { data: any }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [nodes, setNodes, onNodesChange] = useNodesState(data.schema_steps[stepIndex].nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.schema_steps[stepIndex].edges);


  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);
  useEffect(() => {
    setNodes(data.schema_steps[stepIndex].nodes);
    setEdges(data.schema_steps[stepIndex].edges);
  }, [data.schema_steps]);


  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, origin, status, type } = data;

    if (action === ACTIONS.CLOSE && origin === ORIGIN.KEYBOARD) {
      // do something
    }

    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type as any)) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      console.log("finished")
    }
    console.groupCollapsed(type);
    console.groupEnd();
  };


  return (
    <div className='relative' style={{ width: '100%', height: '100%' }}>
      <Joyride
        callback={handleJoyrideCallback}
        stepIndex={stepIndex}
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
        maxZoom={0.7}
        minZoom={0.7}
        proOptions={proOptions}
        className="bg-background"
      >
        <Background variant={"dots" as BackgroundVariant} />
        <Panel position="bottom-right">
          <div className='p-4 max-w-xl flex flex-col gap-2 shadow rounded-md bg-background'>
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
              <p>Data volume</p>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default Canva;
