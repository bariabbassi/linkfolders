import { Component } from 'react';
import { Box, Flex, List } from '@chakra-ui/react';

import EditableProfileHeader from '@/components/editable-tree/EditableProfileHeader';
import TreeNode from '@/components/editable-tree/TreeNode';
import RootButtons from '@/components/editable-tree/RootButtons';
import ControlPanel from '@/components/editable-tree/ControlPanel';
import { updateProfile } from '@/lib/db';

class EditableTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.profile?.name,
      photoUrl: this.props.profile?.photoUrl,
      nodes: this.initializedСopy(this.props.profile?.children),
      savedNodes: []
    };
    this.changeName = this.changeName.bind(this);
    this.changeUrl = this.changeUrl.bind(this);
    this.addRootLink = this.addRootLink.bind(this);
    this.addRootFolder = this.addRootFolder.bind(this);
    this.addLink = this.addLink.bind(this);
    this.addFolder = this.addFolder.bind(this);
    this.removeNode = this.removeNode.bind(this);
    this.changeProfileName = this.changeProfileName.bind(this);
    this.changeProfilePhotoUrl = this.changeProfilePhotoUrl.bind(this);
    this.saveState = this.saveState.bind(this);
    this.loadState = this.loadState.bind(this);
  }

  initializedСopy(nodes, location) {
    const nodesCopy = [];
    for (let i = 0; i < nodes?.length; i++) {
      if (nodes[i].url) {
        const { name, url } = nodes[i];
        const id = location ? `${location}.${i + 1}` : `${i + 1}`;
        nodesCopy[i] = {
          id,
          name,
          url,
          changeName: this.changeName(id),
          changeUrl: this.changeUrl(id),
          deleteLink: this.removeNode(id)
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
          addLink: this.addLink(id),
          addFolder: this.addFolder(id)
        };
      }
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

  changeUrl(id) {
    return (newUrl) => {
      id = id.split('.').map((str) => parseInt(str));
      const nodes = this.initializedСopy(this.state.nodes);
      let changingNode = nodes[id[0] - 1];

      if (id.length > 1) {
        for (let i = 1; i < id.length; i++) {
          changingNode = changingNode.children[id[i] - 1];
        }
      }

      changingNode.url = newUrl;
      this.setState({ nodes });
    };
  }

  addRootLink() {
    const id = this.state.nodes.length ? `${this.state.nodes.length + 1}` : '1';
    const newNode = {
      id,
      name: '',
      url: 'https://',
      changeName: this.changeName(id),
      changeUrl: this.changeUrl(id),
      removeNode: this.removeNode(id)
    };

    const nodes = [...this.state.nodes, newNode];
    this.setState({ nodes });
  }

  addRootFolder() {
    const id = this.state.nodes.length ? `${this.state.nodes.length + 1}` : '1';
    const newNode = {
      id,
      name: '',
      children: undefined,
      changeName: this.changeName(id),
      removeNode: this.removeNode(id),
      addLink: this.addLink(id),
      addFolder: this.addFolder(id)
    };

    const nodes = [...this.state.nodes, newNode];
    this.setState({ nodes });
  }

  addLink(id) {
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
          id,
          name: '',
          url: 'https://',
          changeName: this.changeName(id),
          changeUrl: this.changeUrl(id),
          removeNode: this.removeNode(id)
        }
      ];

      this.setState({ nodes });
    };
  }

  addFolder(id) {
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
          id,
          name: '',
          children: undefined,
          changeName: this.changeName(id),
          removeNode: this.removeNode(id),
          addLink: this.addLink(id),
          addFolder: this.addFolder(id)
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

  changeProfileName(e) {
    this.setState({ name: e.target.value });
  }

  changeProfilePhotoUrl(e) {
    this.setState({ photoUrl: e.target.value });
  }

  saveState() {
    updateProfile(
      this.props.profile?.id,
      this.profileSimplify(
        this.state.name,
        this.state.photoUrl,
        this.state.nodes
      )
    );
    this.setState({ savedNodes: this.initializedСopy(this.state.nodes) });
  }

  loadState() {
    this.setState({ nodes: this.initializedСopy(this.state.savedNodes) });
  }

  simplify(nodes) {
    const nodesCopy = [];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].url) {
        const { name, url } = nodes[i];
        nodesCopy[i] = {
          name,
          url
        };
      } else {
        const { children, name } = nodes[i];
        const hasChildren = children !== undefined && children.length > 0;
        nodesCopy[i] = {
          name,
          children: hasChildren ? this.simplify(children) : undefined
        };
      }
    }
    return nodesCopy;
  }

  profileSimplify(name, photoUrl, nodes) {
    const profile = { name, photoUrl, children: [] };
    if (profile.name === undefined) profile.name = null;
    if (profile.photoUrl === undefined) profile.photoUrl = null;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].url) {
        const { name, url } = nodes[i];
        profile.children[i] = {
          name,
          url
        };
      } else {
        const { children, name } = nodes[i];
        const hasChildren = children !== undefined && children.length > 0;
        profile.children[i] = {
          name,
          children: hasChildren ? this.simplify(children) : []
        };
      }
    }
    return profile;
  }

  render() {
    const { name, photoUrl, nodes, savedNodes } = this.state;
    const {
      addRootLink,
      addRootFolder,
      changeProfileName,
      changeProfilePhotoUrl,
      saveState,
      loadState
    } = this;
    const hasSaved = savedNodes.length !== 0;

    return (
      <Flex mb={5} direction="column" align="center">
        <EditableProfileHeader
          {...{
            name,
            photoUrl,
            changeProfileName,
            changeProfilePhotoUrl
          }}
        />
        <Box m={3} mb={10}>
          <Box mt={3} mb={10}>
            <List>
              {nodes.map((nodeProps) => {
                const { id, ...others } = nodeProps;
                return <TreeNode key={id} {...others} />;
              })}
            </List>
            <RootButtons {...{ addRootLink, addRootFolder }} />
          </Box>
          <ControlPanel {...{ hasSaved, saveState, loadState }} />
        </Box>
      </Flex>
    );
  }
}

export default EditableTree;
