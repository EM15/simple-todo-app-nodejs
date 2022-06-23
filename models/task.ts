import Document from "mongodb";

interface Task extends Document {
  description: string;
}

export default Task;
