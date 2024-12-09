import { SocialNetworkGraph } from "../../../src/domain/interfaces/SocialNetworkGraph";
import { SocialNetworkGraphService } from "../../../src/domain/services/SocialNetworkGraphService";

export class MockSocialNetworkGraphService implements SocialNetworkGraphService {
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
}
