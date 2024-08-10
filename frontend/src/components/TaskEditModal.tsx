import React, { useState } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Task } from './TaskList';
import { formatDate } from '../utils/dateUtils';


interface TaskEditProps {
  isOpen: boolean,
  onClose: () => void,
  onTaskUpdate: (id: number, name: string, start_time: string, end_time: string) => void;
  task: Task;
}

const TaskEditModal: React.FC<TaskEditProps> = ({ isOpen, onClose, onTaskUpdate, task }) => {
  const [name, setName] = useState(task.name);
  const [start_time, setStartTime] = useState(formatDate(task.start_time));
  const [end_time, setEndTime] = useState(formatDate(task.end_time));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>タスクの編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="title">
            <FormLabel>Task Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={task.name}
            />
          </FormControl>

          <FormControl id="start_time" mt={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="string"
              value={start_time}
              onChange={(e) => setStartTime(e.target.value)}
              placeholder="Enter time"
            />
          </FormControl>

          <FormControl id="end_time" mt={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="string"
              value={end_time}
              onChange={(e) => setEndTime(e.target.value)}
              placeholder="Enter time"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => onTaskUpdate(task.id, name, start_time, end_time)}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TaskEditModal;
