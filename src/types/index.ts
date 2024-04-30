export type ColumnType = "todo" | "in_progress" | "done";
export interface ITicket {
  text: string;
  id: string;
  column: ColumnType;
}
export interface IMark {
  offset: number;
  element: HTMLElement;
}
