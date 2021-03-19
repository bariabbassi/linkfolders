import { Component } from 'react';
import TreeNode from '@/components/editable-tree/tree-node';
import AddButton from '@/components/editable-tree/add-button';
import ControlPanel from '@/components/editable-tree/control-panel';
import TextView from '@/components/editable-tree/text-view';
// import '@/styles/tree.css';

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: this.initializedСopy(this.props.data),
      savedNodes: []
    };
    this.changeName = this.changeName.bind(this);
    this.addRootElement = this.addRootElement.bind(this);
    this.addChild = this.addChild.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.saveState = this.saveState.bind(this);
    this.loadState = this.loadState.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.nodesToString = this.nodesToString.bind(this);
  }

  initializedСopy(nodes, location) {
    const nodesCopy = [];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].url) {
        const { name, url } = nodes[i];
        const id = location ? `${location}.${i + 1}` : `${i + 1}`;
        nodesCopy[i] = {
          id,
          name,
          url,
          changeName: this.changeName(id),
          removeNode: this.removeNode(id),
          addChild: this.addChild(id)
        };
      } else {
        const { name, children } = nodes[i];
        const hasChildren = children !== undefined;
        const id = location ? `${location}.${i + 1}` : `${i + 1}`;
        nodesCopy[i] = {
          id,
          name,
          children: hasChildren
            ? this.initializedСopy(children, id)
            : undefined,
          changeName: this.changeName(id),
          removeNode: this.removeNode(id),
          addChild: this.addChild(id)
        };
      }

      // } else {
      //   nodesCopy[i] = {
      //     children: hasChildren
      //       ? this.initializedСopy(children, id)
      //       : undefined,
      //     changeName: this.changeName(id),
      //     removeNode: this.removeNode(id),
      //     addChild: this.addChild(id),
      //     id,
      //     name
      //   };
      // }
    }
    return nodesCopy;
  }

  changeName(id) {
    return (newName) => {
      id = id.split('.').map((str) => parseInt(str));
      const nodes = this.initializedСopy(this.state.nodes);
      let changingNode = nodes[id[0] - 1];

      if (id.length > 1) {
        for (let i = 1; i < id.length; i++) {
          changingNode = changingNode.children[id[i] - 1];
        }
      }

      changingNode.name = newName;
      this.setState({ nodes });
    };
  }

  addRootElement() {
    const id = this.state.nodes.length ? `${this.state.nodes.length + 1}` : '1';
    const newNode = {
      children: undefined,
      changeName: this.changeName(id),
      removeNode: this.removeNode(id),
      addChild: this.addChild(id),
      id,
      name: ''
    };

    const nodes = [...this.state.nodes, newNode];
    this.setState({ nodes });
  }

  addChild(id) {
    return () => {
      id = id.split('.').map((str) => parseInt(str));
      const nodes = this.initializedСopy(this.state.nodes);
      let changingNode = nodes[id[0] - 1];

      if (id.length > 1) {
        for (let i = 1; i < id.length; i++) {
          changingNode = changingNode.children[id[i] - 1];
        }
      }

      if (changingNode.children === undefined) {
        changingNode.children = [];
      }

      id = `${id.join('.')}.${changingNode.children.length + 1}`;

      changingNode.children = [
        ...changingNode.children,
        {
          children: undefined,
          changeName: this.changeName(id),
          removeNode: this.removeNode(id),
          addChild: this.addChild(id),
          id,
          name: ''
        }
      ];

      this.setState({ nodes });
    };
  }

  removeNode(id) {
    return () => {
      id = id.split('.').map((str) => parseInt(str));
      const nodes = this.initializedСopy(this.state.nodes);

      if (id.length === 1) {
        const newNodes = [
          ...nodes.slice(0, [id[0] - 1]),
          ...nodes.slice(id[0])
        ];

        this.setState({ nodes: this.initializedСopy(newNodes) });
      } else {
        let changingNode = nodes[id[0] - 1];

        for (let i = 2; i < id.length; i++) {
          changingNode = changingNode.children[id[i - 1] - 1];
        }

        const index = id[id.length - 1] - 1;

        const newChildren = [
          ...changingNode.children.slice(0, index),
          ...changingNode.children.slice(index + 1)
        ];
        changingNode.children = newChildren;

        this.setState({ nodes: this.initializedСopy(nodes) });
      }
    };
  }

  saveState() {
    this.setState({ savedNodes: this.initializedСopy(this.state.nodes) });
  }

  loadState() {
    this.setState({ nodes: this.initializedСopy(this.state.savedNodes) });
  }

  onTextChange(e) {
    this.setState({ nodes: this.initializedСopy(JSON.parse(e.target.value)) });
  }

  nodesToString() {
    return JSON.stringify(this.simplify(this.state.nodes), undefined, 2);
  }

  simplify(nodes) {
    const nodesCopy = [];
    for (let i = 0; i < nodes.length; i++) {
      const { children, name } = nodes[i];
      const hasChildren = children !== undefined && children.length > 0;
      nodesCopy[i] = {
        name,
        children: hasChildren ? this.simplify(children) : undefined
      };
    }
    return nodesCopy;
  }

  render() {
    const { nodes, savedNodes } = this.state;
    const {
      addRootElement,
      saveState,
      loadState,
      onTextChange,
      nodesToString
    } = this;
    const hasSaved = savedNodes.length !== 0;

    return (
      <div className="Tree">
        <div className="Tree-LeftSide">
          <ControlPanel {...{ hasSaved, saveState, loadState }} />
          <ul className="Nodes">
            {nodes.map((nodeProps) => {
              const { id, ...others } = nodeProps;
              return <TreeNode key={id} {...others} />;
            })}
          </ul>
          <AddButton onClick={addRootElement} />
        </div>

        <div className="Tree-RightSide">
          <TextView value={nodesToString()} onChange={onTextChange} />
        </div>
      </div>
    );
  }
}

export default Tree;
