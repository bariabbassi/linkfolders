import {
  Box,
  Flex,
  Heading,
  Button,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack
} from '@chakra-ui/react';
import * as React from 'react';
import { CheckIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';
import { createCheckoutSession } from '@/lib/db';

const PricingCard = ({ name, price, model, features, isHighlited }) => {
  const auth = useAuth();
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);

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
        {isHighlited ? (
          <Button
            variant="solid"
            colorScheme="yellow"
            isLoading={isCheckoutLoading}
            onClick={() => {
              setCheckoutLoading(true);
              createCheckoutSession(auth.user?.uid);
            }}
          >
            Select
          </Button>
        ) : (
          <NextLink href="/profile" passHref>
            <Button as="a" variant="solid" colorScheme="yellow">
              Select
            </Button>
          </NextLink>
        )}
      </Flex>
    </Flex>
  );
};

export default PricingCard;
