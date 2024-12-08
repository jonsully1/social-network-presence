import { SocialNetworkGraph } from "../../../../src/core/domain/interfaces/SocialNetworkGraph";
import { SocialNetworkGraphService } from "../../../../src/core/domain/services/SocialNetworkGraphService";
import { CountPeopleWithNoConnections } from "../../../../src/core/domain/use-cases/CountPeopleWithNoConnections";

// Mock data indicates one person with no connections
const mockGraph: SocialNetworkGraph = {
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
};

class MockSocialNetworkGraphService implements SocialNetworkGraphService {
  // implement method and props
}

describe("CountPeopleWithNoConnections", () => {
  const mockSocialNetworkGraphService = new MockSocialNetworkGraphService();
  const countPeopleWithNoConnections = new CountPeopleWithNoConnections(mockSocialNetworkGraphService);

  it("should return 0 when there are no people with no connections", () => {
    const count = countPeopleWithNoConnections.execute(mockGraph);

    expect(count).toBe(1);
  });
});
