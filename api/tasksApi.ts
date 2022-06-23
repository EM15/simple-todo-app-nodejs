import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import Task from "../models/task";
import TaskCreateRequestDto from "./dtos/taskCreateRequestDto";
import TaskUpdateRequestDto from "./dtos/taskUpdateRequestDto";
import { TypedRequestBody, TypedRequestBodyAndParams } from "./types";

const taskApi = express.Router();
const client = new MongoClient("mongodb://localhost:27017/");

taskApi.get("/", async (req, res) => {
  await client.connect();
  const tasks = await client
    .db("simple-todo")
    .collection<Task>("tasks")
    .find()
    .toArray();

  res.send(tasks);
});

taskApi.post("/", async (req: TypedRequestBody<TaskCreateRequestDto>, res) => {
  console.log(req.body);
  await client.connect();
  const result = await client
    .db("simple-todo")
    .collection<Task>("tasks")
    .insertOne({ _id: new ObjectId(), description: req.body.description });

  res.status(201);
  res.send(result.insertedId);
});

taskApi.put(
  "/:id",
  async (
    req: TypedRequestBodyAndParams<{ id: string }, TaskUpdateRequestDto>,
    res
  ) => {
    const id = req.params.id;
    await client.connect();
    await client
      .db("simple-todo")
      .collection<Task>("tasks")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: { description: req.body.description },
        }
      );

    res.status(204);
    res.send();
  }
);

export default taskApi;
