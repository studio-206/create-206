import type { NextApiRequest, NextApiResponse } from "next";

export default function handle(req: NextApiRequest, res: NextApiResponse<void>): void {
  // Exit the current user from "Draft Mode".
  res.setDraftMode({ enable: false });

  const redirect = req.headers.referer || "/";

  // Redirect the user back to the index page.
  res.writeHead(307, { Location: redirect });
  res.end();
}
