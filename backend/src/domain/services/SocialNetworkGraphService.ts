import { SocialNetworkGraph } from "../interfaces/SocialNetworkGraph";
import { DegreesOfSeparationCount } from "../interfaces/DegreesOfSeparationCount";

export interface SocialNetworkGraphService {
  countPeopleWithNoConnections(graph: SocialNetworkGraph): Promise<number>;

  countDegreesOfSeparation(
    person: string,
    socialNetworkGraph: SocialNetworkGraph,
  ): DegreesOfSeparationCount;
}
