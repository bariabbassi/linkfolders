import { Flex, Box, List, Skeleton, SkeletonCircle } from '@chakra-ui/react';

const Link = () => (
  <Box mt={3} mb={10} borderWidth="1px" borderRadius="lg" overflow="hidden">
    <Skeleton height="10px" w="400px" m={10} />
  </Box>
);

const TreeSkeleton = () => {
  return (
    <Flex mb={5} direction="column" align="center">
      <SkeletonCircle m={6} size="100px" />
      <Skeleton height="15px" w="200px" m={3} />
      <Skeleton height="13px" w="200px" m={3} mb={15} />
      <Box m={3} mb={10}>
        <List>
          {[...Array(10)].map((e, i) => (
            <Link key={i} />
          ))}
        </List>
      </Box>
    </Flex>
  );
};

export default TreeSkeleton;
