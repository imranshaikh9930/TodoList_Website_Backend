const express = require("express");
const {createTask,getTasks,getSingleTask,updateTask,deleteTask} = require("../controllers/task.controller");

const router = express();

router.post("/",createTask);
router.get("/",getTasks);
router.get("/:id",getSingleTask);
router.put("/:id",updateTask);
router.delete("/:id",deleteTask);

module.exports = router;




