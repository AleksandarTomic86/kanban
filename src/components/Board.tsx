import styles from "@/components/Kanban.module.css";
import Column from "@/components/Column.tsx";

const Board = () => {
  return (
    <div className={styles.board}>
      <Column title="TO DO" column="todo" />
      <Column title="In progress" column="in_progress" />
      <Column title="Done" column="done" />
    </div>
  );
};

export default Board;
