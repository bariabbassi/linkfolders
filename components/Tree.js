import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  List,
  ListItem,
  Link,
  Image,
  Button,
  Collapse,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Tree = ({ children }) => {
  return (
    <List w="100%" d="flex" flexDirection="column" align="stretch">
      {children?.map((child, index) => (
        <TreeNode key={index} child={child} index={index} />
      ))}
    </List>
  );
};

const TreeNode = ({ child, index }) => {
  const isLink = child.url ? true : false;
  const hasChildren = child.children ? true : false;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ListItem key={index} pl={6} w="100%">
      {isLink ? (
        <Box
          d="flex"
          alignItems="center"
          height="46px"
          pl={7}
          lineHeight="1.2"
          transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
          color="gray.600"
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
            boxSize="24px"
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
            height="46px"
            pl={3}
            lineHeight="1.2"
            transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
            color="gray.600"
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
              <Tree children={child.children} />
            </Collapse>
          )}
        </>
      )}
    </ListItem>
  );
};

export default Tree;
