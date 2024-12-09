import { MockSocialNetworkGraphService } from "../mocks/MockSocialNetworkGraphService";
import { mockGraphAllPeopleConnected } from "../mocks/graphResponseData";
import { CountConnectionsByDegreesOfSeparation } from "../../../src/domain/use-cases/CountConnectionsByDegressOfSeperation";

describe("CountConnectionsByDegreesOfSeparation", () => {
  let mockSocialNetworkGraphService: MockSocialNetworkGraphService;
  let countConnectionsByDegreesOfSeparation: CountConnectionsByDegreesOfSeparation;

  beforeEach(() => {
    mockSocialNetworkGraphService = new MockSocialNetworkGraphService();
    countConnectionsByDegreesOfSeparation =
      new CountConnectionsByDegreesOfSeparation(mockSocialNetworkGraphService);
  });

  it("should return 1 when there is one person with no connections", () => {
    const count = countConnectionsByDegreesOfSeparation.execute(
      mockGraphAllPeopleConnected,
    );

    const expected = { oneDegreeOfSeparation: 1, twoDegreeOfSeparation: 2 };
    expect(count).toBe(expected);
  });
});
