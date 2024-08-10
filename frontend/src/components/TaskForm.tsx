import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import { TaskTimeContext } from "../utils/TaskTimeProvider";
import { formatSecondsToTime } from "../utils/dateUtils";

interface TaskFormProps {
  onTaskUpdate: () => void;
  users: Array<User>;
}

interface User {
  id: number,
  name: string
}

const BASE = `${process.env.REACT_APP_API_URL}/api`;

const TaskForm: React.FC<TaskFormProps> = ({ onTaskUpdate, users }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [processUnixtime, setProcessUnixtime] = useState<number>(0);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskId, setTaskId] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const toast = useToast();
  const { taskStartTime, setTaskStartTime, taskUserId, setTaskUserId } = useContext(TaskTimeContext);
  const isRunningRef = useRef(isRunning);
  const taskStartTimeRef = useRef(taskStartTime)

  // isRunningは、時間計測中にリロードされると解除されてしまうので、バックエンドとの対応が必要

  useEffect(() => {
    isRunningRef.current = isRunning;
    taskStartTimeRef.current = taskStartTime
  }, [isRunning, taskStartTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(isRunningRef.current, Date.now())
      if (isRunningRef.current) {
        setProcessUnixtime(Math.floor((Date.now() - taskStartTimeRef.current) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval); // クリーンアップ用にインターバルをクリア
  }, []);

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
    if (taskUserId == 0) {
      toast({
        title: "Error",
        description: "Please select username.",
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
      body: JSON.stringify({ name: taskName, description: taskDescription, created_by: taskUserId }),
    });
    const data = await response.json();
    if (response.ok) {
      setTaskId(data.id);
      setIsRunning(true);
      toast({
        title: "Task Started",
        description: "Your task has started",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTaskStartTime(Date.now())
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
      setIsRunning(false);
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

  //TODO: User選択が、DB取得ではなく、ハリボテになってるのでなおす
  return (
    <Box height="120px" borderRadius="md" borderWidth="1px">
      <Flex direction="column" alignItems="flex-start" p={4}>
        <Select
          placeholder="ユーザ"
          width={{ base: "40%", md: "20%", lg: "20%" }}
          ml="0"
          onChange={(e) => setTaskUserId(Number(e.target.value))}
          value={taskUserId}
        >
          {users.map((user) => (
            <option value={user.id}>{user.name}</option>
          ))}
        </Select>
        <Flex direction="row" align="center" width="100%">
          <Input
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            width="70%"
            ml="0"
          />
          <Button
            colorScheme={isRunning ? "red" : "blue"}
            onClick={isRunning ? stopTask : startTask}
            width="10%"
            ml="3%"
          >
            {isRunning ? "Stop Task" : "Start Task"}
          </Button>
          <Text width="20%" fontSize="30px" textAlign="center">
            {formatSecondsToTime(processUnixtime)}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TaskForm;
