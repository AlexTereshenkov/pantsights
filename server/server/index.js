const express = require("express");
const cors = require("cors");
const { execSync } = require("node:child_process");

const PORT = 3001;
const app = express();

function getPath(from, to) {
  const output = execSync(
    `.serverenv/bin/python3 get_shortest_path.py "${from};${to}"`,
    {
      encoding: "utf-8",
    }
  );

  console.log("Output was:\n", output);
  return output;
}

function getDirectDependencies(filepath) {
  const output = execSync(
    `.serverenv/bin/python3 get_direct_dependencies.py "${filepath}"`,
    {
      encoding: "utf-8",
    }
  );

  console.log("Output was:\n", output);
  return output;
}

function getTransitiveDependencies(filepath) {
  const output = execSync(
    `.serverenv/bin/python3 get_transitive_dependencies.py "${filepath}"`,
    {
      encoding: "utf-8",
    }
  );

  console.log("Output was:\n", output);
  return output;
}

app.use(cors());
app.get("/getPath", (req, res) => {
  res.json({ message: getPath(req.query.from, req.query.to) });
});
app.get("/getDirectDependencies", (req, res) => {
  res.json({ message: getDirectDependencies(req.query.filepath) });
});
app.get("/getTransitiveDependencies", (req, res) => {
  res.json({ message: getTransitiveDependencies(req.query.filepath) });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
