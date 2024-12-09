import { CountPeopleWithNoConnections } from "../../../src/domain/use-cases/CountPeopleWithNoConnections";
import { MockSocialNetworkGraphService } from "../mocks/MockSocialNetworkGraphService";
import {
  mockGraphAllPeopleConnected,
  mockGraphOnePersonWithNoConnections,
} from "../mocks/graphResponseData";

describe("CountPeopleWithNoConnections", () => {
  let mockSocialNetworkGraphService: MockSocialNetworkGraphService;
  let countPeopleWithNoConnections: CountPeopleWithNoConnections;

  beforeEach(() => {
    mockSocialNetworkGraphService = new MockSocialNetworkGraphService();
    countPeopleWithNoConnections = new CountPeopleWithNoConnections(
      mockSocialNetworkGraphService,
    );
  });

  it("should return 1 when there is one person with no connections", () => {
    const expectedCount = 1;

    jest
      .spyOn(mockSocialNetworkGraphService, "countPeopleWithNoConnections")
      .mockImplementation(() => {
        return expectedCount;
      });

    const count = countPeopleWithNoConnections.execute(
      mockGraphOnePersonWithNoConnections,
    );

    expect(count).toBe(expectedCount);
  });

  it("should return 0 when there are no people with no connections", () => {
    const expectedCount = 0;

    jest
      .spyOn(mockSocialNetworkGraphService, "countPeopleWithNoConnections")
      .mockImplementation(() => {
        return expectedCount;
      });

    const count = countPeopleWithNoConnections.execute(
      mockGraphAllPeopleConnected,
    );

    expect(count).toBe(expectedCount);
  });
});
