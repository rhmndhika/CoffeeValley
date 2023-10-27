import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Box,
  Button,
  Input,
  Select,
  Flex,
  Alert, 
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast 
} from "@chakra-ui/react";
import axios from "axios";
import Header from "./Header";

function AddDistributor() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !city || !state || !country || !phone || !email) {
      setShowAlert(true);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/distributor/add", {
        name: name,
        city: city,
        state: state,
        country: country,
        phone: phone,
        email: email,
      });
  
      if (response.status === 200) {
        toast({
            title: "Success",
            description: "Form submitted successfully!",
            status: "success",
            duration: 3000, 
            isClosable: true, 
          });

          setTimeout(() => {
            window.location.reload();
          }, 3000)
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <Flex flexDirection="column">
        <Header />
        <Box maxW={"30%"} m={5}>
        <form onSubmit={handleSubmit}>

            {showAlert && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                <AlertTitle mr={2}>Alert Title</AlertTitle>
                <AlertDescription>One or more required fields are empty.</AlertDescription>
              </Alert>
            )}

            <FormControl>
            <FormLabel>Distributor Name</FormLabel>
            <Input type="text" onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
            <FormLabel>City</FormLabel>
            <Input type="text" onChange={(e) => setCity(e.target.value)} />
            </FormControl>
            <FormControl>
            <FormLabel>State/Region</FormLabel>
            <Input type="text" onChange={(e) => setState(e.target.value)} />
            </FormControl>
            <FormControl>
            <FormLabel>Country</FormLabel>
            <Select
                placeholder="Select country"
                onChange={(e) => setCountry(e.target.value)}
            >
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="United States">United States</option>
                <option value="The Netherlands">The Netherlands</option>
            </Select>
            </FormControl>
            <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input type="number" onChange={(e) => setPhone(e.target.value)} />
            </FormControl>
            <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <Button my={5} type="submit">
                Submit
            </Button>
        </form>
        </Box>
    </Flex>
  );
}

export default AddDistributor