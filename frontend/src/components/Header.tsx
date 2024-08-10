// src/components/Header.tsx
import React from "react";
import {
  Box,
  Text,
  useColorModeValue,
  Flex,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import Sidebar from "./SideBar";

const Header: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("blue.500", "blue.800");
  const textColor = useColorModeValue("white", "gray.200");
  const SwitchIcon = colorMode === "light" ? MoonIcon : SunIcon;

  return (
    <Box bg={bgColor} w="100%" p={1} color={textColor}>
      <Flex justify="space-between" align="center">
        <IconButton
          aria-label="Open Menu"
          icon={<HamburgerIcon />}
          onClick={onOpen}
          m={2}
          size="lg"
        />
        <Text fontSize="xl" fontWeight="bold">
          Toki-Log
        </Text>
        <IconButton
          aria-label={`Switch to ${
            colorMode === "light" ? "dark" : "light"
          } mode`}
          icon={<SwitchIcon />}
          onClick={toggleColorMode}
          size="md"
          colorScheme="teal"
        />
      </Flex>
      <Sidebar isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
