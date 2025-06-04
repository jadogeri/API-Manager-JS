class MyClass {
    ob;
  #privateMethod() {
    console.log("This is a private method.");
  }

  publicMethod() {
    this.#privateMethod(); // Accessing the private method within the class
  }
}

const myInstance = new MyClass();
myInstance.publicMethod(); // Output: This is a private method.
// myInstance.#privateMethod(); // This will cause an error because it's private

let Employee = (function () {

    // Private variable
    let empName = '';

    return class {
        constructor(name) {
            empName = name;
        }

        // Private method
        getPrivateName() {
            return empName;
        }
    }

})();

const employee = new Employee('Aryan');

// Can access private method
console.log(employee.getPrivateName()); 

