import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Homepage from "../Homepage";
describe("Homepage Tests", () => {
  test("Initial Load", () => {
    const user = userEvent.setup();
    render(<Homepage />);
    const header = screen.getByRole("heading", { name: /homepage/i });
    expect(header).toHaveTextContent(/homepage/i);
  });
});
