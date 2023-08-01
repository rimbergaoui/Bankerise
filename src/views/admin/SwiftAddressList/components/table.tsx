import React, { useState, useEffect } from "react";
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
  fetchSwiftAddresses,
  createSwiftAddress,
  updateSwiftAddress,
  deleteSwiftAddress,
} from "store/SwiftAdress/SwiftAdressActions";

export interface SwiftAddress {
  id: number;
  adressSwift: string;
  customer: string;
  name: string;
  street: string;
  town: string;
}

const Table: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingSwiftAdress, setIsAddingSwiftAdress] = useState(false);
  const [isUpdatingSwiftAdress, setIsUpdatingSwiftAdress] = useState(false);
  const [selectedSwiftAdressId, setSelectedSwiftAdressId] = useState<number | null>(null);
  const [newadressSwift, setNewadressSwift] = useState("");
  const [newCustomer, setNewCustomer] = useState("");
  const [newName, setNewName] = useState("");
  const [newStreet, setNewStreet] = useState("");
  const [newTown, setNewTown] = useState("");

  const swiftAddresses = useSelector(
    (state: any) => state?.swiftAddresses?.swiftAddresses
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSwiftAddresses() as any);
  }, [dispatch]);

  const handleDelete = (swiftAddressId: string) => {
    dispatch(deleteSwiftAddress(swiftAddressId) as any);
  };

  const handleView = (swiftAddressId: number) => {
    console.log(`Voir le produit avec l'ID ${swiftAddressId}`);
  };

  const handleUpdate = (swiftAddressId: number) => {
    setSelectedSwiftAdressId(swiftAddressId);
    setIsUpdatingSwiftAdress(true);
    const selectedSwiftAdress = swiftAddresses.find(
      (swiftAddress: SwiftAddress) => swiftAddress.id === swiftAddressId
    );
    if (selectedSwiftAdress) {
      setNewadressSwift(selectedSwiftAdress.adressSwift);
      setNewCustomer(selectedSwiftAdress.customer);
      setNewName(selectedSwiftAdress.name);
      setNewStreet(selectedSwiftAdress.street);
      setNewTown(selectedSwiftAdress.town);
    }
  };

  const handleAddSwiftAddress = () => {
    setIsAddingSwiftAdress(true);
  };

  const handleCancelAddSwiftAddress = () => {
    setIsAddingSwiftAdress(false);
    setNewadressSwift("");
    setNewCustomer("");
    setNewName("");
    setNewStreet("");
    setNewTown("");
  };

  const handleCancelUpdateSwiftAddress = () => {
    setIsUpdatingSwiftAdress(false);
    setSelectedSwiftAdressId(null);
    setNewadressSwift("");
    setNewCustomer("");
    setNewName("");
    setNewStreet("");
    setNewTown("");
  };

  const handleSaveSwiftAddress = () => {
    const newSwiftAddress: SwiftAddress = {
      id: swiftAddresses.length + 1,
      adressSwift: newadressSwift,
      customer: newCustomer,
      name: newName,
      street: newStreet,
      town: newTown,
    };
    dispatch(createSwiftAddress(newSwiftAddress) as any);
    setIsAddingSwiftAdress(false);
    setNewadressSwift("");
    setNewCustomer("");
    setNewName("");
    setNewStreet("");
    setNewTown("");
  };

  const handleUpdateSwiftAddress = () => {
    if (selectedSwiftAdressId) {
      const updatedSwiftAddress: SwiftAddress = {
        id: selectedSwiftAdressId,
        adressSwift: newadressSwift,
        customer: newCustomer,
        name: newName,
        street: newStreet,
        town: newTown,
      };
      dispatch(updateSwiftAddress(updatedSwiftAddress) as any);
      setIsUpdatingSwiftAdress(false);
      setSelectedSwiftAdressId(null);
      setNewadressSwift("");
      setNewCustomer("");
      setNewName("");
      setNewStreet("");
      setNewTown("");
    }
  };

  const filteredSwiftAddresses = swiftAddresses?.filter(
    (swiftAddress: SwiftAddress) =>
      swiftAddress?.customer?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal
        isOpen={isAddingSwiftAdress}
        onClose={handleCancelAddSwiftAddress}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Swift Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="addressSwift">Address Swift:</label>
              <input
                type="text"
                id="addressSwift"
                value={newadressSwift}
                onChange={(e) => setNewadressSwift(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="customer">Customer:</label>
              <input
                type="text"
                id="customer"
                value={newCustomer}
                onChange={(e) => setNewCustomer(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="town">Town:</label>
              <input
                type="text"
                id="town"
                value={newTown}
                onChange={(e) => setNewTown(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveSwiftAddress}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddSwiftAddress}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isUpdatingSwiftAdress}
        onClose={handleCancelUpdateSwiftAddress}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Swift Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="addressSwift">Address Swift:</label>
              <input
                type="text"
                id="addressSwift"
                value={newadressSwift}
                onChange={(e) => setNewadressSwift(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="customer">Customer:</label>
              <input
                type="text"
                id="customer"
                value={newCustomer}
                onChange={(e) => setNewCustomer(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                value={newStreet}
                onChange={(e) => setNewStreet(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="town">Town:</label>
              <input
                type="text"
                id="town"
                value={newTown}
                onChange={(e) => setNewTown(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateSwiftAddress}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateSwiftAddress}>
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
            onClick={handleAddSwiftAddress}
            backgroundColor="#67C3D7"
          >
            Add Swift Address
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
              <Th>Address Swift</Th>
              <Th>Customer</Th>
              <Th>Name</Th>
              <Th>Street</Th>
              <Th>Town</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredSwiftAddresses?.map((swiftAdress: any) => (
              <Tr
                key={swiftAdress.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{swiftAdress.id}</Td>
                <Td width="20px">{swiftAdress.adressSwift}</Td>
                <Td width="20px">{swiftAdress.customer}</Td>
                <Td width="20px">{swiftAdress.name}</Td>
                <Td width="20px">{swiftAdress.street}</Td>
                <Td width="20px">{swiftAdress.town}</Td>
                <Td width="30px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconButton
                      aria-label="View"
                      icon={<MdVisibility size={16} />}
                      colorScheme="teal"
                      onClick={() => handleView(swiftAdress.id)}
                      size="sm"
                      mr={1}
                    />
                    <IconButton
                      aria-label="Update"
                      icon={<MdEdit size={16} />}
                      colorScheme="blue"
                      onClick={() => handleUpdate(swiftAdress.id)}
                      size="sm"
                      mr={1}
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<MdDelete size={16} />}
                      colorScheme="red"
                      onClick={() => handleDelete(swiftAdress.id)}
                      size="sm"
                      mr={1}
                    />
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableChakra>
      </>
    </Box>
  );
};

export default Table;
