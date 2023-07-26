import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { alpha, styled } from "@mui/material/styles";

/*
  Get path to the file from the root of the repository.
*/
export function getNodePathByNodeId(parent, nodeId) {
  const stack = [[parent, []]];
  while (stack.length) {
    const [node, path] = stack.pop();
    if (node.id === nodeId) {
      return path.join("/");
    }
    if (node.children) {
      stack.push(
        ...node.children.map((node, i) => [node, [...path, node.name]])
      );
    }
  }
}

/*
Get name of the file given a nodeId.
*/
export function getNodeValueByNodeId(root, nodeId) {
  if (root.id == nodeId) {
    return root.name;
  } else if (root.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < root.children.length; i++) {
      result = getNodeValueByNodeId(root.children[i], nodeId);
    }
    return result;
  }
  return null;
}

const StyledTreeItem = styled((props) => <TreeItem {...props} />)(
  ({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      "& .close": {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  })
);

export const renderTree = (nodes) => (
  <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node))
      : null}
  </StyledTreeItem>
);
