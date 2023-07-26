import json
import sys

filepath = sys.argv[1]
with open("resources/ui.tree.deps.direct.explorer.json") as fh:
    data = json.load(fh)
    print(json.dumps({"dependencies": data.get(filepath, {"data": {}})}))
