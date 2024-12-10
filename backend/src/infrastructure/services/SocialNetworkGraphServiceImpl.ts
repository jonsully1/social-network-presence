import { SocialNetworkGraph } from "../../domain/interfaces/SocialNetworkGraph";
import { SocialNetworkGraphService } from "../../domain/services/SocialNetworkGraphService";
import { DegreesOfSeparationCount } from "../../domain/interfaces/DegreesOfSeparationCount";

type Graph = Map<string, string[]>;

export class SocialNetworkGraphServiceImpl implements SocialNetworkGraphService {
  public async countPeopleWithNoConnections(graph: SocialNetworkGraph): Promise<number> {
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

  #buildGraph(socialNetworkGraph: SocialNetworkGraph): Graph {
    const { people, relationships } = socialNetworkGraph;
    const graph: Graph = new Map<string, string[]>();

    people.forEach((person) => {
      graph.set(person.name, []);
    });

    relationships.forEach(({ type, startNode, endNode }) => {
      if (type === "HasConnection") {
        graph.get(startNode)?.push(endNode);
        graph.get(endNode)?.push(startNode);
      }
    });

    return graph;
  }

  #addNeighborsToQueue(
    current: string,
    degree: number,
    graph: Graph,
    visited: Set<string>,
    queue: [string, number][],
  ) {
    graph.get(current)?.forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        queue.push([neighbor, degree + 1]);
      }
    });
  }

  #calculateDegreesOfSeparation(
    person: string,
    graph: Graph,
  ): DegreesOfSeparationCount {
    const count: DegreesOfSeparationCount = { 1: 0, 2: 0 };
    const visited = new Set<string>();
    const queue: [string, number][] = [[person, 0]];

    while (queue.length > 0) {
      const [current, degree] = queue.shift()!;

      if (visited.has(current)) continue;

      visited.add(current);

      if (degree > 0 && degree <= 2) {
        count[degree as 1 | 2]++;
      }

      if (degree < 2) {
        this.#addNeighborsToQueue(current, degree, graph, visited, queue);
      }
    }

    return count;
  }

  countDegreesOfSeparation(
    person: string,
    socialNetworkGraph: SocialNetworkGraph,
  ): DegreesOfSeparationCount {
    const graph = this.#buildGraph(socialNetworkGraph);
    return this.#calculateDegreesOfSeparation(person, graph);
  }
}
