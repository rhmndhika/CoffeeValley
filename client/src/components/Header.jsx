import { Box, Flex, Heading, Image, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CF from "../assets/CF.png"
import Cookies from 'js-cookie';

function Header() {

  const navigate = useNavigate();
  const toast = useToast();
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('userID');
    Cookies.remove('username');
    toast({
      title: "Logging Out",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setTimeout(() => {
      navigate("/", { replace : true });
    }, 3000)
  };
  return (
    <Box>
      <Flex>
        <Box w={"100px"} m={5}>
          <Image src={CF} />
        </Box>
        <Box mt={4}>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Coffee Valley
          </Heading>
          <Text>Taste the love in every cup!</Text>
          <Text>One Alewife Center 3rd Floor</Text>
          <Text>Cambridge, MA 02140</Text>
        </Box>
      </Flex>
      <SimpleGrid
        columns={6}
        spacing={10}
        textAlign={"center"}
        py={3}
        bg={"red"}
        color={"white"}
      >
        <Link to={"/home"}>
          <Box >
            <Text>Home</Text>
          </Box>
        </Link>
        <Link to={"/catalog"}>
          <Box>
            <Text>Catalog</Text>
          </Box>
        </Link>
        <Link to={"/order"}>
          <Box>
            <Text>Order Status</Text>
          </Box>
        </Link>
        <Link to={"/distributor"}>
          <Box>
            <Text>Distributor</Text>
          </Box>
        </Link>
        <Link to={"/upload"}>
          <Box>
            <Text>Upload</Text>
          </Box>
        </Link>
        <Box onClick={logout} _hover={{ cursor: "pointer" }}>
          <Text>Logout</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default Header;