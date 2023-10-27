import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Header from './Header'

const OrderStatus = () => {
  return (
    <Flex flexDirection="column">
        <Header />
        <Text>Order Status</Text>
    </Flex>
  )
}

export default OrderStatus