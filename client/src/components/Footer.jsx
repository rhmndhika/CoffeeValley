import {
    Box,
    Container,
    Stack,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React, { useState, useEffect } from "react";
  
  export default function Footer() {
    const [currentDate, setCurrentDate] = useState(new Date());
    useEffect(() => {
      setCurrentDate(new Date());
    }, []);
  
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return (
      <Box mx={"auto"} textAlign={"center"}>
        <Text>{formattedDate}</Text>
      </Box>
    );
  }