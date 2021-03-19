import EditableItem from '@/components/editable-item';

const TreeNode = ({ children, ...otherProps }) => {
  const hasChildren = children !== undefined;

  const renderChildren = (children) => {
    return (
      <ul>
        {children.map((nodeProps) => {
          const { id, ...others } = nodeProps;
          return <TreeNode key={id} {...others} />;
        })}
      </ul>
    );
  };

  return (
    <li>
      <div className="TreeNode">
        <EditableItem {...otherProps} />
      </div>
      {hasChildren && renderChildren(children)}
    </li>
  );
};

export default TreeNode;
