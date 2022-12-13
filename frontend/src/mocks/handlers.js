import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3001", (req, res, ctx) => {
    return res(ctx.json({ msg: "Mock Server connected" }));
  }),
];
