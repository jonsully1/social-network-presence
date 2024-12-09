import { DegreesOfSeparationCount } from "../../../src/domain/interfaces/DegreesOfSeparationCount";
import { SocialNetworkGraphService } from "../../../src/domain/services/SocialNetworkGraphService";
import { SocialNetworkGraph } from "../../../src/domain/interfaces/SocialNetworkGraph";

export class MockSocialNetworkGraphService
  implements SocialNetworkGraphService
{
  public countPeopleWithNoConnections(graph: SocialNetworkGraph): number {
    throw new Error("countPeopleWithNoConnections method not implemented.");
  }

  public countDegreesOfSeparation(
    person: string,
    socialNetworkGraph: SocialNetworkGraph,
  ): DegreesOfSeparationCount {
    throw new Error("countDegreesOfSeparation method not implemented.");
  }
}
