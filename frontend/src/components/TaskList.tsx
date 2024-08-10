import React, { useState } from "react";
import {
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { formatDate, parseDate } from "../utils/dateUtils";
import ConfirmationModal from "./ConfirmationModal";
import TaskEditModal from "./TaskEditModal";
import { User } from "./UserList";

const BASE = `${process.env.REACT_APP_API_URL}/api`;

export interface Task {
  id: number;
  name: string;
  description: string;
  start_time: number;
  end_time: number;
  created_by: number;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: () => void;
  onEdit: () => void;
  users: Array<User>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onDelete,
  onEdit,
  users,
}) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure({ onClose: () => setSelectedTask(null) });
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure({ onClose: () => setSelectedTask(null) });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const toast = useToast();

  const openDeleteModal = (task: Task) => {
    setSelectedTask(task);
    onDeleteOpen();
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    onEditOpen();
  };

  console.log(users);

  const handleDelete = async (id: number): Promise<void> => {
    const response = await fetch(`${BASE}/tasks/${id}`, {
      method: "DELETE",
    });
    // const data = await response.json();
    if (response.ok) {
      toast({
        title: "Task Deleted",
        description: "Your task has deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose();
      onDelete();
    } else {
      toast({
        title: "Error",
        description: "Failed to delete the task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onDeleteClose();
    }
  };
  const handleEdit = async (
    id: number,
    name: string,
    start_time: string,
    end_time: string
  ): Promise<void> => {
    console.log(`${BASE}`);
    const start_unixtime = parseDate(start_time);
    const end_unixtime = parseDate(end_time);
    if (isNaN(start_unixtime) || isNaN(end_unixtime)) {
      toast({
        title: "Error",
        description: "Invalid date format.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    let json_data = {
      name: name,
      description: "",
      start_time: start_unixtime,
      end_time: end_unixtime,
    };

    const response = await fetch(`${BASE}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json_data),
    });

    // const data = await response.json();
    if (response.ok) {
      toast({
        title: "Task Updated",
        description: "Your task has updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onEditClose();
      onEdit();
    } else {
      toast({
        title: "Error",
        description: "Failed to edit the task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onEditClose();
    }
  };

  function id2username(userid: number) {
    const filtered = users.filter((user) => user.id === userid);
    if (filtered.length <= 0) {
      return "noname";
    }
    return filtered[0].name;
  }

  return (
    <Table mt={5}>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Task Name</Th>
          <Th>Start time</Th>
          <Th>End time</Th>
          <Th>Created by</Th>
        </Tr>
      </Thead>
      <Tbody>
        {tasks.map((task) => (
          <Tr key={task.id}>
            <Td>{task.id}</Td>
            <Td>{task.name}</Td>
            <Td>{formatDate(task.start_time)}</Td>
            <Td>{formatDate(task.end_time)}</Td>
            <Td>{id2username(task.created_by)}</Td>
            <Td>
              <IconButton
                aria-label="Edit Task"
                icon={<EditIcon />}
                colorScheme="teal"
                size="sm"
                mr="2"
                onClick={() => openEditModal(task)}
              />
              <IconButton
                aria-label="Delete Task"
                icon={<DeleteIcon />}
                colorScheme="red"
                size="sm"
                onClick={() => openDeleteModal(task)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
      {selectedTask && (
        <ConfirmationModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          onConfirm={() => handleDelete(selectedTask.id)}
          header="削除の確認"
          body="本当にタスクを削除してよろしいですか？"
          buttonStr="削除"
          cancelStr="キャンセル"
        />
      )}
      {selectedTask && (
        <TaskEditModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onTaskUpdate={handleEdit}
          task={selectedTask}
        />
      )}
    </Table>
  );
};

export default TaskList;
