class Employee {
    constructor(id, name, courseName, email, startDay, action) {
        this.id = id;
        this.name = name;
        this.courseName = courseName;
        this.email = email;
        this.startDay = startDay;
        this.action = action
    }
}

let employees = [];

const employee_data = "employee_data";

function init() {
    if (localStorage.getItem(employee_data) == null) {
        employees = [
            new Employee(1, 'Roger', 'Java', 'roger@gmail.com', '2023-01-06'),
            new Employee(2, 'Dove', 'PHP', 'dove@gmail.com', '2021-05-18'),
            new Employee(3, 'John', 'C++', 'john@gmail.com', '2022-09-10'),
            new Employee(4, 'HachCo', 'C++', 'hachco@gmail.com', '2022-01-15'),
            new Employee(5, 'Mike', 'Java', 'mike@gmail.com', '2021-03-08'),
            new Employee(6, 'Phat', 'PHP', 'phat@gmail.com', '2020-06-19'),
        ]
        localStorage.setItem(employee_data, JSON.stringify(employees));
    }
    else {
        employees = JSON.parse(localStorage.getItem(employee_data));
    }
}

function renderEmployee() {
    let tbEmployee = document.getElementById('tbodyemp');
    tbEmployee.innerHTML = "";
    for (let i = 0; i < employees.length; i++) {
        tbEmployee.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${employees[i].name}</td>
                <td>${employees[i].courseName}</td>
                <td>${employees[i].email}</td>
                <td>${employees[i].startDay}</td>
                <td><button class="btn edit" onclick="tbEdit(${employees[i].id})">Edit</button><button class="btn delete" onclick="tbDelete(${employees[i].id})">Delete</button></td>
            </tr>
        `;
    }
}

function submitEmployee() {
    let name = document.getElementById('nameEmp').value;
    let courseName = document.getElementById('courseEmp').value;
    let startDay = document.getElementById('daysEmp').value;
    let email = document.getElementById('emailEmp').value;
    if (name == "" || courseName == "" || startDay == "" || email == "") {
        alert("Please check your information again, you're still missing something.")
    }
    else {
        let id = findMaxId() + 1;
        let employee = new Employee(id, name, courseName, email, startDay);
        employees.push(employee);
        localStorage.setItem(employee_data, JSON.stringify(employees));
        renderEmployee();
        clearForm();
    }
}
function findMaxId() {
    let max = 0;
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id > max) {
            max = employees[i].id
        }
    }
    return max;
}

function clearForm() {
    document.getElementById('nameEmp').value = "";
    document.getElementById('courseEmp').value = "";
    document.getElementById('daysEmp').value = "";
    document.getElementById('emailEmp').value = "";

}

function tbEdit(employeesID) {
    let employees = findEmployeeById(employeesID);
    document.getElementById('nameEmp').value = employees.name;
    document.getElementById('courseEmp').value = employees.courseName;
    document.getElementById('daysEmp').value = employees.startDay;
    document.getElementById('emailEmp').value = employees.email;
    localStorage.setItem(employee_data, JSON.stringify(employees));
    renderEmployee();
}

function tbDelete(employeesID) {
    let confirm = window.confirm("Are you sure to delete this employee?");
    if (confirm == true) {
        let index = findIndexEmployeeById(employeesID);
        employees.splice(index, 1);
        localStorage.setItem(employee_data, JSON.stringify(employees));
        renderEmployee();
    }
}
function findIndexEmployeeById(employeesID) {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id == employeesID) {
            return i;
        }
    }
    return -1;
}

function findEmployeeById(employeesID) {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id == employeesID) {
            return employees[i];
        }
    }
    return null;
}


init();
renderEmployee()

