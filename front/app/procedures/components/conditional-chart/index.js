"use client";

import MDBox from "/components/MDBox";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import CustomNode from "./custom-node";
import MDButton from "/components/MDButton";

const BLOCK = 350;
const OFFSET_X = 80;
const OFFSET_Y = 12.5; // Fixed circle node offset

const getPos = ({ xPos, yPos, index, isFinal, isConditional }) => {
  let pos = { x: xPos + BLOCK * index, y: yPos };

  if (isConditional) {
    pos.x = xPos + BLOCK * index + OFFSET_X / 2;
    pos.y = yPos / 2 - 1;
  } else if (isFinal) {
    pos.x = xPos + BLOCK * index - OFFSET_X / 2;
    pos.y = yPos - OFFSET_Y;
  }

  return pos;
};

export default function ConditionalChart({ process }) {
  const [refresher, setRefresher] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const createNodesAndEdges = (process) => {
    const nodes = [];
    const edges = [];

    let xPos = 0; // Start horizontal positioning from x = 0

    const addProceduresAsNodes = (procedures, processId, offsetY) => {
      const processNodes = procedures.map((procedure, index) => {
        const isFinal = index === procedures.length - 1;
        const node = {
          id: procedure.id.toString(),
          data: {
            ...procedure,
            processId,
            isFinal,
          },
          position: getPos({
            xPos,
            yPos: offsetY,
            index,
            isFinal,
            isConditional: procedure.isConditional,
          }),
          type: "custom",
        };
        return node;
      });
      nodes.push(...processNodes);

      // Create edges between sequential nodes in the process
      processNodes.forEach((node, index) => {
        if (index < processNodes.length - 1) {
          edges.push({
            id: `e${node.id}-${processNodes[index + 1].id}`,
            source: node.id,
            target: processNodes[index + 1].id,
            type: "smoothstep",
          });
        }
      });

      return processNodes;
    };

    // Recursive function to add nodes and edges for all nested forks
    const processForks = (parentProcess, parentNodes, offsetY = 0) => {
      parentProcess.allForks.forEach((fork, forkIndex) => {
        xPos = parentNodes[parentNodes.length - 1].position.x + BLOCK / 2;
        const forkOffsetY = offsetY + (BLOCK / 1.5) * forkIndex;

        const forkNodes = addProceduresAsNodes(
          fork.procedures,
          fork.id,
          forkOffsetY
        );

        // Connect last node of the parent process to the first node of the fork
        if (parentNodes.length && forkNodes.length) {
          edges.push({
            id: `e${parentNodes[parentNodes.length - 1].id}-${forkNodes[0].id}`,
            source: parentNodes[parentNodes.length - 1].id,
            target: forkNodes[0].id,
            type: "smoothstep",
            sourceHandle: forkIndex === 0 ? "bellow" : "right",
          });
        }

        // Recursive call for forks of this fork
        if (fork.allForks && fork.allForks.length > 0) {
          processForks(fork, forkNodes, forkOffsetY); // Adjust Y position for each level
        }
      });
    };

    // Main process nodes and edges
    const mainProcessNodes = addProceduresAsNodes(
      process.procedures,
      process.id,
      0
    );
    processForks(process, mainProcessNodes);

    setNodes(nodes);
    setEdges(edges);
  };

  useEffect(() => {
    if (process) {
      createNodesAndEdges(process);
    }
  }, [refresher]);

  return (
    <MDBox display="flex" sx={{ height: "60vh" }}>
      <MDButton onClick={() => setRefresher(!refresher)}>Refresh</MDButton>
      <ReactFlow
        nodes={nodes}
        edges={edges}
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
