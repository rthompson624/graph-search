import { getGraph, searchForRoutesBFS, searchForRoutesDFS } from "./lib/graph";

const graph = getGraph();
console.log("Airport graph");
console.log(graph);
console.log("Search for route from PHX to BKK");
searchForRoutesBFS(graph, "PHX", "BKK");
searchForRoutesDFS(graph, "PHX", "BKK");
