import React from 'react';
import { Skeleton } from '@chakra-ui/react';

const TreeSkeleton = () => {
  return (
    <>
      <Skeleton height="10px" w="150px" m={6} />
      <Skeleton height="10px" w="125px" m={6} />
      <Skeleton height="10px" w="200px" m={6} />
      <Skeleton height="10px" w="175px" m={6} />
      <Skeleton height="10px" w="175px" m={6} />
    </>
  );
};

export default TreeSkeleton;
