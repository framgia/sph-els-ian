import { render, screen, waitFor, within } from "../../../utils/test";
import userEvent from "@testing-library/user-event";
import AdminLessonListPage from "../../admin/AdminLessonListPage";
import { MemoryRouter } from "react-router-dom";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Admin Lessons List", () => {
  test("Initial Fetch", async () => {
    render(
      <MemoryRouter>
        <AdminLessonListPage />
      </MemoryRouter>
    );
    //Check for Add Lesson
    const addLesson = screen.getByRole("button", { name: /add lesson/i });
    //Check for table
    const table = screen.getByRole("table");
    const rowGroups = screen.getAllByRole("rowgroup");
    expect(rowGroups).toHaveLength(2);
    //Check for table headers
    within(rowGroups[0]).getByText(/title/i);
    within(rowGroups[0]).getByText(/description/i);
    within(rowGroups[0]).getByText(/actions/i);

    //useEffect dispatch
    await waitFor(async () => {
      //check for thead and tbody
      const rowGroups = await screen.findAllByRole("rowgroup");
      expect(rowGroups).toHaveLength(2);
      //check for all rows in tbody (15 from mock server)
      const lessonRows = await within(rowGroups[1]).findAllByRole("row");
      expect(lessonRows).toHaveLength(10);
      //check if each row has 2 buttons
      let actionButtons;
      lessonRows.map(async (row, index) => {
        actionButtons = await within(row).findAllByRole("button");
        expect(actionButtons).toHaveLength(2);
      });
      let pagination = await screen.findByRole("navigation");
      let paginationButtons = await within(pagination).findAllByText(/./);
      expect(paginationButtons).toHaveLength(6);
    });
  });

  test("Render Second Pagination", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AdminLessonListPage />
      </MemoryRouter>
    );

    //useEffect dispatch
    await waitFor(async () => {
      let pagination = await screen.findByRole("navigation");
      let pageTwo = await within(pagination).findByText(/2/);
      user.click(pageTwo);
    });

    //useEffect dispatch - Page 2
    await waitFor(async () => {
      //check for thead and tbody
      const rowGroups = await screen.findAllByRole("rowgroup");
      expect(rowGroups).toHaveLength(2);
      //check for all rows in tbody (15 from mock server)
      const lessonRows = await within(rowGroups[1]).findAllByRole("row");
      expect(lessonRows).toHaveLength(5);
    });
  });
  test("Render, switch to 2nd page, switch back to first page", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AdminLessonListPage />
      </MemoryRouter>
    );

    //useEffect dispatch, props update
    await waitFor(async () => {
      let pagination = await screen.findByRole("navigation");
      let pageTwo = await within(pagination).findByText(/2/);
      user.click(pageTwo);
    });

    //useEffect dispatch, props update
    await waitFor(async () => {
      //check for thead and tbody
      const rowGroups = await screen.findAllByRole("rowgroup");
      expect(rowGroups).toHaveLength(2);
      //check for all rows in tbody (15 from mock server)
      const lessonRows = await within(rowGroups[1]).findAllByRole("row");
      expect(lessonRows).toHaveLength(5);
      let pagination = await screen.findByRole("navigation");
      let pageOne = await within(pagination).findByText(/1/);
      user.click(pageOne);
    });

    //useEffect dispatch, props update
    await waitFor(async () => {
      //check for thead and tbody
      const rowGroups = await screen.findAllByRole("rowgroup");
      expect(rowGroups).toHaveLength(2);
      //check for all rows in tbody (15 from mock server)
      const lessonRows = await within(rowGroups[1]).findAllByRole("row");
      expect(lessonRows).toHaveLength(10);
    });
  });
});
