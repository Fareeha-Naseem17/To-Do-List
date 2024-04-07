#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let taskList = [];
let condition = true;
console.log(chalk.blue("\n \t Welcome to the To-Do List Application!\n"));
async function addTask() {
    let addTask = await inquirer.prompt([
        {
            name: "add",
            type: "input",
            message: chalk.magentaBright("What would you like to add to your To-Do List?"),
            validate: (input) => {
                if (input.trim() === "") {
                    return "Please add text.";
                }
                return true;
            },
        },
    ]);
    taskList.push(addTask.add);
    console.log(chalk.green("\n \tTask has been Successfully Added!\n"));
}
async function removeTask() {
    let removeTaskChoice = await inquirer.prompt({
        name: "taskRemove",
        type: "list",
        message: chalk.bold("Select a Task to Delete:"),
        choices: taskList,
    });
    const indexToRemove = taskList.indexOf(removeTaskChoice.taskRemove);
    if (indexToRemove !== -1) {
        taskList.splice(indexToRemove, 1);
        console.log(chalk.green("\n \tTask has been Successfully Deleted!\n"));
    }
}
async function updateTask() {
    let updateChoice = await inquirer.prompt([
        {
            name: "taskToUpdate",
            type: "list",
            message: chalk.bold("Select a Task to Update:"),
            choices: taskList,
        },
        {
            name: "newtask",
            type: "input",
            message: chalk.bold("Enter the new value for the Selected Task:"),
        },
    ]);
    const indexToUpdate = taskList.indexOf(updateChoice.taskToUpdate);
    if (indexToUpdate !== -1) {
        taskList[indexToUpdate] = updateChoice.newtask;
        console.log(chalk.green("\n \tTask has been Successfully Updated!\n"));
    }
}
async function viewTask() {
    console.log(chalk.blueBright("\n \tYour To-Do List:\n"));
    taskList.forEach((task) => {
        console.log("-" + task);
    });
}
async function main() {
    let options = [
        "Add Task",
        "Update Task",
        "Delete Task",
        "View To-do List",
        "Exit",
    ];
    let choice = "";
    while (choice !== "Exit") {
        let choiceObj = await inquirer.prompt({
            name: "option",
            type: "list",
            message: chalk.yellowBright("Choose an option:"),
            choices: options,
        });
        choice = choiceObj.option;
        switch (choice) {
            case "Add Task":
                await addTask();
                break;
            case "Update Task":
                await updateTask();
                break;
            case "Delete Task":
                await removeTask();
                break;
            case "View To-do List":
                await viewTask();
                break;
            case "Exit":
                console.log(chalk.magentaBright("\n \tTHANK YOU FOR USING TO-DO LIST APPLICATION! HAVE A GOOD DAY!\n"));
                break;
            default:
                console.log(chalk.red("Invalid option."));
        }
    }
}
main();
