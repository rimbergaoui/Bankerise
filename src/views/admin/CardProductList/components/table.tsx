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
  fetchCardProductLists,
  createCardProductList,
  updateCardProductList,
  deleteCardProductList,
} from "store/CardProductList/CardProductListActions";

export interface CardProductList {
  id: number;
  abrvWording: string;
  wording: string;
  limitIndex: string;
  onPerToAmount: number;
  productCode: string;
  plasticitype: string;
}

const Table: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingCardProductList, setIsAddingCardProductList] = useState(false);
  const [isUpdatingCardProductList, setIsUpdatingCardProductList] =
    useState(false);
  const [newCardProductListAbrvWording, setNewCardProductListAbrvWording] =
    useState("");
  const [newCardProductListWording, setNewCardProductListWording] =
    useState("");
  const [newLimitIndex, setNewLimitIndex] = useState("");
  const [newOnPerToAmount, setNewOnPerToAmount] = useState<number>(0);
  const [newProductCode, setNewProductCode] = useState("");
  const [newPlasticiType, setNewPlasticiType] = useState("");
  const [selectedCardProductListId, setSelectedCardProductListId] = useState<
    number | null
  >(null);

  const cardProductLists = useSelector(
    (state: any) => state?.cardProductLists?.cardProductLists
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardProductLists() as any);
  }, [dispatch]);

  const handleDelete = (cardProductListId: string) => {
    dispatch(deleteCardProductList(cardProductListId) as any);
  };

  const handleView = (cardProductListId: number) => {
    console.log(
      `Voir la liste de produits de carte avec l'ID ${cardProductListId}`
    );
  };

  const handleUpdate = (cardProductListId: number) => {
    setSelectedCardProductListId(cardProductListId);
    setIsUpdatingCardProductList(true);
    const selectedCardProductList = cardProductLists.find(
      (cardProductList: CardProductList) =>
        cardProductList.id === cardProductListId
    );
    if (selectedCardProductList) {
      setNewCardProductListAbrvWording(selectedCardProductList.abrvWording);
      setNewCardProductListWording(selectedCardProductList.wording);
      setNewLimitIndex(selectedCardProductList.limitIndex);
      setNewOnPerToAmount(selectedCardProductList.onPerToAmount);
      setNewProductCode(selectedCardProductList.productCode);
      setNewPlasticiType(selectedCardProductList.plasticitype);
    }
  };

  const handleAddCardProductList = () => {
    setIsAddingCardProductList(true);
  };

  const handleCancelAddCardProductList = () => {
    setIsAddingCardProductList(false);
    setNewCardProductListAbrvWording("");
    setNewCardProductListWording("");
    setNewLimitIndex("");
    setNewProductCode("");
    setNewPlasticiType("");
  };

  const handleCancelUpdateCardProductList = () => {
    setIsUpdatingCardProductList(false);
    setSelectedCardProductListId(null);
    setNewCardProductListAbrvWording("");
    setNewCardProductListWording("");
    setNewLimitIndex("");
    setNewProductCode("");
    setNewPlasticiType("");
  };

  const handleSaveCardProductList = () => {
    const newCardProductList: CardProductList = {
      id: cardProductLists.length + 1,
      abrvWording: newCardProductListAbrvWording,
      wording: newCardProductListWording,
      limitIndex: newLimitIndex,
      onPerToAmount: Number(newOnPerToAmount),
      productCode: newProductCode,
      plasticitype: newPlasticiType,
    };
    dispatch(createCardProductList(newCardProductList) as any);
    setIsAddingCardProductList(false);
    setNewCardProductListAbrvWording("");
    setNewCardProductListWording("");
    setNewLimitIndex("");
    setNewProductCode("");
    setNewPlasticiType("");
  };

  const handleUpdateCardProductList = () => {
    if (selectedCardProductListId) {
      const updatedCardProductList: CardProductList = {
        id: selectedCardProductListId,
        abrvWording: newCardProductListAbrvWording,
        wording: newCardProductListWording,
        limitIndex: newLimitIndex,
        onPerToAmount: 0,
        productCode: newProductCode,
        plasticitype: newPlasticiType,
      };
      dispatch(updateCardProductList(updatedCardProductList) as any);
      setIsUpdatingCardProductList(false);
      setSelectedCardProductListId(null);
      setNewCardProductListAbrvWording("");
      setNewCardProductListWording("");
      setNewLimitIndex("");
      setNewProductCode("");
      setNewPlasticiType("");
    }
  };

  const filteredCardProductLists = cardProductLists?.filter(
    (cardProductList: CardProductList) =>
      cardProductList?.wording?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Modal
        isOpen={isAddingCardProductList}
        onClose={handleCancelAddCardProductList}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Card Product List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="abrvWording">Abbreviated Wording:</label>
              <input
                type="text"
                id="abrvWording"
                value={newCardProductListAbrvWording}
                onChange={(e) =>
                  setNewCardProductListAbrvWording(e.target.value)
                }
                required
              />
            </div>
            <div>
              <label htmlFor="wording">Wording:</label>
              <input
                type="text"
                id="wording"
                value={newCardProductListWording}
                onChange={(e) => setNewCardProductListWording(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="limitIndex">Limit Index:</label>
              <input
                type="text"
                id="limitIndex"
                value={newLimitIndex}
                onChange={(e) =>
                  setNewLimitIndex(e.target.value)
                }
                required
              />
            </div>
            <div>
              <label htmlFor="onPerToAmount">On Per To Amount:</label>
              <input
                type="number"
                id="onPerToAmount"
                value={newOnPerToAmount}
                onChange={(e) =>
                  setNewOnPerToAmount(Number(e.target.value))
                }
                required
              />
            </div>
            <div>
              <label htmlFor="productCode">Product Code:</label>
              <input
                type="text"
                id="productCode"
                value={newProductCode}
                onChange={(e) =>
                  setNewProductCode(e.target.value)
                }
                required
              />
            </div>
            <div>
              <label htmlFor="plasticitype">Plastic Type:</label>
              <input
                type="text"
                id="plasticitype"
                value={newPlasticiType}
                onChange={(e) =>
                  setNewPlasticiType(e.target.value)
                }
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSaveCardProductList}>
              Save
            </Button>
            <Button colorScheme="gray" onClick={handleCancelAddCardProductList}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isUpdatingCardProductList}
        onClose={handleCancelUpdateCardProductList}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Card Product List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <label htmlFor="abrvWording">Abbreviated Wording:</label>
              <input
                type="text"
                id="abrvWording"
                value={newCardProductListAbrvWording}
                onChange={(e) =>
                  setNewCardProductListAbrvWording(e.target.value)
                }
                required
              />
            </div>
            <div>
              <label htmlFor="wording">Wording:</label>
              <input
                type="text"
                id="wording"
                value={newCardProductListWording}
                onChange={(e) => setNewCardProductListWording(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="limitIndex">Limit Index:</label>
              <input
                type="text"
                id="limitIndex"
                value={newLimitIndex}
                onChange={(e) =>
                  setNewLimitIndex(e.target.value)
                }
                required
              />
            </div>
            <div>
              <label htmlFor="onPerToAmount">On Per To Amount:</label>
              <input
                type="number"
                id="onPerToAmount"
                value={newOnPerToAmount}
                onChange={(e) =>
                  setNewOnPerToAmount(Number(e.target.value))
                }
                required
              />
            </div>
            <div>
              <label htmlFor="productCode">Product Code:</label>
              <input
                type="text"
                id="productCode"
                value={newProductCode}
                onChange={(e) =>
                  setNewProductCode(e.target.value)
                }
                required
              />
            </div>
            <div>
              <label htmlFor="plasticitype">Plastic Type:</label>
              <input
                type="text"
                id="plasticitype"
                value={newPlasticiType}
                onChange={(e) =>
                  setNewPlasticiType(e.target.value)
                }
                required
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateCardProductList}>
              Update
            </Button>
            <Button
              colorScheme="gray"
              onClick={handleCancelUpdateCardProductList}
            >
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
            onClick={handleAddCardProductList}
            backgroundColor="#67C3D7"
          >
            Add Card Product List
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
              <Th>Abbreviated Wording</Th>
              <Th>Wording</Th>
              <Th>Limit Index</Th>
              <Th>On Per To Amount</Th>
              <Th>Product Code</Th>
              <Th>Plastic Type</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCardProductLists?.map((cardProductList: any) => (
              <Tr
                key={cardProductList.id}
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
              >
                <Td width="20px">{cardProductList.id}</Td>
                <Td width="60px">{cardProductList.abrvWording}</Td>
                <Td width="60px">{cardProductList.wording}</Td>
                <Td width="60px">{cardProductList.limitIndex}</Td>
                <Td width="60px">{cardProductList.onPerToAmount}</Td>
                <Td width="60px">{cardProductList.productCode}</Td>
                <Td width="60px">{cardProductList.plasticitype}</Td>
                <Td width="20px">
                  <IconButton
                    aria-label="View"
                    icon={<MdVisibility size={16} />}
                    colorScheme="teal"
                    onClick={() => handleView(cardProductList.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Update"
                    icon={<MdEdit size={16} />}
                    colorScheme="blue"
                    onClick={() => handleUpdate(cardProductList.id)}
                    size="sm"
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<MdDelete size={16} />}
                    colorScheme="red"
                    onClick={() => handleDelete(cardProductList.id)}
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
