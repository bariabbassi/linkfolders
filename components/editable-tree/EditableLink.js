import { Box, Flex, Image, IconButton, Input } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const EditableLink = (props) => {
  const { name, url, changeName, changeUrl, deleteLink } = props;

  return (
    <Box
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      height="88px"
      pl={3}
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      color="gray.600"
      _hover={{ bg: 'gray.100' }}
    >
      <Flex align="center">
        <Image
          boxSize="24px"
          src={`https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=32`}
          alt={name}
        />
        <Flex direction="column">
          <Input
            m={1}
            size="sm"
            placeholder="New link"
            value={name}
            onChange={(e) => {
              changeName(e.target.value);
            }}
          />
          <Input
            m={1}
            size="sm"
            placeholder="https://website.com"
            value={url}
            onChange={(e) => {
              changeUrl(e.target.value);
            }}
          />
        </Flex>
      </Flex>
      <IconButton
        size="sm"
        aria-label="Remove node"
        icon={<DeleteIcon />}
        onClick={deleteLink}
        value
      />
    </Box>
  );
};

export default EditableLink;
