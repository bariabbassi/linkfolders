import { Box, List, ListItem, Collapse, Heading } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import Image from 'next/image';

import { LinkfoldersIcon } from '@/styles/icons';

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
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          my={2}
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
            src={`https://s2.googleusercontent.com/s2/favicons?domain=${child.url}&sz=32`}
            alt={child.name}
            width="32px"
            height="32px"
          />
          <Heading as="h2" size="sm" pl={3}>
            {child.name}
          </Heading>
        </Box>
      ) : (
        <>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            my={2}
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
            <LinkfoldersIcon width="6" height="6" ml={2} mb={1} />
            <Heading as="h2" size="sm" pl={3}>
              {child.name}
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
