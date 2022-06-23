import { ObjectId } from "mongodb";

interface Task {
  _id: ObjectId;
  description: string;
}

export default Task;
