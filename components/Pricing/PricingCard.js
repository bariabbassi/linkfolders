import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import * as React from 'react';
import { CheckIcon } from '@chakra-ui/icons';

const PricingCard = ({ name, price, model, features, isHighlited }) => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      position="relative"
      borderColor={isHighlited ? 'currentcolor' : null}
      bg={isHighlited ? 'rgba(0, 0, 0, 0.1)' : null}
      borderWidth={isHighlited ? '2px' : '1px'}
      borderRadius="lg"
      overflow="hidden"
      px="9"
      pb="6"
      pt="4"
      overflow="hidden"
      maxW="md"
      width="100%"
      rounded={{
        sm: 'xl'
      }}
    >
      <Box p={4}>
        <VStack spacing={6}>
          <Heading size="md" fontWeight="extrabold">
            {name}
          </Heading>
        </VStack>
        <Flex align="flex-end" justify="center" fontWeight="extrabold" my="8">
          <Heading size="3xl" fontWeight="inherit" lineHeight="0.9em">
            {price}
          </Heading>
          <Text fontWeight="inherit" fontSize="2xl">
            {model}
          </Text>
        </Flex>
        <List spacing="4" mb="8" maxW="28ch" mx="auto">
          {features.map((feature, index) => (
            <ListItem fontWeight="medium" key={index}>
              <ListIcon fontSize="xl" as={CheckIcon} marginEnd={2} />
              {feature}
            </ListItem>
          ))}
        </List>
      </Box>
      <Flex w="100%" justify="center">
        <Button variant="solid" colorScheme="yellow">
          Sign up
        </Button>
      </Flex>
    </Flex>
  );
};

export default PricingCard;
