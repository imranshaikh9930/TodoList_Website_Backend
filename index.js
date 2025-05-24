const express = require("express");
const taskRoute = require("./routes/task.route");

const app = express();

app.use(express.json());

app.use("/api/tasks",taskRoute);

app.listen(5001,()=>{

    console.log("Server Running Port",5001);
})