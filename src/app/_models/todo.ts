export interface Todo {
  id: number;
  userId: number;
  taskName: string;
  isComplete: boolean;
  isImportant: boolean;
  isInTodayView: boolean;
  note: string;
  remindMeDateTime: Date;
  taskLastDateTime: Date;
  createdAtDateTime: Date;
  lastUpdatedAtDateTime: Date;
}
