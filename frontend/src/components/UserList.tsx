// src/components/UserList.tsx
import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ConfirmationModal from "../components/ConfirmationModal";
import UserEditModal from "./UserEditModal";

export interface User {
  id: number;
  name: string;
}

interface UserListProps {
  users: User[];
  onEdit: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure({ onClose: () => setSelectedUser(null) });
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure({ onClose: () => setSelectedUser(null) });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const handleEdit = (id: number, name: string) => {
    onEdit(id, name);
    onEditClose();
  };
  const onEditModal = (user: User) => {
    setSelectedUser(user);
    onEditOpen();
  };
  const handleDelete = () => {
    if (selectedUser) {
      onDelete(selectedUser.id);
      onDeleteClose();
    }
  };
  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  return (
    <>
      <Table mt={5}>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Username</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.id}</Td>
              <Td>{user.name}</Td>
              <Td>
                <IconButton
                  aria-label="Edit User"
                  icon={<EditIcon />}
                  colorScheme="teal"
                  size="sm"
                  mr="2"
                  onClick={() => onEditModal(user)}
                />
                <IconButton
                  aria-label="Delete User"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  size="sm"
                  onClick={() => openDeleteModal(user)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ConfirmationModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={handleDelete}
        header="ユーザー削除の確認"
        body={`本当にユーザー '${selectedUser?.name}' を削除してよろしいですか？`}
        buttonStr="削除"
        cancelStr="キャンセル"
      />
      {selectedUser && (
        <UserEditModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          onUserUpdate={handleEdit}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default UserList;
