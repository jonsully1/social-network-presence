import { SocialNetworkGraph } from "../interfaces/SocialNetworkGraph";
import { DegreesOfSeparationCount } from "../interfaces/DegreesOfSeparationCount";
import { SocialNetworkGraphService } from "../services/SocialNetworkGraphService";

const thirdPartyApiService: Record<string, SocialNetworkGraph> = {
  facebook: {
    name: "facebook",
    people: [
      { name: "John" },
      { name: "Harry" },
      { name: "Peter" },
      { name: "George" },
      { name: "Anna" },
    ],
    relationships: [
      { type: "HasConnection", startNode: "John", endNode: "Peter" },
      { type: "HasConnection", startNode: "John", endNode: "George" },
      { type: "HasConnection", startNode: "Peter", endNode: "George" },
      { type: "HasConnection", startNode: "Peter", endNode: "Anna" },
    ],
  },
};

export class CountDegreesOfSeparation {
  #socialNetworkGraphService: SocialNetworkGraphService;

  constructor(socialNetworkGraphService: SocialNetworkGraphService) {
    this.#socialNetworkGraphService = socialNetworkGraphService;
  }

  async execute(
    network: string,
    person: string,
  ): Promise<DegreesOfSeparationCount> {
    const socialNetworkGraph = thirdPartyApiService[network];
    return this.#socialNetworkGraphService.countDegreesOfSeparation(
      person,
      socialNetworkGraph,
    );
  }
}
