import React, { useState } from "react";
import { Button, Input, VStack, useToast } from "@chakra-ui/react";

interface TaskFormProps {
  onTaskUpdate: () => void;
}

const BASE = `${process.env.REACT_APP_API_URL}/api`;

const TaskForm: React.FC<TaskFormProps> = ({ onTaskUpdate }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskId, setTaskId] = useState<number | null>(null);
  const toast = useToast();

  const startTask = async (): Promise<void> => {
    if (!taskName) {
      toast({
        title: "Error",
        description: "Please enter a task name.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log(`${BASE}`);
    const response = await fetch(`${BASE}/tasks/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: taskName, description: taskDescription }),
    });
    const data = await response.json();
    if (response.ok) {
      setTaskId(data.id);
      toast({
        title: "Task Started",
        description: "Your task has started",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to start the task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const stopTask = async (): Promise<void> => {
    if (!taskId) return;
    const response = await fetch(`${BASE}/tasks/stop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: taskId }),
    });
    if (response.ok) {
      setTaskId(null);
      setTaskName("");
      setTaskDescription("");
      onTaskUpdate();
      toast({
        title: "Task Stopped",
        description: "Your task has been stopped",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to stop the task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4}>
      <Input
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Input
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <Button
        colorScheme="blue"
        onClick={startTask}
        isDisabled={taskId !== null}
      >
        Start Task
      </Button>
      <Button colorScheme="red" onClick={stopTask} isDisabled={taskId === null}>
        Stop Task
      </Button>
    </VStack>
  );
};

export default TaskForm;
