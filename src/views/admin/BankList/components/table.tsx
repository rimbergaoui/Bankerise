/*import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Input,
  Table as TableChakra,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { MdDelete, MdAdd, MdVisibility, MdEdit } from "react-icons/md";
import {
  fetchBanks,
  createBank,
  updateBank,
  deleteBank,
} from "store/Bank/bankActions";

export interface Bank {
  id: number;
  code: string;
  name: string;
}

const Table: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isUpdatingBank, setIsUpdatingBank] = useState(false);
  const [newBankCode, setNewBankCode] = useState("");
  const [newBankName, setNewBankName] = useState("");
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);

  const banks = useSelector((state: any) => state?.banks?.banks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBanks() as any);
  }, [dispatch]);

  const handleDelete = (bankId: string) => {
    dispatch(deleteBank(bankId) as any);
  };

  const handleView = (bankId: number) => {
    console.log(`Voir la banque avec l'ID ${bankId}`);
  };

  const handleUpdate = (bankId: number) => {
    setSelectedBankId(bankId);
    setIsUpdatingBank(true);
    const selectedBank = banks.find((bank: Bank) => bank.id === bankId);
    if (selectedBank) {
      setNewBankCode(selectedBank.code);
      setNewBankName(selectedBank.name);
    }
  };

  const handleAddBank = () => {
    setIsAddingBank(true);
  };

  const handleCancelAddBank = () => {
    setIsAddingBank(false);
    setNewBankCode("");
    setNewBankName("");
  };

  const handleCancelUpdateBank = () => {
    setIsUpdatingBank(false);
    setSelectedBankId(null);
    setNewBankCode("");
    setNewBankName("");
  };

  const handleSaveBank = () => {
    const newBank: Bank = {
      id: banks.length + 1,
      code: newBankCode,
      name: newBankName,
    };
    dispatch(createBank(newBank) as any);
    setIsAddingBank(false);
    setNewBankCode("");
    setNewBankName("");
  };

  const handleUpdateBank = () => {
    if (selectedBankId) {
      const updatedBank: Bank = {
        id: selectedBankId,
        code: newBankCode,
        name: newBankName,
      };
      dispatch(updateBank(updatedBank) as any);
      setIsUpdatingBank(false);
      setSelectedBankId(null);
      setNewBankCode("");
      setNewBankName("");
    }
  };

  const filteredBanks = banks?.filter((bank: Bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isAddingBank} onClose={handleCancelAddBank}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Bank</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newBankCode}
                onChange={(e) => setNewBankCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveBank}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddBank}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUpdatingBank} onClose={handleCancelUpdateBank}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Bank</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newBankCode}
                onChange={(e) => setNewBankCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateBank}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateBank}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <>
        <Box display="flex" justifyContent="flex-end" mb={4}>
          <Button
            leftIcon={<MdAdd />}
            colorScheme="teal"
            onClick={handleAddBank}
            backgroundColor="#67C3D7"
          >
            Add Bank
          </Button>
        </Box>
        <TableChakra
          variant="outline"
          colorScheme="gray"
          borderWidth="1px"
          borderRadius="lg"
          bg="white"
        >
          <Thead
            borderBottomWidth="1px"
            borderBottomColor="gray.200"
            borderTopRadius="lg"
          >
            <Tr>
              <Th>ID</Th>
              <Th>Code</Th>
              <Th>Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredBanks?.map((bank: any) => (
              <Tr
                key={bank.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{bank.id}</Td>
                <Td width="60px">{bank.code}</Td>
                <Td width="60px">{bank.name}</Td>
                <Td width="20px">
                  <IconButton
                    aria-label="View"
                    icon={<MdVisibility size={16} />}
                    colorScheme="teal"
                    onClick={() => handleView(bank.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Update"
                    icon={<MdEdit size={16} />}
                    colorScheme="blue"
                    onClick={() => handleUpdate(bank.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete size={16} />}
                    colorScheme="red"
                    onClick={() => handleDelete(bank.id)}
                    size="sm"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableChakra>
      </>
    </Box>
  );
};

export default Table;*/

import React, { useState } from "react";
import {
  Box,
  Input,
  Table as TableChakra,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { MdDelete, MdAdd, MdVisibility, MdEdit } from "react-icons/md";
import { useRef } from "react";

export interface Bank {
  id: number;
  name: string;
  code: string;
}

const Table: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [banks, setBanks] = useState<Bank[]>([
    { id: 1, name: "Bank 1", code: "Monastir" },
    { id: 2, name: "Bank 2", code: "Sousse" },
    { id: 3, name: "Bank 3", code: "Tunisie" },
  ]);
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLButtonElement>(null);
  const [isAddingBank, setIsAddingBank] = useState(false);
  const [isUpdatingBank, setIsUpdatingBank] = useState(false);
  const [newBankName, setNewBankName] = useState("");
  const [newBankCode, setNewBankCode] = useState("");
  const [selectedBankId, setSelectedBankId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBankIdForDeletion, setSelectedBankIdForDeletion] = useState<
    number | null
  >(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleOpenDeleteModal = (bankId: number) => {
    setSelectedBankIdForDeletion(bankId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedBankIdForDeletion(null);
  };

  const handleDelete = (bankId: number) => {
    handleOpenDeleteModal(bankId);
  };

  const handleDeleteBank = (bankId: number | null) => {
    if (bankId) {
      setBanks((prevBanks) => prevBanks.filter((bank) => bank.id !== bankId));
    }
  };

  const handleView = (bankId: number) => {
    setSelectedBankId(bankId);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedBankId(null);
  };

  const handleUpdate = (bankId: number) => {
    setSelectedBankId(bankId);
    setIsUpdatingBank(true);
    const selectedBank = banks.find((bank) => bank.id === bankId);
    if (selectedBank) {
      setNewBankName(selectedBank.name);
      setNewBankCode(selectedBank.code);
    }
  };

  const handleAddBank = () => {
    setIsAddingBank(true);
  };

  const handleCancelAddBank = () => {
    setIsAddingBank(false);
    setNewBankName("");
    setNewBankCode("");
  };

  const handleCancelUpdateBank = () => {
    setIsUpdatingBank(false);
    setSelectedBankId(null);
    setNewBankName("");
    setNewBankCode("");
  };

  const handleSaveBank = () => {
    const newBank: Bank = {
      id: banks.length + 1,
      name: newBankName,
      code: newBankCode,
    };
    setBanks((prevBanks) => [...prevBanks, newBank]);
    setIsAddingBank(false);
    setNewBankName("");
    setNewBankCode("");
  };

  const handleUpdateBank = () => {
    if (selectedBankId) {
      const updatedBanks = banks.map((bank) =>
        bank.id === selectedBankId
          ? { ...bank, name: newBankName, code: newBankCode }
          : bank
      );
      setBanks(updatedBanks);
      setIsUpdatingBank(false);
      setSelectedBankId(null);
      setNewBankName("");
      setNewBankCode("");
    }
  };

  const handleSelectRow = (bankId: number) => {
    setSelectedRow(bankId === selectedRow ? null : bankId);
  };

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }} >
      <Modal
        isOpen={isAddingBank}
        onClose={handleCancelAddBank}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Bank</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel
                htmlFor="name"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Name:
              </FormLabel>
              <Input
                type="text"
                id="name"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel
                htmlFor="code"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              >
                Code:
              </FormLabel>
              <Input
                type="text"
                id="code"
                value={newBankCode}
                onChange={(e) => setNewBankCode(e.target.value)}
                required
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveBank}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddBank}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isUpdatingBank}
        onClose={handleCancelUpdateBank}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Bank</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Name:</FormLabel>
              <Input
                type="text"
                id="name"
                value={newBankName}
                onChange={(e) => setNewBankName(e.target.value)}
                required
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="code">Code:</FormLabel>
              <Input
                type="text"
                id="code"
                value={newBankCode}
                onChange={(e) => setNewBankCode(e.target.value)}
                required
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateBank}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateBank}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isDeleteModalOpen}
        leastDestructiveRef={undefined}
        onClose={handleCloseDeleteModal}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Bank
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this bank?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={undefined} onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handleDeleteBank(selectedBankIdForDeletion);
                handleCloseDeleteModal();
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Modal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Bank</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="name">Name:</FormLabel>
              <Input
                type="text"
                id="name"
                value={
                  selectedBankId
                    ? banks.find((bank) => bank.id === selectedBankId)?.name ||
                      ""
                    : ""
                }
                readOnly
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="code">Code:</FormLabel>
              <Input
                type="text"
                id="code"
                value={
                  selectedBankId
                    ? banks.find((bank) => bank.id === selectedBankId)?.code ||
                      ""
                    : ""
                }
                readOnly
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseViewModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button
          leftIcon={<MdAdd />}
          colorScheme="teal"
          onClick={handleAddBank}
          backgroundColor="#67C3D7"
        >
          Add Bank
        </Button>
      </Box>
      <TableChakra
        variant="outline"
        colorScheme="gray"
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
      >
        <Thead
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
          borderTopRadius="lg"
        >
          <Tr>
            <Th textAlign="center">ID</Th>
            <Th textAlign="center">Name</Th>
            <Th textAlign="center">Code</Th>
            <Th textAlign="center">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredBanks.map((bank) => (
            <Tr
              key={bank.id}
              borderWidth="1px"
              borderRadius="lg"
              borderColor="gray.200"
              cursor="pointer"
              onClick={() => handleSelectRow(bank.id)}
              _hover={{ bg: "gray.100" }}
              bg={selectedRow === bank.id ? "teal.50" : "inherit"}
            >
              <Td width="20px" textAlign="center">{bank.id}</Td>
              <Td width="60px" textAlign="center">{bank.name}</Td>
              <Td width="60px" textAlign="center">{bank.code}</Td>
              <Td width="20px" textAlign="center">
                <IconButton
                  aria-label="View"
                  icon={<MdVisibility size={16} />}
                  colorScheme="teal"
                  onClick={() => handleView(bank.id)}
                  size="sm"
                  mr={2}
                />
                <IconButton
                  aria-label="Update"
                  icon={<MdEdit size={16} />}
                  colorScheme="blue"
                  onClick={() => handleUpdate(bank.id)}
                  size="sm"
                  mr={2}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<MdDelete size={16} />}
                  colorScheme="red"
                  onClick={() => handleDelete(bank.id)}
                  size="sm"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableChakra>
    </Box>
  );
};

export default Table;
