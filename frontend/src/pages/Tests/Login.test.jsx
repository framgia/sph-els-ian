import { render, screen } from "../../utils/test";
import userEvent from "@testing-library/user-event";
import Login from "../Login";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Homepage Tests", () => {
  test("Initial Load", async () => {
    render(<Login />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByRole("button", { name: /login/i });
  });
  test("No Username on Submit", async () => {
    const user = userEvent.setup();
    render(<Login />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByRole("button", { name: /login/i });

    await user.clear(userInput);
    await user.clear(passInput);
    await user.type(passInput, "1234");
    await user.click(submitInput);
    const alert = await screen.findAllByRole("alert");
    expect(alert).toHaveLength(1);
  });
  test("No Password on Submit", async () => {
    const user = userEvent.setup();
    render(<Login />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByRole("button", { name: /login/i });

    await user.clear(userInput);
    await user.type(userInput, "1234");
    await user.clear(passInput);
    await user.click(submitInput);
    const alert = await screen.findAllByRole("alert");
    expect(alert).toHaveLength(1);
  });
  test("Both inputs empty", async () => {
    const user = userEvent.setup();
    render(<Login />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/password/i);
    const submitInput = screen.getByRole("button", { name: /login/i });

    await user.clear(userInput);
    await user.clear(passInput);
    await user.click(submitInput);
    const alert = await screen.findAllByRole("alert");
    expect(alert).toHaveLength(2);
  });
});
