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
fetchCustomers,
createCustomer,
updateCustomer,
deleteCustomer,
} from "store/Customer/CustomerActions";

export interface Customer {
id: number;
code: string;
name: string;
}

const Table: React.FC = () => {
const [searchTerm, setSearchTerm] = useState("");
const [isAddingCustomer, setIsAddingCustomer] = useState(false);
const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);
const [newCustomerCode, setNewCustomerCode] = useState("");
const [newCustomerName, setNewCustomerName] = useState("");
const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

const customers = useSelector((state: any) => state?.customers?.customers);
const dispatch = useDispatch();

useEffect(() => {
dispatch(fetchCustomers() as any);
}, [dispatch]);

const handleDelete = (customerId: string) => {
dispatch(deleteCustomer(customerId) as any);
};

const handleView = (customerId: number) => {
console.log(`Voir le client avec l'ID ${customerId}`);
};

const handleUpdate = (customerId: number) => {
setSelectedCustomerId(customerId);
setIsUpdatingCustomer(true);
const selectedCustomer = customers.find((customer: Customer) => customer.id === customerId);
if (selectedCustomer) {
setNewCustomerCode(selectedCustomer.code);
setNewCustomerName(selectedCustomer.name);
}
};

const handleAddCustomer = () => {
setIsAddingCustomer(true);
};

const handleCancelAddCustomer = () => {
setIsAddingCustomer(false);
setNewCustomerCode("");
setNewCustomerName("");
};

const handleCancelUpdateCustomer = () => {
setIsUpdatingCustomer(false);
setSelectedCustomerId(null);
setNewCustomerCode("");
setNewCustomerName("");
};

const handleSaveCustomer = () => {
const newCustomer: Customer = {
id: customers.length + 1,
code: newCustomerCode,
name: newCustomerName,
};
dispatch(createCustomer(newCustomer) as any);
setIsAddingCustomer(false);
setNewCustomerCode("");
setNewCustomerName("");
};

const handleUpdateCustomer = () => {
if (selectedCustomerId) {
const updatedCustomer: Customer = {
id: selectedCustomerId,
code: newCustomerCode,
name: newCustomerName,
};
dispatch(updateCustomer(updatedCustomer) as any);
setIsUpdatingCustomer(false);
setSelectedCustomerId(null);
setNewCustomerCode("");
setNewCustomerName("");
}
};

const filteredCustomers = customers?.filter((customer: Customer) =>
customer.name.toLowerCase().includes(searchTerm.toLowerCase())
);
return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isAddingCustomer} onClose={handleCancelAddCustomer}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newCustomerCode}
                onChange={(e) => setNewCustomerCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveCustomer}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddCustomer}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUpdatingCustomer} onClose={handleCancelUpdateCustomer}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Customer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newCustomerCode}
                onChange={(e) => setNewCustomerCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={newCustomerName}
                onChange={(e) => setNewCustomerName(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateCustomer}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateCustomer}>
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
            onClick={handleAddCustomer}
            backgroundColor="#67C3D7"
          >
            Add Customer
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
            {filteredCustomers?.map((customer:any) => (
              <Tr
                key={customer.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{customer.id}</Td>
                <Td width="60px">{customer.code}</Td>
                <Td width="60px">{customer.name}</Td>
                <Td width="20px">
                  <IconButton
                    aria-label="View"
                    icon={<MdVisibility size={16} />}
                    colorScheme="teal"
                    onClick={() => handleView(customer.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Update"
                    icon={<MdEdit size={16} />}
                    colorScheme="blue"
                    onClick={() => handleUpdate(customer.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete size={16} />}
                    colorScheme="red"
                    onClick={() => handleDelete(customer.id)}
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

export default Table;
