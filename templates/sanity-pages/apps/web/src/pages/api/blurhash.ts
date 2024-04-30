import { NextApiRequest, NextApiResponse } from "next";
import getBlurData from "@/utils/use-blurhash";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { blurhashUrl } = req.query;

  const width = 30;
  const height = width / (16 / 9);

  try {
    const blurhash = getBlurData((blurhashUrl as string) || "", width, height);
    res.setHeader("Content-Type", "image/png");

    return res.status(200).send(blurhash);
  } catch (e) {
    console.error(e);
    return res.status(422).end();
  }
}
