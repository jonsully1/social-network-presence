import { SocialNetworkGraph } from "../../../src/domain/interfaces/SocialNetworkGraph";

export const mockGraphOnePersonWithNoConnections: SocialNetworkGraph = {
  name: "facebook",
  people: [
    { name: "John" },
    { name: "Harry" }, // Has no connections
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
};

export const mockGraphAllPeopleConnected: SocialNetworkGraph = {
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
    { type: "HasConnection", startNode: "Harry", endNode: "Anna" },
  ],
};
