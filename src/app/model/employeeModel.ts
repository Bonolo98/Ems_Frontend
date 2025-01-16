export class Employee {
    id: number;
    firstname: string;
    lastname: string;
    employeeNumber: number;
    department: string;
    email: string;
    contacts: number ;
    // adminid: number;
  
    constructor(id: number = 0, firstname: string = '', lastname: string = '', employeeNumber: number = 0,
       department: string = '', 
       email: string = '', contacts: number = 0, adminid: number = 0) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.employeeNumber = employeeNumber;
      this.department = department;
      this.email = email;
      this.contacts = contacts;
      // this.adminid = adminid;
    }
  }