import express from "express";
import taskApi from "./api/tasksApi";

const app = express();

app.use(express.json());

app.use("/tasks", taskApi);

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
