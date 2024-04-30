import Column from "@/components/Column.tsx";
import BoardWrapperBox from "@/components/styled/Board.tsx";
const Board = () => {
  return (
    <BoardWrapperBox data-testid={"board"}>
      <Column title="To Do" column="todo" />
      <Column title="In Progress" column="in_progress" />
      <Column title="Done" column="done" />
    </BoardWrapperBox>
  );
};

export default Board;
