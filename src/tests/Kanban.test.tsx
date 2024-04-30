import Kanban from "@/components/Kanban.tsx";
import { render, fireEvent } from "@/tests/test-utils";

describe("Kanban Component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Kanban />);
    expect(getByTestId("kanban")).toBeInTheDocument();
  });

  it("handles input change", () => {
    const { getByTestId } = render(<Kanban />);
    const input = getByTestId("search-input") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });
    expect(input.value).toBe("test");
  });

  it("renders Board component", () => {
    const { getByTestId } = render(<Kanban />);
    expect(getByTestId("board")).toBeInTheDocument();
  });
});
