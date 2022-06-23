import express from "express";
import { MongoClient } from "mongodb";
import Task from "../models/task";
import { TypedRequestBody } from "./typedRequestBody";

const taskApiRouter = express.Router();
const client = new MongoClient("mongodb://localhost:27017/");

taskApiRouter.get("/", async (req, res) => {
  await client.connect();
  const tasks = await client
    .db("simple-todo")
    .collection("tasks")
    .find<Task>({})
    .toArray();

  res.send(tasks);
});

taskApiRouter.post("/", async (req: TypedRequestBody<Task>, res) => {
  res.status(201);
  res.send(req);
});

export default taskApiRouter;
