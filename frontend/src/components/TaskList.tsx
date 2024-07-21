import React, { useEffect, useState } from "react";
import { Box, List, ListItem } from "@chakra-ui/react";
import { formatDate } from "../utils/dateUtils";

interface Task {
  id: number;
  name: string;
  description: string;
  start_time: number;
  end_time: number;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            {task.name} - {task.description}
            (Started: {formatDate(task.start_time)}, Ended:{" "}
            {formatDate(task.end_time)})
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
