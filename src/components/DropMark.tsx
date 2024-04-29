import styles from "@/components/Kanban.module.css";

interface DropMarkProps {
  beforeId: string | null;
  column: string;
}
const DropMark = ({ beforeId, column }: DropMarkProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className={styles.dropMark}
    />
  );
};

export default DropMark;
