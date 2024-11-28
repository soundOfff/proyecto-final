"use client";

import MDBox from "/components/MDBox";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import CustomNode from "./nodes/custom-node";
import MDButton from "/components/MDButton";
import NodeForm from "../node-form";
import { store } from "/actions/procedures";
import { show } from "/actions/processes";
import { addProcedurePath } from "/actions/procedures";
import { Icon } from "@mui/material";

const BLOCK = 350;
const MAX_HEIGHT = 120;

export default function CreateChart({ processId }) {
  const [refresher, setRefresher] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [process, setProcess] = useState(null);

  const fetchProcess = async () => {
    const process = await show(processId, {
      include: ["procedures.outgoingPaths"],
    });
    setProcess(process);
  };

  useEffect(() => {
    fetchProcess();
  }, []);

  const handleNodeSubmit = async (formData) => {
    await store(formData);
  };

  const onConnect = useCallback(
    async (params) => {
      setEdges((eds) => addEdge(params, eds));
      addProcedurePath({
        from_procedure_id: params.source,
        to_procedure_id: params.target,
      });
    },
    [setEdges]
  );

  const createNodesAndEdges = (process) => {
    const nodes = [];
    const edges = [];

    let xPos = 0;
    let yPos = 0;

    process.procedures.forEach((procedure) => {
      const isConditional = Boolean(procedure.isConditional);
      const isFinal = procedure.outgoingPaths.length === 0;
      nodes.push({
        id: procedure.id.toString(),
        data: {
          ...procedure,
          processId: process.id,
          isFinal,
          isConditional,
        },
        position: {
          x: xPos,
          y: yPos,
        },
        type: "custom",
      });
      if (procedure.outgoingPaths.length == 0) {
        yPos += MAX_HEIGHT;
      }
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
            sourceHandle: "right",
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
          currNode.position.y + MAX_HEIGHT * (!currNode.hasBackEdge * index);

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

  useEffect(() => {
    fetchProcess();
  }, [refresher]);

  return (
    <MDBox
      display="flex"
      flexDirection="column"
      spacing={2}
      sx={{ height: "100vh" }}
    >
      <NodeForm
        processId={processId}
        onSubmit={handleNodeSubmit}
        onNodeCreated={fetchProcess}
        totalNodes={process?.procedures?.length}
      />
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
        <MDBox
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            p: 5,
            zIndex: 100,
          }}
        >
          <MDButton
            color="info"
            variant="gradient"
            onClick={() => setRefresher(!refresher)}
          >
            Refrescar <Icon sx={{ ml: 1 }}>loop</Icon>
          </MDButton>
        </MDBox>
      </ReactFlow>
    </MDBox>
  );
}
