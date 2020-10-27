// declarations and functions
const mysql = require("mysql2/promise");
const credentials = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employeeDB'
  };

const queryHandler = {
    async getAll(table) {
        const connection = await mysql.createConnection(credentials);
        const [rows, fields] = await connection.execute(`SELECT * FROM ${table}`);
        await connection.close();
        return rows;
    }, 
    async addRecord(table,data) {
        const connection = await mysql.createConnection(credentials);
        await connection.execute(`INSERT INTO ${table} set ${data}`);
        await connection.close();
        return;
    },
    async updateRecord(table,data,id) {
        const connection = await mysql.createConnection(credentials);
        await connection.execute(`UPDATE ${table} SET ${data} WHERE id=${id}`);
        await connection.close();
        return;
    },
    async showAllEmployees() {
        const connection = await mysql.createConnection(credentials);
        const [rows,fields] = await connection.execute(
            `
            SELECT e.id, e.first_name as 'first name', e.last_name as 'last name', r.title as title, 
            d.name as department, r.salary as salary, IFNULL(CONCAT(m.first_name, ' ', m.last_name), 'N/A') as Manager 

            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON m.id = e.manager_id
            `
        )
        await connection.close();
        return rows;
    },
    async showAllRoles() {
        const connection = await mysql.createConnection(credentials);
        const [rows,fields] = await connection.execute(
            `
            SELECT r.title as title, r.id as 'r id', d.name as department, r.salary as salary
            FROM role r
            JOIN department d ON r.department_id = d.id 
            `
        )
            await connection.close();
            return rows;
    }
};

module.exports = queryHandler;
