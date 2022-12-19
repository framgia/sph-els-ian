import { act, render, screen, waitFor } from "../../../utils/test";
import userEvent from "@testing-library/user-event";
import WordModal from "../WordModal";
import { rest } from "msw";
import { server } from "../../../mocks/server";

const mockedDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockedDispatch,
}));

const modalData = {
  add: {
    id: 0,
    jp_word: "",
    choices: [
      { id: 1, word: "" },
      { id: 2, word: "" },
      { id: 3, word: "" },
      { id: 4, word: "" },
    ],
  },
  edit: {
    id: 1,
    jp_word: "123",
    choices: [
      { id: 1, word: "123" },
      { id: 2, word: "456" },
      { id: 3, word: "789" },
      { id: 4, word: "101" },
    ],
  },
};

describe("WordModal Test - Add", () => {
  test("initial load", async () => {
    const user = userEvent.setup();
    render(
      <WordModal
        modalData={modalData.add}
        modal={true}
      />
    );
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(5);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });
  test("Missing New Word", async () => {
    const user = userEvent.setup();
    render(
      <WordModal
        modalData={modalData.add}
        modal={true}
      />
    );
    const newWord = screen.getByLabelText(/new word/i);
    const choice0 = screen.getByLabelText(/choice0/i);
    const choice1 = screen.getByLabelText(/choice1/i);
    const choice2 = screen.getByLabelText(/choice2/i);
    const choice3 = screen.getByLabelText(/choice3/i);
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.clear(newWord);
    await user.clear(choice0);
    await user.type(choice0, "1");
    await user.clear(choice1);
    await user.type(choice1, "2");
    await user.clear(choice2);
    await user.type(choice2, "3");
    await user.clear(choice3);
    await user.type(choice3, "4");
    await user.click(submit);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0].textContent).toMatch(/new word is required/i);
    });
  });
  test("Missing choice0", async () => {
    const user = userEvent.setup();
    render(
      <WordModal
        modalData={modalData.add}
        modal={true}
      />
    );
    const newWord = screen.getByLabelText(/new word/i);
    const choice0 = screen.getByLabelText(/choice0/i);
    const choice1 = screen.getByLabelText(/choice1/i);
    const choice2 = screen.getByLabelText(/choice2/i);
    const choice3 = screen.getByLabelText(/choice3/i);
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.clear(newWord);
    await user.type(newWord, "1");
    await user.clear(choice0);
    await user.clear(choice1);
    await user.type(choice1, "2");
    await user.clear(choice2);
    await user.type(choice2, "3");
    await user.clear(choice3);
    await user.type(choice3, "4");
    await user.click(submit);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0].textContent).toMatch(/Answer is required/i);
    });
  });

  test("Missing choice1", async () => {
    const user = userEvent.setup();
    render(
      <WordModal
        modalData={modalData.add}
        modal={true}
      />
    );
    const newWord = screen.getByLabelText(/new word/i);
    const choice0 = screen.getByLabelText(/choice0/i);
    const choice1 = screen.getByLabelText(/choice1/i);
    const choice2 = screen.getByLabelText(/choice2/i);
    const choice3 = screen.getByLabelText(/choice3/i);
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.clear(newWord);
    await user.type(newWord, "1");
    await user.clear(choice0);
    await user.type(choice0, "2");
    await user.clear(choice1);
    await user.clear(choice2);
    await user.type(choice2, "3");
    await user.clear(choice3);
    await user.type(choice3, "4");
    await user.click(submit);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0].textContent).toMatch(/Answer is required/i);
    });
  });
  test("Missing choice2", async () => {
    const user = userEvent.setup();
    render(
      <WordModal
        modalData={modalData.add}
        modal={true}
      />
    );
    const newWord = screen.getByLabelText(/new word/i);
    const choice0 = screen.getByLabelText(/choice0/i);
    const choice1 = screen.getByLabelText(/choice1/i);
    const choice2 = screen.getByLabelText(/choice2/i);
    const choice3 = screen.getByLabelText(/choice3/i);
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.clear(newWord);
    await user.type(newWord, "1");
    await user.clear(choice0);
    await user.type(choice0, "3");
    await user.clear(choice1);
    await user.type(choice1, "2");
    await user.clear(choice2);
    await user.clear(choice3);
    await user.type(choice3, "4");
    await user.click(submit);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0].textContent).toMatch(/Answer is required/i);
    });
  });
  test("Missing choice3", async () => {
    const user = userEvent.setup();
    render(
      <WordModal
        modalData={modalData.add}
        modal={true}
      />
    );
    const newWord = screen.getByLabelText(/new word/i);
    const choice0 = screen.getByLabelText(/choice0/i);
    const choice1 = screen.getByLabelText(/choice1/i);
    const choice2 = screen.getByLabelText(/choice2/i);
    const choice3 = screen.getByLabelText(/choice3/i);
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.clear(newWord);
    await user.type(newWord, "1");
    await user.clear(choice0);
    await user.type(choice0, "4");
    await user.clear(choice1);
    await user.type(choice1, "2");
    await user.clear(choice2);
    await user.type(choice2, "3");
    await user.clear(choice3);
    await user.click(submit);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0].textContent).toMatch(/Answer is required/i);
    });
  });

  test("Duplicate Choice for (choice0 and choice1) and (choice2 and choice3) ", async () => {
    const user = userEvent.setup();
    render(
      <WordModal
        modalData={modalData.add}
        modal={true}
      />
    );
    const newWord = screen.getByLabelText(/new word/i);
    const choice0 = screen.getByLabelText(/choice0/i);
    const choice1 = screen.getByLabelText(/choice1/i);
    const choice2 = screen.getByLabelText(/choice2/i);
    const choice3 = screen.getByLabelText(/choice3/i);
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.clear(newWord);
    await user.type(newWord, "1");
    await user.clear(choice0);
    await user.type(choice0, "1");
    await user.clear(choice1);
    await user.type(choice1, "1");
    await user.clear(choice2);
    await user.type(choice2, "3");
    await user.clear(choice3);
    await user.type(choice3, "3");
    await user.click(submit);

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(4);
      alerts.map((alert) =>
        expect(alert.textContent).toMatch(/Answer must be unique/i)
      );
    });
  });

  test("Word has already been taken", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3001/api/admin/addWord", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ message: "Word already exists" })
        );
      })
    );
    const user = userEvent.setup();
    let isOpen = true;
    let setModal = jest.fn();
    let setModalData = jest.fn();
    let initialModalData = "";
    render(
      <WordModal
        modalData={modalData.add}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );
    const inputs = screen.getAllByRole("textbox");

    const newWord = screen.getByLabelText(/new word/i);
    const choice0 = screen.getByLabelText(/choice0/i);
    const choice1 = screen.getByLabelText(/choice1/i);
    const choice2 = screen.getByLabelText(/choice2/i);
    const choice3 = screen.getByLabelText(/choice3/i);

    await user.clear(newWord);
    await user.type(newWord, "1");
    await user.clear(choice0);
    await user.type(choice0, "1");
    await user.clear(choice1);
    await user.type(choice1, "2");
    await user.clear(choice2);
    await user.type(choice2, "3");
    await user.clear(choice3);
    await user.type(choice3, "4");

    const submit = screen.getByRole("button", { name: /submit/i });
    await user.click(submit);
    waitFor(async () => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts).toHaveLength(1);
      expect(alerts[0]).toBe(/word already exists/i);
      expect(setModal).not.toHaveBeenCalled();
    });
  });
  test("Successfully Add New Word", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3001/api/admin/addWord", (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );
    const user = userEvent.setup();
    let isOpen = true;
    let setModal = jest.fn();
    let setModalData = jest.fn();
    let initialModalData = "";
    render(
      <WordModal
        modalData={modalData.add}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );
    const inputs = screen.getAllByRole("textbox");

    const newWord = screen.getByLabelText(/new word/i);
    const choice0 = screen.getByLabelText(/choice0/i);
    const choice1 = screen.getByLabelText(/choice1/i);
    const choice2 = screen.getByLabelText(/choice2/i);
    const choice3 = screen.getByLabelText(/choice3/i);

    await user.clear(newWord);
    await user.type(newWord, "1");
    await user.clear(choice0);
    await user.type(choice0, "1");
    await user.clear(choice1);
    await user.type(choice1, "2");
    await user.clear(choice2);
    await user.type(choice2, "3");
    await user.clear(choice3);
    await user.type(choice3, "4");

    const submit = screen.getByRole("button", { name: /submit/i });
    await user.click(submit);
    waitFor(async () => {
      expect(setModal).toHaveBeenCalled();
    });
  });
  test("Close modal", async () => {
    const user = userEvent.setup();
    let isOpen = true;
    let setModal = jest.fn();
    let setModalData = jest.fn();
    let initialModalData = "";

    const { rerender } = render(
      <WordModal
        modalData={modalData.edit}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(5);

    const closeButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(closeButton);
    isOpen = false;
    rerender(
      <WordModal
        modalData={modalData.add}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );

    await waitFor(() => {
      const inputs = screen.queryAllByRole("textbox");
      expect(inputs).toHaveLength(0);
    });
  });
});

describe("WordModal Test - Edit", () => {
  test("initial load w/ preloaded words", async () => {
    const user = userEvent.setup();
    let isOpen = true;
    let setModal = jest.fn();
    let setModalData = jest.fn();
    let initialModalData = "";
    render(
      <WordModal
        modalData={modalData.edit}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
    const newWord = screen.getByLabelText(/new word/i);
    const choice0 = screen.getByLabelText(/choice0/i);
    const choice1 = screen.getByLabelText(/choice1/i);
    const choice2 = screen.getByLabelText(/choice2/i);
    const choice3 = screen.getByLabelText(/choice3/i);
    expect(newWord.value).toBe("123");
    expect(choice0.value).toBe("123");
    expect(choice1.value).toBe("456");
    expect(choice2.value).toBe("789");
    expect(choice3.value).toBe("101");
  });

  test("Submit immediately", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3001/api/admin/editWord", (req, res, ctx) => {
        return res(ctx.status(200));
      })
    );
    const user = userEvent.setup();
    let isOpen = true;
    let setModal = jest.fn();
    let setModalData = jest.fn();
    let initialModalData = "";

    render(
      <WordModal
        modalData={modalData.edit}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );

    const submit = screen.getByRole("button", { name: /submit/i });
    await user.click(submit);
  });
  test("Submit an existing word", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3001/api/admin/editWord", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ message: "Word already exists" })
        );
      })
    );
    const user = userEvent.setup();
    let isOpen = true;
    let setModal = jest.fn();
    let setModalData = jest.fn();
    let initialModalData = "";

    render(
      <WordModal
        modalData={modalData.edit}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );

    const newWord = screen.getByLabelText(/new word/i);
    await user.clear(newWord);
    await user.type(newWord, "123");

    const submit = screen.getByRole("button", { name: /submit/i });
    await user.click(submit);

    waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toBe(/word already exists/i);
    });
  });
  test("Change a choice to be duplicated", async () => {
    const user = userEvent.setup();
    let isOpen = true;
    let setModal = jest.fn();
    let setModalData = jest.fn();
    let initialModalData = "";

    render(
      <WordModal
        modalData={modalData.edit}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );

    const choice1 = screen.getByLabelText(/choice1/i);
    await user.clear(choice1);
    await user.type(choice1, "123");

    const submit = screen.getByRole("button", { name: /submit/i });
    await user.click(submit);

    waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      alerts.map((alert) => expect(alert).toBe(/answer must be unique/i));
    });
  });
  test("Close modal", async () => {
    const user = userEvent.setup();
    let isOpen = true;
    let setModal = jest.fn();
    let setModalData = jest.fn();
    let initialModalData = "";

    const { rerender } = render(
      <WordModal
        modalData={modalData.edit}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(5);

    const closeButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(closeButton);
    isOpen = false;
    rerender(
      <WordModal
        modalData={modalData.edit}
        modal={isOpen}
        setModal={setModal}
        setModalData={setModalData}
        initialModalData={initialModalData}
      />
    );

    await waitFor(() => {
      const inputs = screen.queryAllByRole("textbox");
      expect(inputs).toHaveLength(0);
    });
  });
});
