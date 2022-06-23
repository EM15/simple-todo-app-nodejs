import express from "express";
import taskApiRouter from "./api/tasksApi";

const app = express();

app.use("/tasks", taskApiRouter);

app.listen(3000, () => {
  console.log("The application is listening on port 3000!");
});
