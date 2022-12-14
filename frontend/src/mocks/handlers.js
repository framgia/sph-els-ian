import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3001", (req, res, ctx) => {
    res(ctx.json({ msg: "Mock Server connected" }));
  }),
  rest.get("http://localhost:3001/api/admin/viewLessons/0", (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          { id: 1, title: "Jap 1", description: "Desc 1" },
          { id: 2, title: "Jap 2", description: "Desc 1" },
          { id: 3, title: "Jap 3", description: "Desc 1" },
          { id: 4, title: "Jap 4", description: "Desc 1" },
          { id: 5, title: "Jap 5", description: "Desc 1" },
          { id: 6, title: "Jap 6", description: "Desc 1" },
          { id: 7, title: "Jap 7", description: "Desc 1" },
          { id: 8, title: "Jap 8", description: "Desc 1" },
          { id: 9, title: "Jap 9", description: "Desc 1" },
          { id: 11, title: "Jap 10", description: "Desc 1" },
        ],
        totalLessons: 20,
      })
    );
  }),
  rest.get("http://localhost:3001/api/admin/viewLessons/1", (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          { id: 12, title: "Jap 12", description: "Desc 1" },
          { id: 13, title: "Jap 13", description: "Desc 1" },
          { id: 14, title: "Jap 14", description: "Desc 1" },
          { id: 15, title: "Jap 15", description: "Desc 1" },
          { id: 16, title: "Jap 16", description: "Desc 1" },
        ],
        totalLessons: 15,
      })
    );
  }),
];
