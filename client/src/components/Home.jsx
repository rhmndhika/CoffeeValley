import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import Header from "./Header";

const Home = () => {
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
    <Box w={"100vw"}>
      <Header />
      {catalog.slice(0, 1).map((item) => {
        return (
          <Flex flexDirection="column" margin="10px">
          <Text fontWeight={"bold"}>Bean of the Day</Text>
          <Text>{item.bean}</Text>
          <Text fontWeight={"bold"}>Sale Price</Text>
          <Text>$ {item.price.toFixed(2)}</Text>
          <Text fontWeight={"bold"}>Description</Text>
          <Text maxW={"70%"} whiteSpace={"pre-wrap"}>
          {item.description}
          </Text>
          </Flex>
      )
      })}
    </Box>
  );
}

export default Home;