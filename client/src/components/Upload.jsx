import React, { useState } from 'react'
import { 
  Flex,
  FormControl,
  FormLabel,
  Box,
  Button,
  Input, 
  Toast,
  useToast
} from '@chakra-ui/react'
import Header from './Header'
import Cookies from 'js-cookie';
import axios from "axios";
import { Link } from 'react-router-dom';

const Upload = () => {

  const accessToken = Cookies.get('token');
  const username = Cookies.get('username');
  const userID = Cookies.get('userID');
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [documentFile, setDocumentFile] = useState(null); 
  const [author, setAuthor] = useState();

  const handleImageChange = (event) => {
    const file = event.target.files[0]; 
    setDocumentFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('documentFile', documentFile); 
      formData.append('author', userID); 
      
      await axios.post('http://localhost:5000/document/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }).then((response) => {
        toast({
          title: 'Dokumen berhasil ditambahkan.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
            window.location.reload()
        }, 2000)
      });
    } catch (err) {
      toast({
        title: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  };

  return (
    <Flex flexDirection="column">
        <Header />
        <Box maxW={"50%"} my={10} margin="20px">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input type="text" onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Document File</FormLabel>
              <Input type="file" onChange={handleImageChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input type="text" value={userID} />
            </FormControl>
            <Button mt="15px" type="submit">Add Document</Button>
          </form>

          <Link to="/upload/history">
            <Button mt="20px">Upload History</Button>
          </Link>
      </Box>
    </Flex>
  )
}

export default Upload