import { MockSocialNetworkGraphService } from "../mocks/MockSocialNetworkGraphService";
import { mockGraphOnePersonWithNoConnections } from "../mocks/graphResponseData";
import { CountDegreesOfSeparation } from "../../../src/domain/use-cases/CountDegressOfSeperation";
import { DegreesOfSeparationCount } from "../../../src/domain/interfaces/DegreesOfSeparationCount";

describe("CountConnectionsByDegreesOfSeparation", () => {
  let mockSocialNetworkGraphService: MockSocialNetworkGraphService;
  let countDegreesOfSeparation: CountDegreesOfSeparation;

  beforeEach(() => {
    mockSocialNetworkGraphService = new MockSocialNetworkGraphService();
    countDegreesOfSeparation = new CountDegreesOfSeparation(
      mockSocialNetworkGraphService,
    );
  });

  it("should return 2 connections at 1 degree and 1 connection at 2 degrees for John", () => {
    const person = "John";
    const count = countDegreesOfSeparation.execute(
      person,
      mockGraphOnePersonWithNoConnections,
    );

    const degreesOfSeparation: DegreesOfSeparationCount = { 1: 2, 2: 1 };
    expect(count).toStrictEqual(degreesOfSeparation);
  });

  // it("should return 3 connections at 1 degree and 0 connections at 2 degrees for Peter", () => {
  //   const person = "Peter";
  //   const count = countDegreesOfSeparation.execute(
  //     person,
  //     mockGraphOnePersonWithNoConnections,
  //   );

  //   // const expected: DegreesOfSeparationCount = { oneDegree: 1, twoDegrees: 2 };
  //   const expected: Record<number, number> = { 1: 3, 2: 0 };
  //   expect(count).toStrictEqual(expected);
  // });
});
