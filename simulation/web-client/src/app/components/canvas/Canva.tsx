"use client"
import React, { useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Connection, Edge, Panel, Background, BackgroundVariant } from 'reactflow';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';

const nodeTypes = {
  custom: CustomNode,
};


const Canva = ({ data }: { data: any }) => {

  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

  useEffect(() => {
    console.log(data)
    setNodes(data.nodes);
    setEdges(data.edges);
  }, [data.nodes, data.edges]);

  return (
    <div className='relative' style={{ width: '100vw', height: '100vh' }}>
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
        <MiniMap />
        <Controls />
        <Panel position="top-left">
          <div className='prose relative p-4 bg-white shadow rounded-md'>
            <h2>
              {data.name}
            </h2>
            <p> {data.description}</p>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default Canva;
