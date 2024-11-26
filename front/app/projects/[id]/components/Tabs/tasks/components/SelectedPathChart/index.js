"use client";

import MDBox from "/components/MDBox";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useEffect, useState } from "react";
import CustomNode from "./custom-node";
import MDButton from "/components/MDButton";
import { show } from "/actions/processes";

const BLOCK = 450;

export default function SelectedPathChart({ processId = null, tasks = [] }) {
  const [refresher, setRefresher] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [process, setProcess] = useState(null);

  // Fetch process data
  const fetchProcess = async () => {
    const process = await show(processId, {
      include: ["procedures.outgoingPaths"],
    });
    setProcess(process);
  };

  useEffect(() => {
    fetchProcess();
  }, []);

  const onConnect = () => {};

  const createNodesAndEdges = (process) => {
    const nodes = [];
    const edges = [];

    let xPos = 0;
    let yPos = 0;

    process.procedures.forEach((procedure) => {
      const isConditional = Boolean(procedure.isConditional);
      const relatedTask = tasks.find(
        (task) => task.procedure?.id === procedure.id
      );
      const isSelected = !isConditional && relatedTask;

      nodes.push({
        id: procedure.id.toString(),
        data: {
          ...procedure,
          processId: process.id,
          isConditional,
          isSelected,
          task: relatedTask,
        },
        position: {
          x: xPos,
          y: yPos,
        },
        type: "custom",
      });
    });

    process.procedures.forEach((procedure) => {
      procedure.outgoingPaths.forEach((path, index) => {
        if (procedure.isConditional) {
          edges.push({
            id: `e${path.fromProcedureId}-${path.toProcedureId}`,
            source: path.fromProcedureId.toString(),
            target: path.toProcedureId.toString(),
            sourceHandle: index === 0 ? "bellow" : "right",
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 30,
              height: 30,
            },
          });
        } else if (path.fromProcedureId > path.toProcedureId) {
          edges.push({
            id: `e${path.fromProcedureId}-${path.toProcedureId}`,
            source: path.fromProcedureId.toString(),
            target: path.toProcedureId.toString(),
            sourceHandle: "top",
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 30,
              height: 30,
            },
          });
        } else {
          edges.push({
            id: `e${path.fromProcedureId}-${path.toProcedureId}`,
            source: path.fromProcedureId.toString(),
            target: path.toProcedureId.toString(),
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 30,
              height: 30,
            },
          });
        }
        const currNode = nodes.find(
          (curr) => curr.id === path.fromProcedureId.toString()
        );
        const nextNode = nodes.find(
          (node) => node.id === path.toProcedureId.toString()
        );

        if (path.fromProcedureId > path.toProcedureId) {
          currNode.data = {
            ...currNode.data,
            hasBackEdge: true,
          };
          return;
        }

        nextNode.position.x = currNode.position.x + BLOCK;
        nextNode.position.y =
          currNode.position.y + (BLOCK / 3) * (!currNode.hasBackEdge * index);

        if (currNode.data.isConditional) {
          currNode.position.y -= 4.8;
          nextNode.position.x -= BLOCK / 3;
        }
      });
    });

    setNodes(nodes);
    setEdges(edges);
  };

  useEffect(() => {
    if (process) {
      createNodesAndEdges(process);
    }
  }, [refresher, process]);

  return (
    <MDBox
      display="flex"
      flexDirection="column"
      spacing={2}
      sx={{ height: "100vh" }}
    >
      <MDButton onClick={() => setRefresher(!refresher)}>Refresh</MDButton>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
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
