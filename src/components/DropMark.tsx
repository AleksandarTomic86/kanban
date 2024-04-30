import StyledDropMark from "@/components/styled/DropMark.tsx";

interface Props {
  beforeId: string | null;
  column: string;
}
const DropMark = ({ beforeId, column }: Props) => {
  return <StyledDropMark data-before={beforeId || "-1"} data-column={column} data-testid={"drop-mark"} />;
};

export default DropMark;
