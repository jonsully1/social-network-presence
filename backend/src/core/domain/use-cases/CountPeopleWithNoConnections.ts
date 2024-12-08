import { SocialNetworkGraph } from "../interfaces/SocialNetworkGraph";
import { SocialNetworkGraphService } from "../services/SocialNetworkGraphService";

export class CountPeopleWithNoConnections {
  #socialNetworkGraphService: SocialNetworkGraphService;

  constructor(socialNetworkGraphService: SocialNetworkGraphService) {
    this.#socialNetworkGraphService = socialNetworkGraphService;
  }

  execute(graph: SocialNetworkGraph): number {
    return this.#socialNetworkGraphService.countPeopleWithNoConnections(graph);
  }
}