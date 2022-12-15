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
  rest.post(
    "http://localhost:3001/api/admin/viewLessonWords/0",
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: [
            {
              id: 1,
              jp_word: "123",
              Choices: [
                { word: "123" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 2,
              jp_word: "1234",
              Choices: [
                { word: "1234" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 3,
              jp_word: "1231",
              Choices: [
                { word: "1231" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 4,
              jp_word: "1239",
              Choices: [
                { word: "1239" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 5,
              jp_word: "1238",
              Choices: [
                { word: "1238" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 6,
              jp_word: "1237",
              Choices: [
                { word: "1237" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 7,
              jp_word: "1236",
              Choices: [
                { word: "1236" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 8,
              jp_word: "yre",
              Choices: [
                { word: "yre" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 9,
              jp_word: "gfd",
              Choices: [
                { word: "gfd" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 10,
              jp_word: "er",
              Choices: [
                { word: "er" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
          ],
          totalWords: 12,
        })
      );
    }
  ),
  rest.post(
    "http://localhost:3001/api/admin/viewLessonWords/1",
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: [
            {
              id: 11,
              jp_word: "abcd",
              Choices: [
                { word: "abcd" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
            {
              id: 12,
              jp_word: "abc",
              Choices: [
                { word: "abc" },
                { word: "1" },
                { word: "2" },
                { word: "3" },
              ],
            },
          ],
          totalWords: 12,
        })
      );
    }
  ),
];
