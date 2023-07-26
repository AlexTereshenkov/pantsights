import json
import sys
import subprocess

filepath = sys.argv[1]
if not filepath:
    print(json.dumps({"dependencies": {"data": {}}}))
    exit(0)

cmd = ["jq", "--stream", "-n", f'first(fromstream(1 | truncate_stream(inputs|select(.[0][0] =="{filepath}"))))[]', "resources/ui.tree.deps.transitive.explorer.json"]
# a simple command to check getting something
# cmd = ["jq", "-r", '."cheeseshop"', "resources/ui.tree.deps.direct.explorer.json"]
data = subprocess.check_output(cmd)

# inputs|select(.[0][0] truncates the "data" key, so have to add it here manually
print(json.dumps({"dependencies": {"data": json.loads(data)}}))
