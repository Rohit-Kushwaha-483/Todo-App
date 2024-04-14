import { Task } from "../models/task.model.js";
import { sendApiError, sendSuccessResponse } from "../utils/apiResponse.js";

export const newTask = async (req, res, next) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, user: req.user });

  sendSuccessResponse(res, 201, "Task Added Successfully !");
};

export const getMyTask = async (req, res, next) => {
  const userID = req.user._id;

  const tasks = await Task.find({ user: userID });
  res.status(200).json({
    success: true,
    message: `Number of Task found : ${tasks.length}`,
    tasks,
  });
};

export const updateMyTask = async (req, res, next) => {
  try {
    // Extract task ID from request parameters
    const { id } = req.params;

    // Find the task by its ID
    const task = await Task.findById(id);

    // If task with given ID is not found, return 404 error response
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
    }

    // Toggle the 'isCompleted' property of the task
    task.isCompleted = !task.isCompleted;

    // Save the updated task
    await task.save();

    // Return success response with status 200 and a message indicating task was updated

    sendSuccessResponse(res, 200, "Task Updated");
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);

    // Return 500 error response if an error occurs
    sendApiError(res, 500, "Internal server error");
  }
};

export const deleteMyTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return sendApiError(res, 404, "Task not found");
    }
    await Task.deleteOne({ _id: id }); // Using deleteOne to delete the task
    sendSuccessResponse(res, 200, "Task Deleted");
  } catch (error) {
    // Handle any errors
    console.error(error);
    sendApiError(res, 500, `Internal server error `);
  }
};
