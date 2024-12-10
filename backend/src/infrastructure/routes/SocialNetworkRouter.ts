import express, { Request, Response } from "express";
import { CountPeopleWithNoConnections } from "../../domain/use-cases/CountPeopleWithNoConnections";
import { CountDegreesOfSeparation } from "../../domain/use-cases/CountDegressOfSeperation";

const SocialNetworkRouter = (
  countPeopleWithNoConnections: CountPeopleWithNoConnections,
  countDegreesOfSeparation: CountDegreesOfSeparation,
) => {
  const router = express.Router();

  router.get(
    "/:network/no-connections",
    async (req: Request, res: Response) => {
      try {
        const { network } = req.params;

        const count = await countPeopleWithNoConnections.execute(network);
        
        res.status(200).json({ network, noConnectionsCount: count });
      } catch (err) {
        res.status(500).json({ message: (err as Error).message });
      }
    },
  );

  router.get(
    "/:network/degrees-of-separation",
    async (req: Request, res: Response) => {
      try {
        const { network } = req.params;
        const { person } = req.query;

        const degrees = await countDegreesOfSeparation.execute(
          network,
          person as string,
        );

        res.status(200).json({ network, person, connections: degrees });
      } catch (err) {
        res.status(500).json({ message: (err as Error).message });
      }
    },
  );

  return router;
};

export default SocialNetworkRouter;
