import { CountPeopleWithNoConnections } from "../../../src/domain/use-cases/CountPeopleWithNoConnections";
import { MockSocialNetworkGraphService } from "../mocks/MockSocialNetworkGraphService";

describe("CountPeopleWithNoConnections", () => {
  let mockSocialNetworkGraphService: MockSocialNetworkGraphService;
  let countPeopleWithNoConnections: CountPeopleWithNoConnections;

  beforeEach(() => {
    mockSocialNetworkGraphService = new MockSocialNetworkGraphService();
    countPeopleWithNoConnections = new CountPeopleWithNoConnections(
      mockSocialNetworkGraphService,
    );
  });

  it("should return 1 when there is one person with no connections", async () => {
    const expectedCount = 1;
    const network = "facebook";

    jest
      .spyOn(mockSocialNetworkGraphService, "countPeopleWithNoConnections")
      .mockResolvedValue(expectedCount);

    const count = await countPeopleWithNoConnections.execute(network);

    expect(count).toBe(expectedCount);
  });
});
