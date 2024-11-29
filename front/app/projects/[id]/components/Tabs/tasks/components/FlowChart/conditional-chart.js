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
import { useDataProvider } from "/providers/DataProvider";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useState } from "react";
import Loader from "/components/Loader";
import { getAll } from "/actions/tasks";
import CustomNode from "./custom-node";
import { update } from "/actions/tasks";

const BLOCK = 150;

export default function ConditionalChart() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useDataProvider();

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
      const task = nodes.find((node) => node.id === params.target);
      const dependencyIds = task.data.dependencies.map((dep) => dep.id);
      const newDependencies = [...dependencyIds, parseInt(params.source)].map(
        (id) => ({ id })
      );
      if (task) {
        update(task.data.id, {
          dependencies: newDependencies,
        });
      }
    },
    [setEdges, nodes]
  );

  useEffect(() => {
    setIsLoading(true);
    const params = {
      include: ["procedure", "dependencies", "priority", "status"],
      sort: "milestone_order",
      "filter[taskable_id]": project.id,
      "filter[taskable_type]": "project",
    };
    getAll(params).then((data) => {
      setTasks(data.data.tasks);
      setIsLoading(false);
    });
  }, [project.id]);

  useEffect(() => {
    // Group tasks by levels for node positioning
    const tasksByLevel = Object.values(
      tasks.reduce((acc, task) => {
        acc[task.treeVerticalLevel] = acc[task.treeVerticalLevel] || [];
        acc[task.treeVerticalLevel].push(task);
        return acc;
      }, {})
    );

    const nodes = [];
    const gap = tasksByLevel.length;

    // Create nodes based on levels
    tasksByLevel.forEach((level, levelIndex) => {
      level.forEach((task, taskIndex) => {
        nodes.push({
          id: task.id.toString(),
          position: {
            x: BLOCK * (taskIndex + 1) * (gap - levelIndex),
            y: BLOCK * task.treeVerticalLevel,
          },
          data: task,
          type: "custom",
        });
      });
    });

    // Group tasks by processId
    const processGroups = tasks.reduce((acc, task) => {
      const processId = task?.procedure?.processId;
      if (processId) {
        acc[processId] = acc[processId] || [];
        acc[processId].push(task);
      }
      return acc;
    }, {});

    // creo que process groups esta entrando al grupo de un proceso siguiente al que deberia

    const edges = Object.values(processGroups).flatMap(
      (group, index, allGroups) => {
        const groupEdges = [];

        // Create edges within the same group
        for (let i = 0; i < group.length - 1; i++) {
          groupEdges.push({
            id: `e${group[i].id}-${group[i + 1].id}`,
            source: group[i].id.toString(),
            target: group[i + 1].id.toString(),
          });
        }

        // Connect the final task in the current group to the first task of the next group
        const lastTask = group[group.length - 1];

        if (lastTask.isFinalTask && index < allGroups.length - 1) {
          const nextGroupFirstTask = allGroups[index + 1][0];
          groupEdges.push({
            id: `e${lastTask.id}-${nextGroupFirstTask.id}`,
            source: lastTask.id.toString(),
            target: nextGroupFirstTask.id.toString(),
          });
        }

        return groupEdges;
      }
    );

    setNodes(nodes);
    setEdges(edges);
  }, [tasks, setEdges, setNodes]);

  return (
    <MDBox display="flex" sx={{ height: "60vh" }}>
      {isLoading && <Loader />}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
