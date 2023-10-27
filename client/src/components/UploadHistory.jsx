import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  Avatar,
  Image, 
} from "@chakra-ui/react";
import Header from './Header';

const UploadHistory = () => {

  const [documents, setDocuments] = useState([]);


    useEffect(() => {
        const getDocuments = async () => {
            try{
                const response = await axios.get("http://localhost:5000/document/get")
                setDocuments(response.data);
            } catch (err) {
                console.log(err);
            } 
        }
        getDocuments();
    }, [])

    console.log(documents)

  return (
    <Flex flexDirection="column">
        <Header />
        <Flex justifyContent="center" mt="20px">
          <TableContainer width="1000px" mt="20px">
            <Table variant='simple' size="sm">
              <Thead>
                <Tr>
                  <Th>Author</Th>
                  <Th>Title</Th>
                  <Th>Document</Th>
                </Tr>
              </Thead>
              <Tbody>
                {documents.map((item) => (
                  <Tr key={item._id}>
                    <Td
                      maxW={"200px"}
                      whiteSpace={"pre-wrap"}
                    >
                      {item.author.userID}
                    </Td>
                    <Td
                      maxW={"200px"}
                      whiteSpace={"pre-wrap"}
                    >
                      {item.title}
                    </Td>
                    <Td
                      maxW={"200px"}
                      whiteSpace={"pre-wrap"}
                    >
                       <Image boxSize="100px" size='md' src={item.documentFile} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
    </Flex>
  )
}

export default UploadHistory