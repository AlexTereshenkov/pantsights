import sys
from collections import Counter
import json


input_dir, output_dir = sys.argv[1], sys.argv[2]

# dependents
dg_rdeps_filepath = f"{input_dir}/graph.rdeps.direct.json"
dg_rdeps_transitive_filepath = f"{input_dir}/graph.rdeps.transitive.json"

nodes_rdeps_filepath = f"{output_dir}/nodes.rdeps.direct.json"
nodes_rdeps_transitive_filepath = f"{output_dir}/nodes.rdeps.transitive.json"

# dependencies
dg_deps_filepath = f"{input_dir}/graph.deps.direct.json"
dg_deps_transitive_filepath = f"{input_dir}/graph.deps.transitive.json"

nodes_deps_filepath = f"{output_dir}/nodes.deps.direct.json"
nodes_deps_transitive_filepath = f"{output_dir}/nodes.deps.transitive.json"


def count_dependees(transitive: bool):
    if not transitive:
        filepath = dg_rdeps_filepath
        output = nodes_rdeps_filepath
    else:
        filepath = dg_rdeps_transitive_filepath
        output = nodes_rdeps_transitive_filepath

    with open(filepath, "r") as fh:
        data = json.load(fh)

    deps_counter = {}
    for filename, deps in data.items():
        deps_counter[filename] = len(deps)

    with open(output, "w") as fh:
        json.dump(deps_counter, fh, indent=4)


def count_dependencies(transitive: bool):
    if not transitive:
        filepath = dg_deps_filepath
        output = nodes_deps_filepath
    else:
        filepath = dg_deps_transitive_filepath
        output = nodes_deps_transitive_filepath

    with open(filepath, "r") as fh:
        data = json.load(fh)

    deps_counter = {}
    for filename, deps in data.items():
        deps_counter[filename] = len(deps)

    with open(output, "w") as fh:
        json.dump(deps_counter, fh, indent=4)


def build_table():
    table = []
    with open(nodes_deps_filepath) as fh:
        dependencies_count = json.load(fh)
    with open(nodes_deps_transitive_filepath) as fh:
        dependencies_transitive_count = json.load(fh)

    with open(nodes_rdeps_filepath) as fh:
        dependees_count = json.load(fh)
    with open(nodes_rdeps_transitive_filepath) as fh:
        dependees_transitive_count = json.load(fh)


    for idx, filename in enumerate(dependencies_count.keys()):
        table.append(
            {
                "id": idx,
                "file": filename,
                "dependencies": dependencies_count.get(filename, 0),
                "dependencies_transitive": dependencies_transitive_count.get(filename, 0),
                "dependees": dependees_count.get(filename, 0),
                "dependees_transitive": dependees_transitive_count.get(filename, 0),
            })

    with open(f"{output_dir}/metrics.json", "w") as fh:
        json.dump(table, fh, indent=4)

from pathlib import Path
Path(output_dir).mkdir(exist_ok=True)

count_dependees(transitive=True)
count_dependencies(transitive=True)
count_dependees(transitive=False)
count_dependencies(transitive=False)
build_table()
