import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableCaption,
  Tfoot,
  Text,
  Flex,
  Center, 
} from "@chakra-ui/react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";


const Catalog = () => {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    const getCatalogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/catalog/get/all");
        setCatalog(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCatalogs();
  }, []);

  return (
    <Flex flexDirection="column">
      <Header />
      <Center>
        <TableContainer width="1000px" mt="20px">
          <Table variant='simple' size="sm">
            <Thead>
              <Tr>
                <Th>Bean</Th>
                <Th>Description</Th>
                <Th>Price/Unit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {catalog.map((item) => (
                <Tr key={item._id}>
                  <Td
                    maxW={"200px"}
                    whiteSpace={"pre-wrap"}
                  >
                    {item.bean}
                  </Td>
                  <Td
                    maxW={"200px"}
                    whiteSpace={"pre-wrap"}
                  >
                    {item.description}
                  </Td>
                  <Td
                    maxW={"200px"}
                    whiteSpace={"pre-wrap"}
                  >
                    {item.price !== undefined && <Text>$ {item.price.toFixed(2)}</Text>}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Center>
    </Flex>
  );
}

export default Catalog;
