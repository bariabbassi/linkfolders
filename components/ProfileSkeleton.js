import {
  Flex,
  Box,
  Stack,
  List,
  Skeleton,
  SkeletonCircle
} from '@chakra-ui/react';

const Link = () => (
  <Flex
    align="center"
    w="100%"
    maxW="550px"
    borderWidth="1px"
    borderRadius="lg"
    overflow="hidden"
  >
    <Skeleton height="30px" w="30px" m={3} ml={8} />
    <Skeleton height="10px" w="250px" mr="200px" />
  </Flex>
);

const TreeSkeleton = () => {
  return (
    <Flex mb={5} direction="column" align="center">
      <Box m={3} mb={10}>
        <Stack spacing={3} w="100%" maxW="550px">
          {[...Array(4)].map((e, i) => (
            <Link key={i} />
          ))}
        </Stack>
      </Box>
    </Flex>
  );
};

export default TreeSkeleton;
