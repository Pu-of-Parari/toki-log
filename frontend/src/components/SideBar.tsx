// src/components/Sidebar.tsx
import React from "react";
import {
  Box,
  Link,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Box pos="relative">
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody>
              <VStack align="flex-start" p={2}>
                <Link as={RouterLink} to="/" onClick={onClose}>
                  ✔ タスク記録
                </Link>
                <Link as={RouterLink} to="/users" onClick={onClose}>
                  ✔ ユーザ管理
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
