import React, { lazy, Suspense, useEffect} from 'react';
import { Spinner } from '@chakra-ui/react';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CoffeeValey from './components/CoffeeValey';
import Catalog from './components/Catalog';
import Home from './components/Home';
import Cookies from 'js-cookie';
import Login from './components/Login';
import Header from './components/Header';
import Distributor from './components/Distributor';
import EditDistributor from './components/EditDistributor';
import AddDistributor from './components/AddDistributor';
import OrderStatus from './components/OrderStatus';
import Upload from './components/Upload';
import ProtectedRoutes from './ProtectedRoutes';
import UploadHistory from './components/UploadHistory';

function App() {

  return (
    <ChakraProvider>
        <BrowserRouter>
        <Suspense fallback={
          <div style={{display : "flex", justifyContent : "center", alignItems : "center", height: "100%", marginTop : "300px"}}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
            />
          </div>}>
          <Routes>
            <Route path='/' element={
                <Login />
            } />
            <Route
                path="/index"
                element={
                  <ProtectedRoutes>
                    <CoffeeValey />
                  </ProtectedRoutes>
                }
              />
            {/* <Route path='/index' element={<CoffeeValey />} /> */}
            <Route
                path="/home"
                element={
                  <ProtectedRoutes>
                    <Home />
                  </ProtectedRoutes>
                }
              />
            {/* <Route path='/home' element={
                <Home />
            } /> */}
             <Route
                path="/catalog"
                element={
                  <ProtectedRoutes>
                    <Catalog />
                  </ProtectedRoutes>
                }
              />
            {/* <Route path='/catalog' element={
                <Catalog />
            } /> */}
             <Route
                path="/order"
                element={
                  <ProtectedRoutes>
                    <OrderStatus />
                  </ProtectedRoutes>
                }
              />
            {/* <Route path='/order' element={<OrderStatus />} /> */}
            <Route
                path="/distributor"
                element={
                  <ProtectedRoutes>
                    <Distributor />
                  </ProtectedRoutes>
                }
              />
            {/* <Route path='/distributor' element={<Distributor />} /> */}
            <Route path='/distributor/edit/:id' element={<EditDistributor />} />
            <Route
                path="/distributor/add"
                element={
                  <ProtectedRoutes>
                    <AddDistributor />
                  </ProtectedRoutes>
                }
              />
            {/* <Route path='/distributor/add' element={<AddDistributor />} /> */}
            <Route
                path="/upload"
                element={
                  <ProtectedRoutes>
                    <Upload />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/upload/history"
                element={
                  <ProtectedRoutes>
                    <UploadHistory />
                  </ProtectedRoutes>
                }
              />
            {/* <Route path='/upload' element={<Upload />} /> */}
          </Routes>
        </Suspense>
        </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
