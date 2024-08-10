import { useState, useEffect } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { User } from "../components/UserList";

const BASE = `${process.env.REACT_APP_API_URL}/api`;

function TimerPage() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState<Array<User>>([]);
  const fetchTasks = async () => {
    const response = await fetch(`${BASE}/tasks`);
    const data = await response.json();
    if (response.ok) {
      setTasks(data);
    }
  };
  const fetchUsers = async () => {
    const response = await fetch(`${BASE}/users`);
    const data = await response.json();
    if (response.ok) {
      setUsers(data)
    }
  }
  fetchUsers()

  const onDelete = async () => {
    fetchTasks();
  }

  const onEdit = async () => {
    fetchTasks();
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ChakraProvider>
      <Box p={5}>
        <TaskForm onTaskUpdate={fetchTasks} users={users} />
        <TaskList tasks={tasks} onDelete={onDelete} onEdit={onEdit} users={users} />
      </Box>
    </ChakraProvider>
  );
}

export default TimerPage;
