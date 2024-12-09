interface Person {
  name: string;
}

interface Relationship {
  type: string;
  startNode: string;
  endNode: string;
}

export type Graph = Map<string, string[]>;

export interface SocialNetworkGraph {
  name: string;
  people: Person[];
  relationships: Relationship[];
}