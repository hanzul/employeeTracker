
// Questionare - inputs

const questions = { 
    menu: {
    type: 'list',
    name: 'choice',
    message: 'select an action?',
    choices: ['Displaying departments','Displaying roles','Displaying employees',
            'Add a department','Add a role','Add an employee',"Update employee's role",'Exit']
    },
    done: {
        type: 'list',
        name: 'done',
        message: 'Done',
        choices: ['Done']
    },
    department: {
            type: 'input',
            name: 'name',
            message: "Add a Department?"
    },
    role: [
        {
            type: 'input',
            name: 'name',
            message: "add a role?"
        },
        {
            type: 'input',
            name: 'salary',
            message: "add a salary's role?",
            validate: validateNumber
        },
        {
            type: 'list',
            name:'department',
            choices:[]
        }
    ],
    employee: [
        {
            type: 'input',
            name: 'first_name',
            message: "employee first name?"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "employee last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "employee's role?",
            choices: []
        },
        {
            type: 'list',
            name: 'manager',
            message: "employee's manager?",
            choices: []
        }
    ],
    updateRole : [
        {
            type: 'list',
            name: 'employee',
            message: "employee's update?",
            choices: []
        },
        {
            type: 'list',
            name: 'role',
            message: "employee's role?",
            choices: []
        }
    ]    
}
function validateNumber(input) {
    if (parseInt(input)) {
        return true;
    } 
    else {
        console.log('\n\nSelect a number.\n');
        return false;
    }
};
module.exports = questions