import React, { Component } from 'react';
import { IconButton, Button } from '@chakra-ui/react';
import styled from 'styled-components';
import Navigation, { AkNavigationItem } from '@atlaskit/navigation';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition
} from '@atlaskit/tree';
import { complexTree } from '../tree/mockdata/complexTree.ts';

const Container = styled.div`
  display: flex;
`;

const Dot = styled.span`
  display: flex;
  width: 24px;
  height: 32px;
  justify-content: center;
  font-size: 12px;
  line-height: 32px;
`;

type State = {
  tree: TreeData;
};

export default class AtlasTree extends Component<void, State> {
  state = {
    tree: complexTree
  };

  static getIcon(
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void
  ) {
    if (item.children && item.children.length > 0) {
      return item.isExpanded ? (
        <IconButton
          aria-label="Cheveron down"
          icon={<ChevronDownIcon />}
          onClick={() => onCollapse(item.id)}
        />
      ) : (
        <IconButton
          aria-label="Cheveron right"
          icon={<ChevronRightIcon />}
          onClick={() => onExpand(item.id)}
        />
      );
    }
    return <Dot>&bull;</Dot>;
  }

  renderItem = ({
    item,
    onExpand,
    onCollapse,
    provided,
    snapshot
  }: RenderItemParams) => {
    return (
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <AkNavigationItem
          isDragging={snapshot.isDragging}
          text={item.data ? item.data.title : ''}
          icon={AtlasTree.getIcon(item, onExpand, onCollapse)}
          dnd={{ dragHandleProps: provided.dragHandleProps }}
        />
      </div>
    );
  };

  onExpand = (itemId: ItemId) => {
    const { tree }: State = this.state;
    this.setState({
      tree: mutateTree(tree, itemId, { isExpanded: true })
    });
  };

  onCollapse = (itemId: ItemId) => {
    const { tree }: State = this.state;
    this.setState({
      tree: mutateTree(tree, itemId, { isExpanded: false })
    });
  };

  onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    const { tree } = this.state;

    if (!destination) {
      return;
    }

    const newTree = moveItemOnTree(tree, source, destination);
    this.setState({
      tree: newTree
    });
  };

  render() {
    const { tree } = this.state;

    return (
      <Container>
        <Navigation>
          <Tree
            tree={tree}
            renderItem={this.renderItem}
            onExpand={this.onExpand}
            onCollapse={this.onCollapse}
            onDragEnd={this.onDragEnd}
            isDragEnabled
            isNestingEnabled
          />
        </Navigation>
      </Container>
    );
  }
}
