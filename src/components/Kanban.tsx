import styles from "./Kanban.module.css";
import Board from "@/components/Board.tsx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { setSearch } from "@/redux/ticketsSlice.ts";
import React from "react";

const CustomKanban = () => {
  const search = useAppSelector((state) => state.tickets.search);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <div className={styles.canban}>
      <div className={styles.canbanContent}>
        <div className={styles.searchWrapper}>
          <input type="text" value={search} onChange={handleChange} />
        </div>
        <Board />
      </div>
    </div>
  );
};

export default CustomKanban;
