import request from "supertest";
import server from "../../../src/infrastructure/server"
import SocialNetworkRouter from "../../../src/infrastructure/routes/SocialNetworkRouter";
import { CountPeopleWithNoConnections } from "../../../src/domain/use-cases/CountPeopleWithNoConnections";
import { MockSocialNetworkGraphService } from "../../domain/mocks/MockSocialNetworkGraphService";
import { CountDegreesOfSeparation } from "../../../src/domain/use-cases/CountDegressOfSeperation";
import { DegreesOfSeparationCount } from "../../../src/domain/interfaces/DegreesOfSeparationCount";

class MockCountPeopleWithNoConnections extends CountPeopleWithNoConnections {
  async execute(network: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
}

class MockCountDegreesOfSeparation extends CountDegreesOfSeparation {
  async execute(network: string, person: string): Promise<DegreesOfSeparationCount> {
    throw new Error("Method not implemented.");
  }
}

describe("Social Network Router", () => {
  let mockCountPeopleWithNoConnections: CountPeopleWithNoConnections;
  let mockCountDegreesOfSeparation: CountDegreesOfSeparation;

  beforeAll(() => {
    mockCountPeopleWithNoConnections = new MockCountPeopleWithNoConnections(
      new MockSocialNetworkGraphService(),
    );

    mockCountDegreesOfSeparation = new MockCountDegreesOfSeparation(
      new MockSocialNetworkGraphService(),
    );

    server.use(
      "/api/social-networks",
      SocialNetworkRouter(
        mockCountPeopleWithNoConnections,
        mockCountDegreesOfSeparation,
      ),
    );
  });

  test("GET /:network/no-connections returns a 200 success response", async () => {
    const expectedBody = {
      network: "facebook",
      noConnectionsCount: 1,
    };
    jest
      .spyOn(mockCountPeopleWithNoConnections, "execute")
      .mockResolvedValue(1);

    const response = await request(server).get(
      "/api/social-networks/facebook/no-connections",
    );

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(expectedBody);
  });

  test("GET /:network/no-connections returns a 500 error", async () => {
    const expectedErrorMessage = "Failed to count people with no connections";

    jest
      .spyOn(mockCountPeopleWithNoConnections, "execute")
      .mockRejectedValue(new Error(expectedErrorMessage));

    const response = await request(server).get(
      "/api/social-networks/facebook/no-connections",
    );

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({ message: expectedErrorMessage });
  });

  test("GET /:network/degress-of-separation returns a success response", async () => {
    const mockDegreesOfSeparationCount = { 1: 2, 2: 1 };
    const network = "facebook";
    const person = "John";
    const expectedBody = {
      network,
      person,
      connections: mockDegreesOfSeparationCount,
    };

    jest
      .spyOn(mockCountDegreesOfSeparation, "execute")
      .mockResolvedValue(mockDegreesOfSeparationCount);

    const response = await request(server).get(
      `/api/social-networks/${network}/degrees-of-separation?person=${person}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(expectedBody);
  });

  test("GET /:network/degress-of-separation returns a 500 error", async () => {
    const network = "facebook";
    const person = "John";
    const expectedErrorMessage = "Failed to get degrees of separation";

    jest
      .spyOn(mockCountDegreesOfSeparation, "execute")
      .mockRejectedValue(new Error(expectedErrorMessage));

    const response = await request(server).get(
      `/api/social-networks/${network}/degrees-of-separation?person=${person}`,
    );

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({ message: expectedErrorMessage });
  });
});
