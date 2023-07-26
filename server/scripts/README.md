# Overview

Run these commands in your Pants repository:

```bash
# dependencies
pants dep-graph --deps --sources-only :: > resources/graph.deps.direct.json
pants dep-graph --deps --transitive --sources-only :: > resources/graph.deps.transitive.json

# dependents (reverse dependencies)
pants dep-graph --rdeps --sources-only :: > resources/graph.rdeps.direct.json
pants dep-graph --rdeps --transitive --sources-only :: > resources/graph.rdeps.transitive.json

# copy now the files from your project to this application resources
# cp -r resources/*.json .../server/resources
```

Run these commands from the root of the repository checkout to export dependency graph into a JSON file
with this [Pants plugin](https://pypi.org/project/pants-plugin-dep-graph/):

```bash
python3 server/scripts/build_metrics.py server/resources server/resources
python3 server/scripts/build_tree.py

# you can keep these for troubleshooting metrics generation
rm -rf server/resources/nodes.*.json
```
