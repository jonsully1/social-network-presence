import { MockSocialNetworkGraphService } from "../mocks/MockSocialNetworkGraphService";
import { CountDegreesOfSeparation } from "../../../src/domain/use-cases/CountDegressOfSeperation";
import { DegreesOfSeparationCount } from "../../../src/domain/interfaces/DegreesOfSeparationCount";

describe("CountConnectionsByDegreesOfSeparation", () => {
  let mockSocialNetworkGraphService: MockSocialNetworkGraphService;
  let countDegreesOfSeparation: CountDegreesOfSeparation;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSocialNetworkGraphService = new MockSocialNetworkGraphService();
    countDegreesOfSeparation = new CountDegreesOfSeparation(
      mockSocialNetworkGraphService,
    );
  });

  it("should return 2 connections at 1 degree and 1 connection at 2 degrees for John", async () => {
    const network = "facebook";
    const person = "John";
    const expectedCount: DegreesOfSeparationCount = { 1: 2, 2: 1 };

    jest
      .spyOn(mockSocialNetworkGraphService, "countDegreesOfSeparation")
      .mockImplementation(() => {
        return expectedCount;
      });

    const count = await countDegreesOfSeparation.execute(network, person);

    expect(count).toStrictEqual(expectedCount);
  });

  it("should return 3 connections at 1 degree and 0 connections at 2 degrees for Peter", async () => {
    const network = "facebook";
    const person = "Peter";
    const expectedCount: DegreesOfSeparationCount = { 1: 3, 2: 0 };

    jest
      .spyOn(mockSocialNetworkGraphService, "countDegreesOfSeparation")
      .mockImplementation(() => {
        return expectedCount;
      });

    const count = await countDegreesOfSeparation.execute(network, person);

    expect(count).toStrictEqual(expectedCount);
  });

  it("should return 2 connections at 1 degree and 1 connections at 2 degrees for George", async () => {
    const network = "facebook";
    const person = "George";
    const expectedCount: DegreesOfSeparationCount = { 1: 2, 2: 1 };

    jest
      .spyOn(mockSocialNetworkGraphService, "countDegreesOfSeparation")
      .mockImplementation(() => {
        return expectedCount;
      });

    const count = await countDegreesOfSeparation.execute(network, person);

    expect(count).toStrictEqual(expectedCount);
  });

  it("should return 0 connections at both 1 degree and 2 degrees for Harry", async () => {
    const network = "facebook";
    const person = "Harry";
    const expectedCount: DegreesOfSeparationCount = { 1: 0, 2: 0 };

    jest
      .spyOn(mockSocialNetworkGraphService, "countDegreesOfSeparation")
      .mockImplementation(() => {
        return expectedCount;
      });

    const count = await countDegreesOfSeparation.execute(network, person);

    expect(count).toStrictEqual(expectedCount);
  });

  it("should return 1 connections at 1 degree and 2 connections at 2 degrees for Anna", async () => {
    const network = "facebook";
    const person = "Anna";
    const expectedCount: DegreesOfSeparationCount = { 1: 1, 2: 2 };

    jest
      .spyOn(mockSocialNetworkGraphService, "countDegreesOfSeparation")
      .mockImplementation(() => {
        return expectedCount;
      });

    const count = await countDegreesOfSeparation.execute(network, person);

    expect(count).toStrictEqual(expectedCount);
  });
});
