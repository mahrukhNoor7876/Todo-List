#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
let todos = [];
let condition = true;
let condition2 = true;
console.log(chalk.yellowBright.underline("\t\t\tTodo list\n"));
while (condition) {
    let addTask = await inquirer.prompt([
        {
            message: "What do you want to add in your todos: ",
            name: "todo",
            type: "input",
            transformer: (input) => {
                return chalk.cyan(input);
            }
        }
    ]);
    //if todos=="", it's shows an error message 
    if (addTask.todo.trim() === "") {
        console.log(chalk.red("Please enter any string"));
    }
    //otherwise the user input will be store in an array.
    //and at the same time it will also ask the user for add more todos
    else {
        todos.push(addTask.todo);
        let confirm = await inquirer.prompt([
            {
                message: "Do you want to add more: ",
                name: "addMore",
                type: "confirm",
                default: false
            }
        ]);
        condition = confirm.addMore;
    }
}
//This loop is used for options view, delete, update and exit
while (condition2) {
    let optionAns = await inquirer.prompt([
        {
            message: "Please select an option: ",
            name: "option",
            type: "list",
            choices: ["View", "Delete", "Update", "Exit"]
        }
    ]);
    //This if tells that any value is store in todos or not
    if (todos.length > 0) {
        if (optionAns.option === "View") {
            console.log(chalk.underline.cyanBright("\nYour final todos are\n"));
            todos.forEach((element, i) => {
                console.log(`${i + 1}`, chalk.greenBright(`${element}`));
            });
        }
        else if (optionAns.option === "Delete") {
            let deleteTodo = await inquirer.prompt([
                {
                    message: "Select item to delete: ",
                    name: "delete",
                    type: "list",
                    choices: todos.map(item => item)
                }
            ]);
            let newTodos = todos.filter(val => val != deleteTodo.delete);
            todos = [...newTodos];
        }
        else if (optionAns.option === "Update") {
            let updateTodo = await inquirer.prompt([
                {
                    message: "Select item for update: ",
                    name: "update",
                    type: "list",
                    choices: todos.map(item => item)
                },
                {
                    message: "What do you want to add in your todos: ",
                    name: "todo",
                    type: "input",
                    transformer: (input) => {
                        return chalk.cyan(input);
                    }
                }
            ]);
            if (updateTodo.todo.trim() === "") {
                console.log(chalk.red("Please enter any string"));
            }
            else {
                let newTodos = todos.filter(val => val != updateTodo.update);
                todos = [...newTodos, updateTodo.todo];
            }
        }
        else if (optionAns.option === "Exit") {
            condition2 = false;
        }
    }
    else if (optionAns.option === "Exit") {
        condition2 = false;
    }
    else {
        console.log(chalk.red("No todos found!"));
    }
}
