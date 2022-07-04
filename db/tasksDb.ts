import { MongoClient, ObjectId } from "mongodb";
import Task from "../models/task";

export default class TaskDb {
  private client = new MongoClient("mongodb://localhost:27017/");

  public async getAll() {
    const collection = await this.getCollection();
    return collection.find().toArray();
  }

  public async insert(task: Omit<Task, "_id">) {
    const collection = await this.getCollection();
    const result = await collection.insertOne({ ...task, _id: new ObjectId() });
    return result.insertedId;
  }

  public async update(_id: ObjectId, task: Partial<Omit<Task, "_id">>) {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { _id },
      {
        $set: { ...task },
      }
    );
    return result;
  }

  public async delete(_id: ObjectId) {
    const collection = await this.getCollection();
    await collection.deleteOne({ _id });
  }

  private async getCollection() {
    await this.client.connect();
    return this.client.db("simple-todo").collection<Task>("tasks");
  }
}
