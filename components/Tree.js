import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  Image,
  Collapse,
  Heading
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Tree = ({ children }) => {
  return (
    <List>
      {children !== undefined &&
        children.length > 0 &&
        children.map((child, index) => (
          <TreeNode key={index} child={child} index={index} />
        ))}
    </List>
  );
};

const TreeNode = ({ child, index }) => {
  const isLink = child.url !== undefined;
  const hasChildren = child.children !== undefined;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ListItem key={index}>
      {isLink ? (
        <Box
          d="flex"
          alignItems="center"
          height="57px"
          px={7}
          py={1}
          borderRadius="base"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          cursor="pointer"
          _hover={{ bg: 'gray.100' }}
          _active={{
            bg: 'gray.200',
            transform: 'scale(0.98)'
          }}
          _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)'
          }}
          onClick={() => window.open(`${child.url}`)}
        >
          <Image
            w="30px"
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${child.url}&sz=32`}
            alt={child.name}
          />
          <Heading as="h2" size="sm" pl={3}>
            {child.name}
          </Heading>
        </Box>
      ) : (
        <>
          <Box
            d="flex"
            alignItems="center"
            height="57px"
            px={3}
            py={1}
            lineHeight="1.2"
            borderRadius="base"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            cursor="pointer"
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
              <List pl={6}>
                <Tree children={child.children} />
              </List>
            </Collapse>
          )}
        </>
      )}
    </ListItem>
  );
};

export default Tree;
