"use client"
import React, { useCallback, useEffect } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, ReactFlowProvider, useStoreApi, Connection, Edge, Panel, Background, BackgroundVariant, useReactFlow } from 'reactflow';
import CustomNode from './CustomNode';
import 'reactflow/dist/style.css';
import { Button } from '@/components/landing/Button';

const nodeTypes = {
    custom: CustomNode,
};
const proOptions = { hideAttribution: true };


function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
            <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
            <path
                d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
                fill="#A3A3A3"
                stroke="#A3A3A3"
            />
        </svg>
    )
}


const Canva = ({ data }: { data: any }) => {

    const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data.edges);
    const store = useStoreApi();
    const { setCenter } = useReactFlow();

    const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), []);

    useEffect(() => {
        const focusNode = () => {
            const { nodeInternals } = store.getState();
            const nodes = Array.from(nodeInternals).map(([, node]) => node);
            if (nodes.length > 0) {
                const node = nodes[0];
                if (!node.width || !node.height) return
                const x = node.position.x + node.width / 2 - 50;
                const y = node.position.y + node.height / 2;
                const zoom = 1.25;
                setCenter(x, y, { zoom, duration: 1 });
            }
        }
        focusNode()
    }, [nodes])
    return (
        <div className='relative' style={{ width: '100%', height: '600px' }}>
            <ReactFlow
                panOnDrag={false}
                nodes={nodes}
                edges={edges}
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
                minZoom={0.9}
                attributionPosition="bottom-left"


            >
                <Panel position="top-center">
                    <div className="relative -translate-x-[335px] mt-24 backdrop-blur-sm bg-white/5 z-10 mx-auto lg:col-span-7 lg:max-w-xl lg:pt-6 xl:col-span-6">
                        <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
                            Custom content delivery over <span className='text-primary font-bold'>multicast</span>
                        </h1>
                        <p className="mt-6 text-lg text-gray-600">
                            Provide end users with custom content, while taking advantage of fast and scalable multicasting.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                            <Button
                                href='/demos'
                            >
                                View demos
                            </Button>
                            <Button
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                variant="outline"
                            >
                                <PlayIcon className="h-6 w-6 flex-none" />
                                <span className="ml-2.5">Watch the video</span>
                            </Button>
                        </div>
                    </div>
                </Panel>
                <Background variant={"dots" as BackgroundVariant} />
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


export default FlowWithProvider;
