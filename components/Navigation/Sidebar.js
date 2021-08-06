import { Box, CloseButton, Flex, Text, Button } from '@chakra-ui/react';

const Sidebar = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      w={{ base: 'full', md: 96 }}
      h="full"
      pos="fixed"
      {...rest}
    >
      <Flex align="center" justify="space-between" h="20" mx="8">
        <Text size="2xl">Linkfolders</Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Button w="100%">Home</Button>
      <Button w="100%">Home</Button>
      <Button w="100%">Home</Button>
    </Box>
  );
};

export default Sidebar;
