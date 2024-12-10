import { DegreesOfSeparationCount } from "../../../src/domain/interfaces/DegreesOfSeparationCount";
import { SocialNetworkGraphServiceImpl } from "../../../src/infrastructure/services/SocialNetworkGraphServiceImpl";
import { mockGraphOnePersonWithNoConnections } from "../../domain/mocks/graphResponseData";

describe("SocialNetworkGraphServiceImpl", () => {
  it("countPeopleWithNoConnections should return 1 for John", async () => {
    const socialNetworkGraphService = new SocialNetworkGraphServiceImpl();

    const count = await socialNetworkGraphService.countPeopleWithNoConnections(
      mockGraphOnePersonWithNoConnections,
    );

    expect(count).toBe(1);
  });
  
  it("countDegreesOfSeparation should 2 connections at 1 degree and 1 connection at 2 degrees for John", () => {
    const person = "John";
    const expectedCount: DegreesOfSeparationCount = { 1: 2, 2: 1 };

    const socialNetworkGraphService = new SocialNetworkGraphServiceImpl();

    const count = socialNetworkGraphService.countDegreesOfSeparation(
      person,
      mockGraphOnePersonWithNoConnections,
    );

    expect(count).toStrictEqual(expectedCount);
  });

  it("countDegreesOfSeparation should 3 connections at 1 degree and 0 connections at 2 degrees for Peter", () => {
    const person = "Peter";
    const expectedCount: DegreesOfSeparationCount = { 1: 3, 2: 0 };

    const socialNetworkGraphService = new SocialNetworkGraphServiceImpl();

    const count = socialNetworkGraphService.countDegreesOfSeparation(
      person,
      mockGraphOnePersonWithNoConnections,
    );

    expect(count).toStrictEqual(expectedCount);
  });

  it("countDegreesOfSeparation should 2 connections at 1 degree and 1 connections at 2 degrees for George", () => {
    const person = "George";
    const expectedCount: DegreesOfSeparationCount = { 1: 2, 2: 1 };

    const socialNetworkGraphService = new SocialNetworkGraphServiceImpl();

    const count = socialNetworkGraphService.countDegreesOfSeparation(
      person,
      mockGraphOnePersonWithNoConnections,
    );

    expect(count).toStrictEqual(expectedCount);
  });

  it("countDegreesOfSeparation should 0 connections at both 1 degree and 2 degrees for Harry", () => {
    const person = "Harry";
    const expectedCount: DegreesOfSeparationCount = { 1: 0, 2: 0 };

    const socialNetworkGraphService = new SocialNetworkGraphServiceImpl();

    const count = socialNetworkGraphService.countDegreesOfSeparation(
      person,
      mockGraphOnePersonWithNoConnections,
    );

    expect(count).toStrictEqual(expectedCount);
  });

  it("countDegreesOfSeparation should 1 connections at 1 degree and 2 connections at 2 degrees for Anna", () => {
    const person = "Anna";
    const expectedCount: DegreesOfSeparationCount = { 1: 1, 2: 2 };

    const socialNetworkGraphService = new SocialNetworkGraphServiceImpl();

    const count = socialNetworkGraphService.countDegreesOfSeparation(
      person,
      mockGraphOnePersonWithNoConnections,
    );

    expect(count).toStrictEqual(expectedCount);
  });
});
