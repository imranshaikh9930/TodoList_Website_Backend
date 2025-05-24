const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/tasks.json");

const createTask = (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: "All fields Required" });
    }

    const newTask = {
      id: uuidv4(),
      title: title,
      description: description,
    };

    const data = fs.readFileSync(filePath, "utf-8");
    const tasks = JSON.parse(data);
    tasks.push(newTask);
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

    res
      .status(201)
      .json({ message: "Task Created Successfully", task: newTask });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getTasks = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const search = req.query.search?.toLowerCase() || "";

    const sortBy = req.query.sortBy || "title";
    const order = req.query.order || "asc";

    const data = fs.readFileSync(filePath, "utf-8");
    let tasks = JSON.parse(data);

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
      );
    }

    // Sorting based on title or Id
    tasks.sort((a, b) => {
      if (sortBy == "title") {
        const ta = a.title.toLowerCase();
        const tb = b.title.toLowerCase();
        return order == "asc" ? ta.localeCompare(tb) : tb.localeCompare(ta);
      } else {
        const numA = parseInt(a.id);
        const numB = parseInt(b.id);
        return order == "asc" ? numA - numB : numB - numA;
      }
    });

    //  pagination
    const paginatedTasks = tasks.slice(skip, skip + limit);

    res.status(200).json({
      page,
      limit,
      total: tasks.length,
      tasks: paginatedTasks,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSingleTask = (req, res) => {
  try {
    const { id } = req.params;

    const data = fs.readFileSync(filePath, "utf-8");

    const tasks = JSON.parse(data);

    const task = tasks.find((task) => task.id == id);

    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }

    res.status(200).json({ task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({ message: "All Fields Required" });
    }
    const data = fs.readFileSync(filePath, "utf-8");

    const tasks = JSON.parse(data);

    const task = tasks.find((task) => task.id == id);

    if (!task) {
      return res.status(404).json({ message: "Task not Found" });
    }
    task.title = title;
    task.description = description;

    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
    res.status(200).json({ message: "Task Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTask = (req, res) => {
  try {
    const { id } = req.params;

    const data = fs.readFileSync(filePath, "utf-8");
    const tasks = JSON.parse(data);

    const task = tasks.find((task) => task.id == id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const updateTask = tasks.filter((task) => task.id != id);

    fs.writeFileSync(filePath, JSON.stringify(updateTask, null, 2));

    res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  createTask,
  getTasks,
  getSingleTask,
  updateTask,
  deleteTask,
};
