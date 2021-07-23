import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const url = process.env.DATABASE_URL!;

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    res.status(502).json({ message: "Could not connected to database." });
    return;
  }

  const taskSchema = new mongoose.Schema({
    data: String,
  });

  const TaskData =
    mongoose.models.TaskData || mongoose.model("TaskData", taskSchema);

  if (req.method === "POST") {
    const resTaskData = JSON.stringify(req.body.data);

    if (req.body.id) {
      const id = req.body.id;
      try {
        const data = await TaskData.findOneAndUpdate(
          { _id: id },
          { data: resTaskData },
          { useFindAndModify: false }
        );

        res.status(200).json({ message: "Successfully update data", data });
      } catch (err) {
        res.status(500).json({ message: "Problem while updating data" });
      }
      return;
    }

    const task = new TaskData({ data: resTaskData });

    try {
      await task.save();
    } catch (err) {
      res.status(500).json({ message: "Storing Data Failed." });

      return;
    }

    res.status(201).json({
      message: "Data Stored Successfully",
      data: resTaskData,
      id: task._id,
    });
  }

  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const data = await TaskData.findById(id);

      res.status(200).json({ message: "Successfully retrive data", data });
    } catch (err) {
      res.status(500).json({ message: "Error while finding data" });
    }
  }
};
