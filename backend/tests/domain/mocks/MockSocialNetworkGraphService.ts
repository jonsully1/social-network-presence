import { DegreesOfSeparationCount } from "../../../src/domain/interfaces/DegreesOfSeparationCount";
import { SocialNetworkGraph } from "../../../src/domain/interfaces/SocialNetworkGraph";
import { SocialNetworkGraphService } from "../../../src/domain/services/SocialNetworkGraphService";

type Graph = Record<string, string[]>;

export class MockSocialNetworkGraphService
  implements SocialNetworkGraphService
{
  countPeopleWithNoConnections(graph: SocialNetworkGraph): number {
    const connectedPeople = new Set<string>();

    for (const relationship of graph.relationships) {
      const { type, startNode, endNode } = relationship;
      if (type === "HasConnection") {
        connectedPeople.add(startNode);
        connectedPeople.add(endNode);
      }
    }

    return graph.people.filter((person) => !connectedPeople.has(person.name))
      .length;
  }

  countDegreesOfSeparation(
    person: string,
    socialNetworkGraph: SocialNetworkGraph,
  ): DegreesOfSeparationCount {
    const count: DegreesOfSeparationCount = { 1: 0, 2: 0 };
    const { people, relationships } = socialNetworkGraph;
    const graph: Graph = {};

    // Initialize the graph with empty arrays for each person
    for (const person of people) {
      graph[person.name] = [];
    }

    // Populate the graph with connections
    for (const relationship of relationships) {
      const { type, startNode, endNode } = relationship;
      if (type === "HasConnection") {
        graph[startNode].push(endNode);
        graph[endNode].push(startNode);
      }
    }

    // FIFO queue (Breadth-First Search)
    const visited = new Set(); 
    const queue: (string | number)[][] = [[person, 0]]; 

    while (queue.length) {
      const [current, degree] = queue.shift() as [string, number];

      if (visited.has(current)) {
        continue; 
      }

      visited.add(current);

      if (degree > 0 && degree <= 2) {
        count[degree as 1 | 2]++;
      }
      
      if (degree < 2) {
        (graph[current] || []).forEach((neighbor) => {
          if (!visited.has(neighbor)) {
            queue.push([neighbor, degree + 1]);
          }
        });
      }
    }

    return count;
  }
}
