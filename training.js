class Employee {
    constructor(id, name, courseName, courseProvider, daysWorked, status) {
        this.id = id;
        this.name = name;
        this.courseName = courseName;
        this.courseProvider = courseProvider;
        this.daysWorked = daysWorked;
        this.status = status
    }
}

let employees = [];

const employee_data = "employee_data";

function init() {
    if (localStorage.getItem(employee_data) == null) {
        employees = [
            new Employee(1, 'Roger', 'Java', 'ABC Tech', 12, 'Pending'),
            new Employee(2, 'Mike', 'PHP', 'ABC Tech', 7, 'Pending'),
            new Employee(3, 'John', 'C++', 'ABC Tech', 9, 'Pending'),
            new Employee(4, 'Anna', 'Java', 'ABC Tech', 15, 'Pending'),
            new Employee(5, 'Phat', 'PHP', 'ABC Tech', 8, 'Pending'),
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
        let status = "";
        if (employees[i].status == 'Pending') {
            status = `<button class="btn btn-success" onclick="approved(${employees[i].id})">Approved</button>
                        <button class="btn btn-danger" onclick="reject(${employees[i].id})">Reject</button>`
        }
        tbEmployee.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${employees[i].name}</td>
                <td>${employees[i].courseName}</td>
                <td>${employees[i].courseProvider}</td>
                <td>${employees[i].daysWorked}</td>
                <td>${employees[i].status}</td>
                <td>
                    ${status}
                </td>
            </tr>
        `;
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
}

function submitEmployee() {
    let name = document.getElementById('nameEmp').value;
    let courseName = document.getElementById('courseEmp').value;
    let daysWorked = document.getElementById('daysEmp').value;
    if (name == "" || courseName == "" || daysWorked == "") {
        alert("You need provide data.")
    }
    else {
        let id = findMaxId() + 1;
        let employee = new Employee(id, name, courseName, "ABC Tech", daysWorked, 'Pending');
        employees.push(employee);
        localStorage.setItem(employee_data, JSON.stringify(employees));
        renderEmployee();
        clearForm();
    }
}

function approved(employeeID) {
    let confirm = window.confirm("Are you sure to approve this employee?");
    if (confirm == true) {
        let employee = findEmployeeById(employeeID);
        employee.status = "Approved";
        localStorage.setItem(employee_data, JSON.stringify(employees));
        renderEmployee();
    }
}

function reject(employeeID) {
    let confirm = window.confirm("Are you sure to reject this employee?");
    if (confirm == true) {
        let employee = findEmployeeById(employeeID);
        employee.status = "Reject";
        localStorage.setItem(employee_data, JSON.stringify(employees));
        renderEmployee();
    }
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

