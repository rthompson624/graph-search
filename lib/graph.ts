import { AIRPORTS, ROUTES } from "./data";

type LinkedNode = {
  name: string;
  previous: LinkedNode | null;
};

export function getGraph() {
  const graph = new Map<string, string[]>();
  AIRPORTS.forEach((airport) => addNode(graph, airport));
  ROUTES.forEach((route) => addEdge(graph, route[0], route[1]));
  return graph;
}

function addNode(graph: Map<string, string[]>, airport: string) {
  graph.set(airport, []);
}

function addEdge(
  graph: Map<string, string[]>,
  origin: string,
  destination: string
) {
  graph.get(origin)?.push(destination);
  graph.get(destination)?.push(origin);
}

export function searchForRoutes(
  graph: Map<string, string[]>,
  origin: string,
  destination: string
) {
  // Use queue to implement breadth first search (BFS)
  const queue: LinkedNode[] = [{ name: origin, previous: null }];
  const airportsSearched = new Set<string>();
  airportsSearched.add(origin);

  while (queue.length > 0) {
    const node = queue.shift()!;
    console.log(`searching connections for ${node.name}`);
    const connections = graph.get(node.name)!;
    for (const connection of connections) {
      if (connection === destination) {
        console.log(`found route for ${destination}`);
        const route: LinkedNode = { name: destination, previous: node };
        console.log(resolveRoute(route));
      }
      if (!airportsSearched.has(connection)) {
        console.log(`adding ${connection} to queue`);
        airportsSearched.add(connection);
        queue.push({ name: connection, previous: node });
      }
    }
  }
}

function edgeKey(node1: string, node2: string): string {
  return `${node1}-${node2}`;
}

function resolveRoute(
  node: LinkedNode,
  routeAccumulator: string[] = []
): string[] {
  routeAccumulator.unshift(node.name);
  if (node.previous !== null) {
    resolveRoute(node.previous, routeAccumulator);
  }
  return routeAccumulator;
}
