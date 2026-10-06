import express from "express";
import { getEmployee, getEmployees, getRandomEmployee } from "#db/employees";
import employeeRouter from "./api/employees.js";

const app = express();
export default app;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeeRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Database error occured.");
});
