import json
import networkx
import sys

from_file, to_file = sys.argv[1].split(";")
with open("resources/graph.deps.direct.json") as fh:
    g = networkx.from_dict_of_lists(json.load(fh), create_using=networkx.DiGraph)
    print(json.dumps({"path": networkx.shortest_path(g, from_file, to_file)}))
