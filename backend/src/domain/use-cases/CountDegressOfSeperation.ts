import { SocialNetworkGraph } from "../interfaces/SocialNetworkGraph";
import { DegreesOfSeparationCount } from "../interfaces/DegreesOfSeparationCount";
import { SocialNetworkGraphService } from "../services/SocialNetworkGraphService";

export class CountDegreesOfSeparation {
  #socialNetworkGraphService: SocialNetworkGraphService;

  constructor(socialNetworkGraphService: SocialNetworkGraphService) {
    this.#socialNetworkGraphService = socialNetworkGraphService;
  }

  execute(
    person: string,
    socialNetworkGraph: SocialNetworkGraph,
  ): DegreesOfSeparationCount {
    return this.#socialNetworkGraphService.countDegreesOfSeparation(
      person,
      socialNetworkGraph,
    );
  }
}