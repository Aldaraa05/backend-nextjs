import type { NextApiRequest, NextApiResponse } from "next";
import { mongoDataApiRequest } from "../hello";
type Data = {
  messsages: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const result = await mongoDataApiRequest("find", {});
      res.status(200).json(result);
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
    default:
      res.status(405).end();
      return;
  }
}
