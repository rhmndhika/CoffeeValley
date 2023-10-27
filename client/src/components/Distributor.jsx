import React, { useState, useEffect} from 'react'
import axios from 'axios';
import { 
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Flex, 
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Distributor = () => {
    const [distributors, setDistributors] = useState([]);

    useEffect(() => {
      const getDistributors = async () => {
        try {
          const response = await axios.get("http://localhost:5000/distributor/get/all");
          setDistributors(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      getDistributors();
    }, []);

  return (
    <Flex flexDirection="column">
      <Header />
      <TableContainer>
      <Table variant='simple' size="sm" mt="20px">
        <Thead>
          <Tr>
            <Th>Distributor Name</Th>
            <Th>City</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
        {distributors.map((item) => (
                <Tr key={item._id}>
                  <Td
                    maxW={"200px"}
                    whiteSpace={"pre-wrap"}
                  >
                    {item.name}
                  </Td>
                  <Td
                    maxW={"200px"}
                    whiteSpace={"pre-wrap"}
                  >
                    {item.city}
                  </Td>
                  <Td
                    maxW={"200px"}
                    whiteSpace={"pre-wrap"}
                  >
                    <Link to={`/distributor/edit/${item._id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
        </Tbody>
      </Table>
      </TableContainer>

      <Flex m="20px">
        <Link to="/distributor/add">
          <Button>Add</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Distributor