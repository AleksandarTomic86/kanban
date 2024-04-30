import { render } from "@/tests/test-utils";
import DropMark from "@/components/DropMark";

describe("DropMark component", () => {
  it("renders with null beforeId", () => {
    const { getByTestId } = render(<DropMark beforeId={null} column="todo" />);
    const dropMark = getByTestId("drop-mark");

    expect(dropMark).toBeInTheDocument();
    expect(dropMark).toHaveAttribute("data-before", "-1");
    expect(dropMark).toHaveAttribute("data-column", "todo");
  });

  it("renders with valid beforeId", () => {
    const { getByTestId } = render(<DropMark beforeId="1" column="todo" />);
    const dropMark = getByTestId("drop-mark");

    expect(dropMark).toBeInTheDocument();
    expect(dropMark).toHaveAttribute("data-before", "1");
    expect(dropMark).toHaveAttribute("data-column", "todo");
  });

  it("renders with different column", () => {
    const { getByTestId } = render(<DropMark beforeId="1" column="in_progress" />);
    const dropMark = getByTestId("drop-mark");

    expect(dropMark).toBeInTheDocument();
    expect(dropMark).toHaveAttribute("data-before", "1");
    expect(dropMark).toHaveAttribute("data-column", "in_progress");
  });
});
