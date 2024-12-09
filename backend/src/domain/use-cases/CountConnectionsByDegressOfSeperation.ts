import { SocialNetworkGraph } from "../interfaces/SocialNetworkGraph";
import { SocialNetworkGraphService } from "../services/SocialNetworkGraphService";

export class CountConnectionsByDegreesOfSeparation {
  #socialNetworkGraphService: SocialNetworkGraphService;

  constructor(socialNetworkGraphService: SocialNetworkGraphService) {
    this.#socialNetworkGraphService = socialNetworkGraphService;
  }

  execute(graph: SocialNetworkGraph): number {
    return this.#socialNetworkGraphService.countConnectionsByDegreesOfSeparation(graph);
  }
}