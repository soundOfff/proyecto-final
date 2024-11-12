"use client";

import MDBox from "/components/MDBox";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useNodesState,
  addEdge,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import CustomNode from "./custom-node";
import dagre from "@dagrejs/dagre";

const BLOCK = 150;

export default function ConditionalChart({ process }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [layoutedEdges, setLayoutedEdges] = useState([]);
  const [layoutedNodes, setLayoutedNodes] = useState([]);

  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (nodes, edges, isHorizontal = true) => {
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      const newNode = {
        ...node,
        targetPosition: isHorizontal ? "left" : "top",
        sourcePosition: isHorizontal ? "right" : "bottom",
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };

      return newNode;
    });

    return { nodes: newNodes, edges };
  };

  const createNodesAndEdges = (process) => {
    const nodes = [];
    const edges = [];

    let yPos = 0;
    const addProceduresAsNodes = (
      procedures,
      processId,
      offsetX,
      forks = 0
    ) => {
      const processNodes = procedures.map((procedure, index) => {
        const node = {
          id: procedure.id.toString(),
          data: {
            ...procedure,
            processId,
            isFinal: index === procedures.length - 1,
            isConditional: index == procedures.length - 1 && forks > 0,
          },
          position: { x: offsetX, y: yPos + BLOCK * index },
          type: "custom",
        };
        return node;
      });
      nodes.push(...processNodes);

      // Create sequential edges within the same process group
      processNodes.forEach((node, index) => {
        if (index < processNodes.length - 1) {
          edges.push({
            id: `e${node.id}-${processNodes[index + 1].id}`,
            source: node.id,
            target: processNodes[index + 1].id,
          });
        }
      });

      return processNodes;
    };

    // Main process nodes and edges
    const mainProcessNodes = addProceduresAsNodes(
      process.procedures,
      process.id,
      0,
      process.forks.length
    );

    process.forks.forEach((fork, forkIndex) => {
      const offsetX = BLOCK * (forkIndex + 1);
      console.log(offsetX);
      const forkNodes = addProceduresAsNodes(fork.procedures, fork.id, offsetX);

      if (mainProcessNodes.length && forkNodes.length) {
        edges.push({
          id: `e${mainProcessNodes[mainProcessNodes.length - 1].id}-${
            forkNodes[0].id
          }`,
          source: mainProcessNodes[mainProcessNodes.length - 1].id,
          target: forkNodes[0].id,
        });
      }
    });

    const allGroups = [
      mainProcessNodes,
      ...process.forks.map((fork) =>
        addProceduresAsNodes(fork.procedures, fork.id, BLOCK * 3)
      ),
    ];
    for (let i = 0; i < allGroups.length - 1; i++) {
      const currentGroup = allGroups[i];
      const nextGroup = allGroups[i + 1];
      if (currentGroup.length && nextGroup.length) {
        edges.push({
          id: `e${currentGroup[currentGroup.length - 1].id}-${nextGroup[0].id}`,
          source: currentGroup[currentGroup.length - 1].id,
          target: nextGroup[0].id,
        });
      }
    }
    setNodes(nodes);
    setEdges(edges);
  };

  useEffect(() => {
    if (process) {
      createNodesAndEdges(process);
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges);
      setLayoutedNodes(layoutedNodes);
      setLayoutedEdges(layoutedEdges);
    }
  }, []);

  return (
    <MDBox display="flex" sx={{ height: "60vh" }}>
      <ReactFlow
        nodes={layoutedNodes}
        edges={layoutedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={{ custom: CustomNode }}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </MDBox>
  );
}
