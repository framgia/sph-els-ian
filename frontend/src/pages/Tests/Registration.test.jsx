import { render, screen, waitFor } from "../../utils/test";
import userEvent from "@testing-library/user-event";
import Register from "../Register";
import { server } from "../../mocks/server";
import { rest } from "msw";
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Registration Tests", () => {
  test("Initial Load", () => {
    render(<Register />);
    const userInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passInput = screen.getByLabelText(/^password/i);
    const confirmPassInput = screen.getByLabelText(/confirm password/i);
    const registerInput = screen.getByRole("button", { name: /register/i });
  });
  test("Missing Username", async () => {
    const user = userEvent.setup();
    render(<Register />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/^password/i);
    const confirmPassInput = screen.getByLabelText(/confirm password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const registerInput = screen.getByRole("button", { name: /register/i });

    await user.clear(userInput);

    await user.clear(emailInput);
    await user.type(emailInput, "ian@gmail.com");

    await user.clear(passInput);
    await user.type(passInput, "123");

    await user.clear(confirmPassInput);
    await user.type(confirmPassInput, "123");

    await user.click(registerInput);

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
  });
  test("Missing Email", async () => {
    const user = userEvent.setup();
    render(<Register />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/^password/i);
    const confirmPassInput = screen.getByLabelText(/confirm password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const registerInput = screen.getByRole("button", { name: /register/i });

    await user.clear(userInput);
    await user.type(userInput, "ian");

    await user.clear(emailInput);

    await user.clear(passInput);
    await user.type(passInput, "123");

    await user.clear(confirmPassInput);
    await user.type(confirmPassInput, "123");

    await user.click(registerInput);

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
  });
  test("Wrong Email Format", async () => {
    const user = userEvent.setup();
    render(<Register />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/^password/i);
    const confirmPassInput = screen.getByLabelText(/confirm password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const registerInput = screen.getByRole("button", { name: /register/i });

    await user.clear(userInput);
    await user.type(userInput, "ian");

    await user.clear(emailInput);
    await user.type(emailInput, "gmail.com");

    await user.clear(passInput);
    await user.type(passInput, "123");

    await user.clear(confirmPassInput);
    await user.type(confirmPassInput, "123");

    await user.click(registerInput);

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
  });
  test("Missing Password", async () => {
    const user = userEvent.setup();
    render(<Register />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/^password/i);
    const confirmPassInput = screen.getByLabelText(/confirm password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const registerInput = screen.getByRole("button", { name: /register/i });

    await user.clear(userInput);
    await user.type(userInput, "ian");

    await user.clear(emailInput);
    await user.type(emailInput, "ian@gmail.com");

    await user.clear(passInput);

    await user.clear(confirmPassInput);
    await user.type(confirmPassInput, "123");

    await user.click(registerInput);

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
  test("Missing Confirm Password", async () => {
    const user = userEvent.setup();
    render(<Register />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/^password/i);
    const confirmPassInput = screen.getByLabelText(/confirm password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const registerInput = screen.getByRole("button", { name: /register/i });

    await user.clear(userInput);
    await user.type(userInput, "ian");

    await user.clear(emailInput);
    await user.type(emailInput, "ian@gmail.com");

    await user.clear(passInput);
    await user.type(passInput, "123");

    await user.clear(confirmPassInput);

    await user.click(registerInput);

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
  });
  test("Mismatch Password & Confirm Password", async () => {
    const user = userEvent.setup();
    render(<Register />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/^password/i);
    const confirmPassInput = screen.getByLabelText(/confirm password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const registerInput = screen.getByRole("button", { name: /register/i });

    await user.clear(userInput);
    await user.type(userInput, "ian");

    await user.clear(emailInput);
    await user.type(emailInput, "ian@gmail.com");

    await user.clear(passInput);
    await user.type(passInput, "123");

    await user.clear(confirmPassInput);
    await user.type(confirmPassInput, "1234");

    await user.click(registerInput);

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(1);
  });
  test("Username already taken", async () => {
    server.resetHandlers(
      rest.post("http://localhost:3001/api/auth/register", (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ message: "User already exists" })
        );
      })
    );
    const user = userEvent.setup();
    render(<Register />);
    const userInput = screen.getByLabelText(/username/i);
    const passInput = screen.getByLabelText(/^password/i);
    const confirmPassInput = screen.getByLabelText(/confirm password/i);
    const emailInput = screen.getByLabelText(/email/i);
    const registerInput = screen.getByRole("button", { name: /register/i });

    await user.clear(userInput);
    await user.type(userInput, "ian");

    await user.clear(emailInput);
    await user.type(emailInput, "ian@gmail.com");

    await user.clear(passInput);
    await user.type(passInput, "123");

    await user.clear(confirmPassInput);
    await user.type(confirmPassInput, "123");

    await user.click(registerInput);

    const alerts = await screen.findByText(/User already exists/i);
  });
});
