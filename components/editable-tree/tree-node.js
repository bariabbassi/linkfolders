import { List } from '@chakra-ui/react';
import EditableLink from '@/components/editable-tree/EditableLink';
import EditableFolder from '@/components/editable-tree/EditableFolder';

const TreeNode = ({ children, ...otherProps }) => {
  const hasChildren = children !== undefined;

  const renderChildren = (children) => {
    return (
      <List pl={7}>
        {children.map((nodeProps) => {
          const { id, ...others } = nodeProps;
          return <TreeNode key={id} {...others} />;
        })}
      </List>
    );
  };

  return (
    <li>
      <div className="TreeNode">
        {{ ...otherProps }.url ? (
          <EditableLink {...otherProps} />
        ) : (
          <EditableFolder {...otherProps} />
        )}
      </div>
      {hasChildren && renderChildren(children)}
    </li>
  );
};

export default TreeNode;
