import {
  Box,
  Flex,
  Avatar,
  AvatarBadge,
  Heading,
  IconButton,
  Input
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const EditableProfileHeader = (props) => {
  const {
    name,
    username,
    photoUrl,
    changeProfileName,
    changeProfileUsername
  } = props;

  return (
    <Flex direction="column" align="center">
      <Avatar mb={3} size="2xl" name={name} src={photoUrl}>
        <AvatarBadge border="none" p={4}>
          <IconButton size="sm" color="gray.700" icon={<EditIcon />} />
        </AvatarBadge>
      </Avatar>
      <Input mb={3} size="md" value={name} onChange={changeProfileName} />
      <Input
        mb={3}
        size="sm"
        value={username}
        onChange={changeProfileUsername}
      />
    </Flex>
  );
};

export default EditableProfileHeader;
