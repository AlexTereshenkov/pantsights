import json

def makeTree(strings, separator="/", tree=None):
    tree = tree or {}
    for name,*subs in (s.split(separator,1) for s in strings):
        tree[name.split(":")[0]] = makeTree(subs, separator, tree.get(name.split(":")[0]))
    return tree


# Build tree hierarchy of all sources in the repo with Pants
with open("server/resources/graph.deps.direct.json") as fh:
    filepaths = [f for f in list(json.load(fh).keys())]
tree = makeTree(filepaths)

# Make tree hierarchy React compatible
def assign_children(d):
    assign_children.calls += 1
    return [{"name": k, "id": str(assign_children.calls), "children": assign_children(v)} for k, v in d.items()]
assign_children.calls = 0

with open("server/resources/ui.tree.file.explorer.json", "w") as fh:
    json.dump({"data": {"id":"0", "name": "Project", "children": assign_children(tree)}}, fh, indent=4)

# make a mapping {source file: [dependencies tree view compatible with React]}

def generate_dependencies_trees(filepath: str, output: str):
    # strip target addresses from sources as in "tests/foo/bar.py:tests"
    result = {}
    with open(filepath) as fh:
        data = json.load(fh)
    for k, deps in data.items():
        tree = makeTree([dep.split(":")[0] for dep in deps])
        assign_children.calls = 0
        result[k.split(":")[0]] = {"data": {"id":"0", "name": "Project", "children": assign_children(tree)}}
    with open(output, "w") as fh:
        json.dump(result, fh, indent=4)


generate_dependencies_trees("server/resources/graph.deps.direct.json", "server/resources/ui.tree.deps.direct.explorer.json")
generate_dependencies_trees("server/resources/graph.deps.transitive.json", "server/resources/ui.tree.deps.transitive.explorer.json")
