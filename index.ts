import { getGraph, searchForRoutesBFS, searchForRoutesDFS } from "./lib/graph";
import { getBinaryTree } from "./lib/tree";

// const graph = getGraph();
// console.log("Airport graph");
// console.log(graph);
// console.log("Search for route from PHX to BKK");
// searchForRoutesBFS(graph, "PHX", "BKK");
// searchForRoutesDFS(graph, "PHX", "BKK");

const testValues = [1, 2, 3, 4, 5, 6, 7] as number[];
console.log(testValues);
const tree = getBinaryTree(testValues);
console.log("And the binary tree is...");
console.log(tree);
