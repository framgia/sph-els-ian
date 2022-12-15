import {
  queryByPlaceholderText,
  queryByRole,
  render,
  screen,
  waitFor,
  within,
} from "../../../utils/test";
import userEvent from "@testing-library/user-event";
import AdminLessonPage from "../../admin/AdminLessonPage";
import { MemoryRouter } from "react-router-dom";
import { server } from "../../../mocks/server";
import { rest } from "msw";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("AdminLessonPage Test", () => {
  test("Initial load with useEffect", async () => {
    render(
      <MemoryRouter>
        <AdminLessonPage />
      </MemoryRouter>
    );
    //check table
    const table = screen.getByRole("table");
    //check table headers
    within(table).getByText(/word/i);
    within(table).getByText(/answer/i);
    within(table).getByText(/extra choices/i);
    within(table).getByText(/options/i);
    //check addWord button
    screen.getByRole("button", { name: /add new word/i });
    //check backToLessons button
    screen.getByRole("button", { name: /back to lessons/i });

    await waitFor(() => {
      //table
      const table = screen.getByRole("table");
      const rowGroups = screen.getAllByRole("rowgroup");
      const wordRows = within(rowGroups[1]).getAllByRole("row");
      expect(wordRows).toHaveLength(10);
      let actions;
      wordRows.map((row) => {
        actions = within(row).getAllByRole("button");
        expect(actions).toHaveLength(2);
      });

      //pagination
      let pagination = screen.getByRole("navigation");
      let paginationButtons = within(pagination).getAllByText(/./);
      expect(paginationButtons).toHaveLength(6);
    });
  });
  test("Click page 2 and render", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AdminLessonPage />
      </MemoryRouter>
    );
    //check table
    const table = screen.getByRole("table");
    //check table headers
    within(table).getByText(/word/i);
    within(table).getByText(/answer/i);
    within(table).getByText(/extra choices/i);
    within(table).getByText(/options/i);
    //check addWord button
    screen.getByRole("button", { name: /add new word/i });
    //check backToLessons button
    screen.getByRole("button", { name: /back to lessons/i });

    //useEffect dispatch
    await waitFor(async () => {
      const pagination = screen.getByRole("navigation");
      const pageTwo = within(pagination).getByText(/2/i);
      await user.click(pageTwo);
    });

    //useEffect dispatch - page 2
    await waitFor(() => {
      const rowGroups = screen.getAllByRole("rowgroup");
      const wordRows = within(rowGroups[1]).getAllByRole("row");
      expect(wordRows).toHaveLength(2);
      let actions;
      wordRows.map((row) => {
        actions = within(row).getAllByRole("button");
        expect(actions).toHaveLength(2);
      });
    });
  });
  test("Click next page, render and go back to first page", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AdminLessonPage />
      </MemoryRouter>
    );

    //useEffect dispatch
    await waitFor(async () => {
      const pagination = screen.getByRole("navigation");
      const pageTwo = within(pagination).getByText(/2/i);
      await user.click(pageTwo);
    });
    //useEffect dispatch
    await waitFor(async () => {
      const pagination = screen.getByRole("navigation");
      const pageOne = within(pagination).getByText(/1/i);
      await user.click(pageOne);
    });
    //useEffect dispatch - page 2
    await waitFor(() => {
      const rowGroups = screen.getAllByRole("rowgroup");
      const wordRows = within(rowGroups[1]).getAllByRole("row");
      expect(wordRows).toHaveLength(10);
      let actions;
      wordRows.map((row) => {
        actions = within(row).getAllByRole("button");
        expect(actions).toHaveLength(2);
      });
    });
  });
  test("Clicking left or right on a single page ", async () => {
    server.resetHandlers(
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
              ],
              totalWords: 9,
            })
          );
        }
      )
    );

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AdminLessonPage />
      </MemoryRouter>
    );
    //useEffect dispatch
    await waitFor(async () => {
      //table
      const table = screen.getByRole("table");
      const rowGroups = screen.getAllByRole("rowgroup");
      const wordRows = within(rowGroups[1]).getAllByRole("row");
      expect(wordRows).toHaveLength(9);
      let actions;
      wordRows.map((row) => {
        actions = within(row).getAllByRole("button");
        expect(actions).toHaveLength(2);
      });

      const pagination = screen.getByRole("navigation");
      const pageRight = within(pagination).getByText(/⟩/i);
      await user.click(pageRight);
    });

    await waitFor(() => {
      //table
      const table = screen.getByRole("table");
      const rowGroups = screen.getAllByRole("rowgroup");
      const wordRows = within(rowGroups[1]).getAllByRole("row");
      expect(wordRows).toHaveLength(9);
      let actions;
      wordRows.map((row) => {
        actions = within(row).getAllByRole("button");
        expect(actions).toHaveLength(2);
      });
    });
  });
  test.only("Clicking Add Word to display modal", async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByText, getByRole } = render(
      <MemoryRouter>
        <AdminLessonPage />
      </MemoryRouter>,
      { container: document.body }
    );
    await waitFor(async () => {
      const addWord = screen.getByRole("button", { name: /add new word/i });
      await user.click(addWord);
    });
    await waitFor(async () => {
      //check for Modal
      //header
      const header = getByText(/add word/i);
      expect(header).not.toBeNull();
      //inputs
      const newWord = getByLabelText(/new word/i);
      const choice0 = getByLabelText(/choice0/);
      const choice1 = getByLabelText(/choice1/);
      const choice2 = getByLabelText(/choice2/);
      const choice3 = getByLabelText(/choice3/);
      //buttons
      const modalCancel = getByRole("button", { name: /Cancel/i });
      const modalSubmit = getByRole("button", { name: /Submit/i });
      expect(modalSubmit).toBeDisabled();
    });
  });
});
