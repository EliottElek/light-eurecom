"use client"
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Connection, Edge, Panel, Background, BackgroundVariant, useStoreApi, useReactFlow, ReactFlowProvider } from 'reactflow';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import CacheIcon from '@/components/CacheIcon';
import DbIcon from '@/components/DbIcon';
import ProgressBar from '../ProgessBar';

const nodeTypes = {
  custom: CustomNode,
};

const proOptions = { hideAttribution: true };


const Canva = ({ data }: { data: any }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);
  const store = useStoreApi();
  const { setCenter } = useReactFlow();
  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    setNodes(data.nodes);
    setEdges(data.edges);
  }, [data.nodes, data.edges]);

  useEffect(() => {
    const focusNode = () => {
      const { nodeInternals } = store.getState();
      const nodes = Array.from(nodeInternals).map(([, node]) => node);
      if (nodes.length > 0) {
        const node = nodes[0];
        if (!node.width || !node.height) return
        const x = node.position.x + node.width / 2 + 450;
        const y = node.position.y + node.height / 2;
        const zoom = 0.80;
        setCenter(x, y, { zoom, duration: 1 });
      }
    }
    focusNode()
  }, [nodes])
  return (
    <div className='relative py-8 mt-3 rounded-lg ' style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        edgesUpdatable={false}
        edgesFocusable={false}
        nodesDraggable={false}
        nodesConnectable={false}
        nodesFocusable={false}
        draggable={false}
        panOnDrag={false}
        elementsSelectable={false}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        proOptions={proOptions}
        preventScrolling={false}
        panOnScroll={false}
        defaultViewport={data.defaultViewport}
        maxZoom={1.4}
        minZoom={0.2}
        attributionPosition="bottom-left"


      >
        {/* <Background variant={"dots" as BackgroundVariant} /> */}
        <Panel position="top-center">
          <div className='p-4 max-w-2xl flex flex-col gap-2 shadow rounded-md'>
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
            <div className='flex items-center max-w-64 overflow-hidden justify-between text-sm gap-1'>
              <ProgressBar progress={70} />
              <p>Data volume</p>
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

function FlowWithProvider(props: any) {
  return (
    <ReactFlowProvider>
      <Canva {...props} />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider