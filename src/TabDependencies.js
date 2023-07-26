import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import TreeView from "@mui/lab/TreeView";
import { GridItem } from "./GridUtils";
import Sources from "../server/resources/ui.tree.file.explorer.json";

import {
  getNodePathByNodeId,
  getNodeValueByNodeId,
  renderTree,
} from "./TreeUtils";
import { MinusSquare, PlusSquare } from "./TreeStyle";
import PathsTextareaAutosize from "./ShortestPath";

function FileTreeView({ setSelectedFilePath, setFromFilePath }) {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const data = Sources["data"];

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      // TODO: find the maximum id number from the JSON file
      oldExpanded.length === 0
        ? Array.from(Array(10000).keys()).map(String)
        : []
    );
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  /*
    Update destination component with the selected path in the file explorer tree.
  */
  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
    const fileName = getNodeValueByNodeId(data, nodeIds);
    // if (fileName.includes(".")) {
    const filePath = getNodePathByNodeId(data, nodeIds);
    console.log(filePath);
    setSelectedFilePath(filePath);
    setFromFilePath(filePath);
    // }
  };

  return (
    <Box sx={{ height: 900, flexGrow: 1, maxWidth: 600, overflowY: "auto" }}>
      <Box sx={{ mb: 1 }}>
        <Button variant="outlined" onClick={handleExpandClick}>
          {expanded.length === 0 ? "Expand all" : "Collapse all"}
        </Button>
      </Box>

      <TreeView
        defaultExpanded={["root"]}
        defaultCollapseIcon={<MinusSquare />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        defaultExpandIcon={<PlusSquare />}
        sx={{ height: 700, flexGrow: 1, maxWidth: 600, overflowY: "auto" }}
      >
        {renderTree(data)}
      </TreeView>
    </Box>
  );
}

function DependenciesTreeView({
  selectedFilePath,
  setToFilePath,
  filePathDirectDependencies,
  filePathTransitiveDependencies,
}) {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      // TODO: find the maximum id number from the JSON file
      oldExpanded.length === 0 ? Array.from(Array(8000).keys()).map(String) : []
    );
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  /*
    Update destination component with the selected path in the file explorer tree.
  */
  const handleSelect = (event, nodeIds) => {
    const filePathDependencies =
      filePathDirectDependencies == ""
        ? filePathTransitiveDependencies
        : filePathDirectDependencies;
    console.log(`Direct: ${filePathDirectDependencies}`);
    console.log(`Transitive: ${filePathTransitiveDependencies}`);

    setSelected(nodeIds);
    const fileName = getNodeValueByNodeId(
      filePathDependencies["data"],
      nodeIds
    );
    console.log(fileName);
    // if (fileName.includes(".") || fileName.startsWith("deps") ) {
    const filePath = getNodePathByNodeId(filePathDependencies["data"], nodeIds);
    setToFilePath(filePath);
    console.log(filePath);
    // }
  };

  if (
    selectedFilePath == "" ||
    (filePathDirectDependencies == "" && filePathTransitiveDependencies == "")
  ) {
    return (
      <Box sx={{ height: 900, flexGrow: 1, maxWidth: 600, overflowY: "auto" }}>
        <Box sx={{ mb: 1 }}>
          <Button variant="outlined" onClick={handleExpandClick}>
            {expanded.length === 0 ? "Expand all" : "Collapse all"}
          </Button>
        </Box>

        <TreeView
          defaultExpanded={["root"]}
          defaultCollapseIcon={<MinusSquare />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          defaultExpandIcon={<PlusSquare />}
          sx={{ height: 700, flexGrow: 1, maxWidth: 600, overflowY: "auto" }}
        ></TreeView>
      </Box>
    );
  } else {
    return (
      <Box sx={{ height: 900, flexGrow: 1, maxWidth: 600, overflowY: "auto" }}>
        <Box sx={{ mb: 1 }}>
          <Button variant="outlined" onClick={handleExpandClick}>
            {expanded.length === 0 ? "Expand all" : "Collapse all"}
          </Button>
        </Box>

        <TreeView
          defaultExpanded={["root"]}
          defaultCollapseIcon={<MinusSquare />}
          expanded={expanded}
          selected={selected}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
          defaultExpandIcon={<PlusSquare />}
          sx={{ height: 700, flexGrow: 1, maxWidth: 600, overflowY: "auto" }}
        >
          {renderTree(
            filePathDirectDependencies != ""
              ? filePathDirectDependencies["data"]
              : filePathTransitiveDependencies["data"]
          )}
        </TreeView>
      </Box>
    );
  }
}

export default function TabDependencies() {
  const [selectedFilePath, setSelectedFilePath] = React.useState("");
  const [shortestPath, setShortestPath] = React.useState("");
  const [filePathDirectDependencies, setFilePathDirectDependencies] =
    React.useState("");
  const [filePathTransitiveDependencies, setFilePathTransitiveDependencies] =
    React.useState("");

  const [fromFilePath, setFromFilePath] = React.useState("");
  const [toFilePath, setToFilePath] = React.useState("");

  const [fromFilePathTextField, setFromFilePathTextField] = React.useState("");
  const [toFilePathTextField, setToFilePathTextField] = React.useState("");

  const [contextMenuFileTree, setContextMenuFileTree] = React.useState(null);
  const [contextMenuDependencyTree, setContextMenuDependencyTree] =
    React.useState(null);

  const handleContextMenuFileTree = (event) => {
    event.target.click();

    event.preventDefault();
    setContextMenuFileTree(
      contextMenuFileTree === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleContextMenuDependencyTree = (event) => {
    event.target.click();

    event.preventDefault();
    setContextMenuDependencyTree(
      contextMenuDependencyTree === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleCloseFileTreeContextMenu = (event) => {
    setFromFilePathTextField(selectedFilePath);
    setContextMenuFileTree(null);
  };

  const handleCloseDependencyTreeContextMenu = (event) => {
    setToFilePathTextField(toFilePath);
    setContextMenuDependencyTree(null);
  };

  const getApiData = async () => {
    await fetch(
      `http://localhost:3001/getPath?from=${fromFilePathTextField.replace(
        "#",
        "%23"
      )}&to=${toFilePathTextField.replace("#", "%23")}`
    )
      .then((res) => res.json())
      .then((shortestPath) =>
        setShortestPath(JSON.parse(shortestPath.message).path)
      );
  };

  // TODO: add memoize to fetch from cache
  const getFilePathDirectDependencies = async () => {
    await fetch(
      `http://localhost:3001/getDirectDependencies?filepath=${selectedFilePath.replace(
        "#",
        "%23"
      )}`
    )
      .then((res) => res.json())
      .then((filePathDirectDependencies) =>
        setFilePathDirectDependencies(
          JSON.parse(filePathDirectDependencies.message).dependencies
        )
      )
      .then((filePathTransitiveDependencies) =>
        setFilePathTransitiveDependencies("")
      );
  };

  // TODO: add progress component to indicate fetching is in progress
  const getFilePathTransitiveDependencies = async () => {
    await fetch(
      `http://localhost:3001/getTransitiveDependencies?filepath=${selectedFilePath.replace(
        "#",
        "%23"
      )}`
    )
      .then((res) => res.json())
      .then((filePathTransitiveDependencies) =>
        setFilePathTransitiveDependencies(
          JSON.parse(filePathTransitiveDependencies.message).dependencies
        )
      )
      .then((filePathDirectDependencies) => setFilePathDirectDependencies(""));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <GridItem>
          <div
            onContextMenu={handleContextMenuFileTree}
            style={{ cursor: "context-menu" }}
          >
            <FileTreeView
              setSelectedFilePath={setSelectedFilePath}
              setFromFilePath={setFromFilePath}
            />
            <Menu
              open={contextMenuFileTree !== null}
              onClose={handleCloseFileTreeContextMenu}
              anchorReference="anchorPosition"
              anchorPosition={
                contextMenuFileTree !== null
                  ? {
                      top: contextMenuFileTree.mouseY,
                      left: contextMenuFileTree.mouseX,
                    }
                  : undefined
              }
            >
              <MenuItem onClick={handleCloseFileTreeContextMenu}>
                From: {selectedFilePath}
              </MenuItem>
            </Menu>
          </div>
        </GridItem>
      </Grid>
      <Grid item xs={4}>
        <GridItem>
          <Button variant="outlined" onClick={getFilePathDirectDependencies}>
            Fetch directly
          </Button>
          <Button
            variant="outlined"
            onClick={getFilePathTransitiveDependencies}
          >
            Fetch transitively
          </Button>
          <div
            onContextMenu={handleContextMenuDependencyTree}
            style={{ cursor: "context-menu" }}
          >
            <DependenciesTreeView
              selectedFilePath={selectedFilePath}
              setToFilePath={setToFilePath}
              filePathDirectDependencies={filePathDirectDependencies}
              filePathTransitiveDependencies={filePathTransitiveDependencies}
            />
            <Menu
              open={contextMenuDependencyTree !== null}
              onClose={handleCloseDependencyTreeContextMenu}
              anchorReference="anchorPosition"
              anchorPosition={
                contextMenuDependencyTree !== null
                  ? {
                      top: contextMenuDependencyTree.mouseY,
                      left: contextMenuDependencyTree.mouseX,
                    }
                  : undefined
              }
            >
              <MenuItem onClick={handleCloseDependencyTreeContextMenu}>
                To: {toFilePath}
              </MenuItem>
            </Menu>
          </div>
        </GridItem>
      </Grid>
      <Grid item xs={4}>
        <GridItem>
          <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <TextField
                id="fromPathButton"
                helperText="From file"
                value={fromFilePathTextField}
                onChange={(event) => {
                  setFromFilePathTextField(event.target.value);
                }}
              />
              <TextField
                id="toPathButton"
                helperText="To file"
                value={toFilePathTextField}
                onChange={(event) => {
                  setToFilePathTextField(event.target.value);
                }}
              />
            </Stack>
          </Box>

          <Box sx={{ width: "100%" }}>
            <Stack spacing={2}>
              <Button variant="outlined" onClick={getApiData}>
                Find shortest path
              </Button>
              <PathsTextareaAutosize
                shortestPath={shortestPath}
              ></PathsTextareaAutosize>
            </Stack>
          </Box>
        </GridItem>
      </Grid>
    </Grid>
  );
}
