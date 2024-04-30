import Column from "@/components/Column.tsx";
import BoardWrapperBox from "@/components/styled/Board.tsx";
const Board = () => {
  return (
    <BoardWrapperBox>
      <Column title="TO DO" column="todo" />
      <Column title="In progress" column="in_progress" />
      <Column title="Done" column="done" />
    </BoardWrapperBox>
  );
};

export default Board;
