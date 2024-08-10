import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

interface UserFormProps {
  onAddUser: (user: { name: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onAddUser }) => {
  const [name, setUsername] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    if (!name) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    onAddUser({ name });
    setUsername("");
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <FormControl isRequired>
        <FormLabel htmlFor="name">Username</FormLabel>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
          Add User
        </Button>
      </FormControl>
    </Box>
  );
};

export default UserForm;
