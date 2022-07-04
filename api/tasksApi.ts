import express from "express";
import { ObjectId } from "mongodb";
import TaskDb from "../db/tasksDb";
import TaskCreateRequestDto from "./dtos/taskCreateRequestDto";
import TaskUpdateRequestDto from "./dtos/taskUpdateRequestDto";
import STATUS_CODES from "./statusCodes";
import { TypedRequestBody, TypedRequestBodyAndParams } from "./types";

const taskApi = express.Router();
const taskDb = new TaskDb();

taskApi.get("/", async (req, res) => {
  const tasks = await taskDb.getAll();
  res.send(tasks);
});

taskApi.post("/", async (req: TypedRequestBody<TaskCreateRequestDto>, res) => {
  const insertedId = await taskDb.insert({ ...req.body });
  res.status(STATUS_CODES.CREATED);
  res.send(insertedId);
});

taskApi.put(
  "/:id",
  async (
    req: TypedRequestBodyAndParams<{ id: string }, TaskUpdateRequestDto>,
    res
  ) => {
    const id = req.params.id;
    await taskDb.update(new ObjectId(id), { ...req.body });
    res.status(STATUS_CODES.NO_CONTENT);
    res.send();
  }
);

taskApi.delete("/:id", async (req: TypedRequestBody<{ id: string }>, res) => {
  const id = req.params.id;
  await taskDb.delete(new ObjectId(id));
  res.status(STATUS_CODES.NO_CONTENT);
  res.send();
});

export default taskApi;
