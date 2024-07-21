import React, { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const BASE = `${process.env.REACT_APP_API_URL}/api`;

function App() {
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    const response = await fetch(`${BASE}/tasks`);
    const data = await response.json();
    if (response.ok) {
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ChakraProvider>
      <Box p={5}>
        <TaskForm onTaskUpdate={fetchTasks} />
        <TaskList tasks={tasks} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
