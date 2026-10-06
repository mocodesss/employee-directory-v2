import express from "express";
import {
  getEmployees,
  getRandomEmployee,
  getEmployee,
  addEmployee,
} from "../db/employees.js";

const employeeRouter = express.Router();

// url /employees
employeeRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send(getEmployees());
  })
  .post((req, res) => {
    if (!req.body) {
      res.status(400).send("Body not correctly provided");
    }

    const { name } = req.body;
    if (!name) {
      res.status(400).send("Name is not correctly provided in body");
    }

    console.log("req.body: ", req.body);

    const newEmployee = addEmployee(req.body);
    console.log("newEmployee", newEmployee);
    res.status(201).send(newEmployee);
  });

// url /employees/random
employeeRouter.route("/random").get((req, res) => {
  res.send(getRandomEmployee());
});

// url /employees/:id
employeeRouter.route("/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = getEmployee(Number(id));

  if (!employee) {
    return res.status(404).send(`Employee #${id} not found.`);
  }

  res.send(employee);
});

export default employeeRouter;
