import { Box, Flex, Image, Heading, IconButton, Input } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const EditableLink = (props) => {
  const { name, url, changeName, changeUrl, deleteLink } = props;

  return (
    <Box
      p={3}
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      lineHeight="1.2"
      borderRadius="base"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      color="gray.600"
      _hover={{ bg: 'gray.100' }}
    >
      <Flex align="center">
        {url === 'https://' ? (
          <Heading m={2} mr={3} as="h2" size="sm" pl={1}>
            🔗
          </Heading>
        ) : (
          <Image
            m={2}
            mr={4}
            boxSize="24px"
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${url}&sz=32`}
            alt={name}
          />
        )}

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
        m={1}
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
