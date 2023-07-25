import { getGraph, searchForRoutes } from "./lib/graph";

const graph = getGraph();
console.log("Airport graph");
console.log(graph);
console.log("Search for route from PHX to BKK");
searchForRoutes(graph, "PHX", "BKK");
