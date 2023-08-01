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
fetchCountries,
createCountry,
updateCountry,
deleteCountry,
} from "store/Country/CountryActions";

export interface Country {
id: number;
code: string;
label: string;
}

const Table: React.FC = () => {
const [searchTerm, setSearchTerm] = useState("");
const [isAddingCountry, setIsAddingCountry] = useState(false);
const [isUpdatingCountry, setIsUpdatingCountry] = useState(false);
const [newCountryCode, setNewCountryCode] = useState("");
const [newCountryLabel, setNewCountryLabel] = useState("");
const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);

const countries = useSelector((state: any) => state?.countries?.countries);
const dispatch = useDispatch();

useEffect(() => {
dispatch(fetchCountries() as any);
}, [dispatch]);

const handleDelete = (countryId: string) => {
dispatch(deleteCountry(countryId) as any);
};

const handleView = (countryId: number) => {
console.log(`Voir le pays avec l'ID ${countryId}`);
};

const handleUpdate = (countryId: number) => {
setSelectedCountryId(countryId);
setIsUpdatingCountry(true);
const selectedCountry = countries.find((country: Country) => country.id === countryId);
if (selectedCountry) {
setNewCountryCode(selectedCountry.code);
setNewCountryLabel(selectedCountry.label);
}
};

const handleAddCountry = () => {
setIsAddingCountry(true);
};

const handleCancelAddCountry = () => {
setIsAddingCountry(false);
setNewCountryCode("");
setNewCountryLabel("");
};

const handleCancelUpdateCountry = () => {
setIsUpdatingCountry(false);
setSelectedCountryId(null);
setNewCountryCode("");
setNewCountryLabel("");
};

const handleSaveCountry = () => {
const newCountry: Country = {
id: countries.length + 1,
code: newCountryCode,
label: newCountryLabel,
};
dispatch(createCountry(newCountry) as any);
setIsAddingCountry(false);
setNewCountryCode("");
setNewCountryLabel("");
};

const handleUpdateCountry = () => {
if (selectedCountryId) {
const updatedCountry: Country = {
id: selectedCountryId,
code: newCountryCode,
label: newCountryLabel,
};
dispatch(updateCountry(updatedCountry) as any);
setIsUpdatingCountry(false);
setSelectedCountryId(null);
setNewCountryCode("");
setNewCountryLabel("");
}
};

const filteredCountries = countries?.filter((country: Country) =>
country.label.toLowerCase().includes(searchTerm.toLowerCase())
);
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal isOpen={isAddingCountry} onClose={handleCancelAddCountry}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Country</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newCountryCode}
                onChange={(e) => setNewCountryCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="label">Label:</label>
              <input
                type="text"
                id="label"
                value={newCountryLabel}
                onChange={(e) => setNewCountryLabel(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveCountry}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddCountry}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isUpdatingCountry} onClose={handleCancelUpdateCountry}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Country</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="code">Code:</label>
              <input
                type="text"
                id="code"
                value={newCountryCode}
                onChange={(e) => setNewCountryCode(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="label">Label:</label>
              <input
                type="text"
                id="label"
                value={newCountryLabel}
                onChange={(e) => setNewCountryLabel(e.target.value)}
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateCountry}>
              Update
            </Button>
            <Button colorScheme="gray" onClick={handleCancelUpdateCountry}>
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
            onClick={handleAddCountry}
            backgroundColor="#67C3D7"
          >
            Add Country
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
              <Th>Label</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCountries?.map((country : any) => (
              <Tr
                key={country.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{country.id}</Td>
                <Td width="60px">{country.code}</Td>
                <Td width="60px">{country.label}</Td>
                <Td width="20px">
                  <IconButton
                    aria-label="View"
                    icon={<MdVisibility size={16} />}
                    colorScheme="teal"
                    onClick={() => handleView(country.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Update"
                    icon={<MdEdit size={16} />}
                    colorScheme="blue"
                    onClick={() => handleUpdate(country.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete size={16} />}
                    colorScheme="red"
                    onClick={() => handleDelete(country.id)}
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
