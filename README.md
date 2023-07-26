# Overview

A sample implementation of web UI into the dependency graph of a Pantsbuild repository.
This is based on React and Material UI (MUI) React components.

The application provides a UI:

- to explore the direct and transitive dependencies of the dependency graph
- find shortest path between two nodes
- explore and compare the metrics of graph nodes (e.g. number of dependencies and dependents)

## Start server

It would be great to have `networkx` like library in JavaScript,
but using a Python virtual environment with `networkx` pre-installed has minimal efforts.

Prepare a Python virtual environment locally:

```bash
cd server
python3 -m venv .serverenv
source .serverenv/bin/activate
pip install networkx
```

Install:

```
npm init -y (?)
npm i express
npm i cors
npm install next@latest
```

Start:

```
cd server
npm start
```

## Start client

```
yarn add @mui/x-data-grid
yarn dev
```

## Format code

```
yarn prettier --write .
```
