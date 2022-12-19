import { act, render, screen, waitFor } from "../../../utils/test";
import userEvent from "@testing-library/user-event";
import LessonModal from "../LessonModal";
import { rest } from "msw";
import { server } from "../../../mocks/server";

const mockedDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockedDispatch,
}));

let isOpen = true;
const setModal = jest.fn();
const setModalData = jest.fn();
const modalData = {
  add: {
    title: "",
    desecription: "",
  },
  edit: {
    id: 1,
    title: "Title",
    description: "description",
  },
};
const initialFormData = modalData.add;

describe("WordModal Test - Add", () => {
  test("initial load", async () => {
    const user = userEvent.setup();

    render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.add}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  test("Missing Title", async () => {
    const user = userEvent.setup();

    render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.add}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitBtn = screen.getByRole("button", { name: submit });
    user.clear(titleInput);
    user.clear(descInput);
    user.type(descInput, "Description");
    user.click(submitBtn);

    await waitFor(() => {
      const alerts = screen.getByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toBe(/title/i);
    });
  });

  test("Missing Description", async () => {
    const user = userEvent.setup();

    render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.add}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitBtn = screen.getByRole("button", { name: submit });
    user.clear(titleInput);
    user.type(titleInput, "Title");
    user.clear(descInput);
    user.click(submitBtn);

    await waitFor(() => {
      const alerts = screen.getByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toBe(/description/i);
    });
  });

  test("Duplicate Title", async () => {
    const user = userEvent.setup();
    server.resetHandlers(
      rest.post(
        "http://localhost:3001/api/admin/addLesson",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({ message: "Title already exists" })
          );
        }
      )
    );
    render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.add}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitBtn = screen.getByRole("button", { name: submit });
    user.clear(titleInput);
    user.type(titleInput, "Title");
    user.clear(descInput);
    user.type(descInput, "Description");
    user.click(submitBtn);

    await waitFor(() => {
      const alerts = screen.getByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toBe(/title already exists/i);
    });
  });
  test("Success", async () => {
    const user = userEvent.setup();
    server.resetHandlers(
      rest.post(
        "http://localhost:3001/api/admin/addLesson",
        (req, res, ctx) => {
          return res(ctx.status(200));
        }
      )
    );
    const { rerender } = render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.add}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitBtn = screen.getByRole("button", { name: submit });
    user.clear(titleInput);
    user.type(titleInput, "Title");
    user.clear(descInput);
    user.type(descInput, "Description");
    user.click(submitBtn);

    await waitFor(() => {});
    isOpen = false;
    rerender(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.add}
      />
    );
    await waitFor(() => {
      const inputs = screen.queryAllByRole("textbox");
      const buttons = screen.queryAllByRole("button");
      expect(inputs).toHaveLength(0);
      expect(buttons).toHaveLength(0);
    });
  });
});

isOpen = true;

describe("WordModal Test - Edit", () => {
  test("initial load", async () => {
    const user = userEvent.setup();
    console.log(modalData);

    render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.edit}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    expect(inputs[0].value).toMatch(/\S+/i);
    expect(inputs[1].value).toMatch(/\S+/i);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });

  test("Missing Title", async () => {
    const user = userEvent.setup();

    render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.edit}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitBtn = screen.getByRole("button", { name: submit });
    user.clear(titleInput);
    user.clear(descInput);
    user.type(descInput, "Description");
    user.click(submitBtn);

    await waitFor(() => {
      const alerts = screen.getByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toBe(/title/i);
    });
  });

  test("Missing Description", async () => {
    const user = userEvent.setup();

    render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.edit}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitBtn = screen.getByRole("button", { name: submit });
    user.clear(titleInput);
    user.type(titleInput, "Title");
    user.clear(descInput);
    user.click(submitBtn);

    await waitFor(() => {
      const alerts = screen.getByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toBe(/description/i);
    });
  });

  test("Duplicate Title", async () => {
    const user = userEvent.setup();
    server.resetHandlers(
      rest.post(
        "http://localhost:3001/api/admin/addLesson",
        (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({ message: "Title already exists" })
          );
        }
      )
    );
    render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.edit}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitBtn = screen.getByRole("button", { name: submit });
    user.clear(titleInput);
    user.type(titleInput, "Title");
    user.clear(descInput);
    user.type(descInput, "Description");
    user.click(submitBtn);

    await waitFor(() => {
      const alerts = screen.getByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toBe(/title already exists/i);
    });
  });
  test("Success", async () => {
    const user = userEvent.setup();
    server.resetHandlers(
      rest.post(
        "http://localhost:3001/api/admin/addLesson",
        (req, res, ctx) => {
          return res(ctx.status(200));
        }
      )
    );
    const { rerender } = render(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.edit}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const titleInput = screen.getByLabelText(/title/i);
    const descInput = screen.getByLabelText(/description/i);
    const submitBtn = screen.getByRole("button", { name: submit });
    user.clear(titleInput);
    user.type(titleInput, "Title");
    user.clear(descInput);
    user.type(descInput, "Description");
    user.click(submitBtn);

    await waitFor(() => {});
    isOpen = false;
    rerender(
      <LessonModal
        modal={isOpen}
        {...{ setModal, setModalData, initialFormData }}
        modalData={modalData.edit}
      />
    );
    await waitFor(() => {
      const inputs = screen.queryAllByRole("textbox");
      const buttons = screen.queryAllByRole("button");
      expect(inputs).toHaveLength(0);
      expect(buttons).toHaveLength(0);
    });
  });
});
