import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  Button,
  Collapse,
  Flex,
  Heading
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

import LinkEdit from '@/components/LinkEdit';
import FolderEdit from '@/components/FolderEdit';

const TreeEdit = ({ children, setChildren }) => {
  return (
    <List w="100%" d="flex" flexDirection="column" align="stretch">
      {children?.map((child, index) => (
        <TreeEditNode key={index} index={index} child={child} />
      ))}
    </List>
  );
};

const TreeEditNode = ({ index, child }) => {
  const isLink = child.url ? true : false;
  const hasChildren = child.children ? true : false;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ListItem key={index} pl={6} w="100%">
      {isLink ? (
        <LinkEdit index={index} name={child.name} link={child.url} />
      ) : (
        <>
          <Box
            d="flex"
            alignItems="center"
            height="46px"
            pl={3}
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            color="gray.600"
            bg="white"
            cursor="grab"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.200',
              transform: 'scale(0.98)'
            }}
            _focus={{
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
            }}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            <Heading as="h2" size="sm" pl={1}>
              📂 &nbsp; {child.name}
            </Heading>
          </Box>
          {hasChildren && (
            <Collapse in={isOpen}>
              <TreeEdit children={child.children} />
            </Collapse>
          )}
        </>
      )}
    </ListItem>
  );
};

export default TreeEdit;
