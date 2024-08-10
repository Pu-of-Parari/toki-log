import React from "react";
import {
  ChakraProvider,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface ConfirmationModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  header?: string;
  body?: string;
  buttonStr?: string;
  cancelStr?: string;
}

const ConfirmationModal: React.FC<ConfirmationModelProps> = ({
  isOpen,
  onClose,
  onConfirm,
  header = "",
  body = "",
  buttonStr = "",
  cancelStr = "キャンセル",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={onConfirm} mr={3}>
            {buttonStr}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {cancelStr}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
