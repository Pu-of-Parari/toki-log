import React, { useState, useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import UserList, { User } from "../components/UserList"; // 既に定義された User 型を使用
import UserForm from "../components/UserForm";

const BASE = `${process.env.REACT_APP_API_URL}/api`;

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const toast = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE}/users`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      // console.error("Failed to fetch users:", error);
      toast({
        title: "Error fetching users",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setUsers([]); // エラーが発生した場合は空の配列をセット
    }
  };

  const handleAddUser = async (newUserData: { name: string }) => {
    try {
      const response = await fetch(`${BASE}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      const addedUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, addedUser]);
      toast({
        title: "User added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Error adding user",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleEditUser = async (id: number, name: string) => {
    try {
      const response = await fetch(`${BASE}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? updatedUser : user))
      );
      toast({
        title: "User updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Error updating user",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`${BASE}/users/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((user) => user.id !== id));
      toast({
        title: "User deleted successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: "Error deleting user",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <UserForm onAddUser={handleAddUser} />
      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </Box>
  );
};

export default UserPage;
