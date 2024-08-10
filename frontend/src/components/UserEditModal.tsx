import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { User } from "./UserList";

interface UserEditProps {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdate: (id: number, name: string) => void;
  user: User;
}

const UserEditModal: React.FC<UserEditProps> = ({
  isOpen,
  onClose,
  onUserUpdate,
  user,
}) => {
  const [name, setName] = useState(user.name);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>ユーザの編集</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name">
            <FormLabel>User Name</FormLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={user.name}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => onUserUpdate(user.id, name)}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserEditModal;
