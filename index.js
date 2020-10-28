const inquirer = require("inquirer");
const questions = require("./lib/questions");
const queryHandler = require("./db/db");
const cTable = require("console.table");

// Functions

async function menuHandler() {
    let response = await inquirer.prompt(questions.menu)
    response = response.choice.toLowerCase().split(" ")
    if (response.includes('displaying')) {
        return await viewAllHandler(response)
    }
    if (response.includes("add")) {
        return await addEntryHandler(response[2])
    }
    if (response.includes("update")) {
        return await updateRole()
    }
    console.log("Done")
    return
};
async function viewAllHandler(response) {
    console.log("\n")
    let result
    if (response.includes("departments")) {
        result = await queryHandler.getAll('department')
        console.table(result)
        return await done()
    }
    if (response.includes('roles')) {
        result = await queryHandler.showAllRoles()
        console.table(result)
        return await done()
    }
    if (response.includes('employees')) {
        try {
            result = await queryHandler.showAllEmployees()
        } catch (err) {
            console.log("Error was found", err);
        }

        console.table(result)
        return await done()
    }
};
async function addEntryHandler(table) {
    if (table === 'department') {
        return await addDepartment()
    }
    if (table === 'role') {
        return await addRole()
    }
    if (table === 'employee') {
        return await addEmployee()
    }
};
async function addDepartment() {
    let response = await inquirer.prompt(questions.department)
    await queryHandler.addRecord('department', `name="${response.name}"`)
    console.log("\nDepartment added!")
    return await done()
}
async function addRole() {
    let question = questions.role
    const departments = await queryHandler.getAll('department')
    for (department of departments) {
        question[2].choices.push(department.name)
    }
    const response = await inquirer.prompt(question)
    for (department of departments) {
        if (department.name === response.department) {
            response.departmentID = department.id
            break
        }
    }
    await queryHandler.addRecord('role', `title="${response.name}", salary=${response.salary}, department_id=${response.departmentID}`)
    return await done()
};
async function addEmployee() {
    let question = questions.employee
    const roles = await queryHandler.getAll('role')
    const employees = await queryHandler.getAll('employee')
    let idTracker = {}
    for (role of roles) {
        question[2].choices.push(role.title)
        idTracker[role.title] = role.id
    }
    for (employee of employees) {
        let answerString = `${employee.first_name} ${employee.last_name} Employee ID: ${employee.id}`
        question[3].choices.push(answerString)
        idTracker[[answerString]] = employee.id
    }
    question[3].choices.push('None')
    idTracker['None'] = null
    const response = await inquirer.prompt(question)
    question[2].choices, question[3].choices = []
    response.roleID = idTracker[response.role]
    response.managerID = idTracker[response.manager]
    await queryHandler.addRecord(
        'employee',
        `first_name="${response.first_name}",last_name="${response.last_name}",role_id=${response.roleID},manager_id=${response.managerID}`
    )
    return await done()
};
async function updateRole() {
    let question = questions.updateRole
    const employees = await queryHandler.getAll('employee')
    const roles = await queryHandler.getAll('role')
    let idTracker = {}
    for (employee of employees) {
        let answerString = `${employee.first_name} ${employee.last_name} Employee ID: ${employee.id}`
        question[0].choices.push(answerString)
        idTracker[[answerString]] = employee.id
    }
    for (role of roles) {
        question[1].choices.push(role.title)
        idTracker[role.title] = role.id
    }
    const response = await inquirer.prompt(question)
    question[0].choices, question[1].choices = []
    await queryHandler.updateRecord(
        'employee',
        `role_id=${idTracker[response.role]}`,
        idTracker[response.employee]
    )
    return await done()
};
async function done() {
    await inquirer.prompt(questions.done)
    console.log("\n")
    return await menuHandler()
};

menuHandler();
