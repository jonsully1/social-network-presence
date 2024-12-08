import { SocialNetworkGraph } from "../interfaces/SocialNetworkGraph";

export interface SocialNetworkGraphService {
  countPeopleWithNoConnections(graph: SocialNetworkGraph): number;
}
