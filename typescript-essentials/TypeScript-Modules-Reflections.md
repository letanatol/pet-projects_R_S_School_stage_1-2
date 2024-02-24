
# Getting Started with TypeScript:

- TypeScript is an open-source language that was developed by Microsoft. 
- TypeScript is a superset of JavaScript.
- In TypeScript, can identify the data type of a variable or parameter by using a type hint.
- TypeScript has more coding features that won't find in JavaScript

Browsers understand JavaScript only.
You transform the TypeScript code into JavaScript code by using the TypeScript compiler or a TypeScript-compatible transpiler.
I learned about text-editor options and then set up Visual Studio Code.

Generate a tsconfig.json file with default options: ```tsc --init```

To install the latest version of TypeScript: In the Command Prompt window, enter:
```npm install -g typescript```
You run the TypeScript compiler at the command prompt by using the ```tsc``` command.


# Declare Variable Types in TypeScript:

- Explain the advantages of declaring typed variables in TypeScript.
- Declare variables using primitive types.
- Declare variables using object types.
- Declare variables using union and intersection types.

> ```Primitive types:``` 
The primitive types are the boolean, number, string, void, null, and undefined. The void type exists purely to indicate the absence of a value, such as in a function with no return value. The null and undefined types are subtypes of all other types.

> ```Object types and type parameters:``` 
The object types are all class, interface, array, and literal types.

> Using ```enums```:

Helps reduce errors caused by transposing or mistyping numbers.
Makes it easy to change values in the future.
Makes code easier to read, which means it's less likely that errors will creep into it.
Ensures forward compatibility. With enumerations, your code is less likely to fail if someone changes the values corresponding to the member names in the future.

> The ```any``` type is the one type that can represent any JavaScript value with no constraints. The any type will allow you to reassign different types of values.

> The ```unknown``` type is similar to the ```any``` type in that any value is assignable to type ```unknown```. However, can't access ```any``` properties of an ```unknown``` type, nor can you call or construct them. If need to treat a variable as a different data type, can use a type assertion:

Type assertions have two forms. One is the as-syntax:

```(randomValue as string).toUpperCase();```

The other version is the "angle-bracket" syntax:

```(<string>randomValue).toUpperCase();```

> A ```union``` type uses the vertical bar or pipe ```(|)``` to separate each type:

```let multiType: number | boolean;```


> An ```intersection``` type combines two or more types to create a new type that has all properties of the existing types. An ```intersection``` allows you to add together existing types to get a single type that has all the features you need. An ```Intersection``` type uses the ampersand (&) to separate each type:

```type ManagementEmployee = Employee & Manager;```

> A ```literal``` is a more concrete subtype of a collective type.
There are three sets of ```literal``` types available in TypeScript: string, number, and boolean.


# Implement Interfaces in TypeShttpscript:

- Explain the reasons for using an interface in TypeScript.
- Declare an interface.
- Implement an interface.
- Declare an interface with custom array types.

The only job of an interface is to describe a type. It defines what the code contract requires, while a variable, function, or class that implements the interface satisfies the contract by providing the required implementation details.

> A type ```alias``` is a definition of a type of data, for example, a union, primitive, intersection, tuple, or any other type.

Interfaces are often the key point of contact between any two pieces of TypeScript code, especially when working with existing JavaScript code or built-in JavaScript objects.

You can use an interface to:

- Create shorthand names for commonly used types.
- Drive consistency across a set of objects because every object that implements the interface operates under the same type definitions.
- Describe existing JavaScript APIs and clarify function parameters and return types.


# Develop Typed Functions in TypeScript:

- I understand the advantages of using types in functions.
- I can write functions that have mandatory, optional, default and rest options.
- Use function type definition using aliases of types or interfaces.

Adding types to functions helps prevent you from passing values that you shouldn't pass to your functions. Typed functions are especially important when you're working with larger code bases or functions developed by others. 

```
// Named functions
function addNumbers (x: number, y: number): number {
   return x + y;
}

// Anonymous function
let addNumbers1 = function (x: number, y: number): number {
   return x + y;
}

// Arrow function
let addNumbers2 = (x: number, y: number): number => x + y;
```

# Declare and Instantiate Classes in TypeScript 

- I know how you can use TypeScript classes to describe the shape of objects, declare a class, and create a class instance using TypeScript.
- Apply class access modifiers.
- I know static properties in class.
- Declare a class that expands another class.
- Specify the interface to provide the class form.

Classes in TypeScript extend the ES6 functionality by adding TypeScript-specific features like type annotations for class members, access modifiers, and the ability to specify required or optional parameters. Another benefit of using TypeScript is that you can use it to develop with classes and then compile them down to JavaScript that works across all major browsers and platforms, as needed.

> In TypeScript, you can control the visibility of class members by adding the ```public```, ```private```, or ```protected``` keyword before the member name.

> There is another type of property called a ```static``` property. Static properties and methods are shared by all instances of a class.

> Inheritance enables you to establish relationships and build hierarchies of classes in object composition.
Some reasons to use inheritance include:

- Code reusability. This helps you avoid redundancy in your code.
- You can use one base to derive any number of subclasses in a hierarchy. 
- Instead of having to make code changes in many different classes that have similar functionality, you just need to make the changes once in the base class.

# Generics in TypeScript

Learned to identify use cases for generics, define a generic function, declare a generic interface, a generic class, implement generic constraints.


Generics can:

- Provide more flexibility when working with types.
- Enable code reuse.
- Reduce the need to use the any type.

Generics are just a way to pass types to a component, so you can not only apply native types to generic type variables, but also interfaces, functions, and classes. 


# Work with External Libraries in TypeScript

- Organize code using modules.
- Import an external type library.

TypeScript provides two ways to organize you code: namespaces and modules. In addition to modules, you can import other external libraries containing type definitions that you can take advantage of in your code. 

When code is inside a module, it is pulled from the global scope and into the scope of the module. This can help you avoid naming conflicts between components in the global namespace.

> To compile modules, specify a ```--module``` target on the command line or in the tsconfig.json file for the project.

```tsc --module commonjs main.ts```


# Organize Code with Namespaces in TypeScript

- I can explain the purpose of namespaces.
- Implement single-file and multi-file namespaces.
- Explain the design considerations for using namespaces and modules.


Namespaces are a TypeScript-specific way to organize and categorize your code, enabling you to group related code together. Namespaces allow you to group variables, functions, interfaces, or classes related to business rules in one namespace and security in another.

Code inside a namespace is pulled from the global scope and into the scope of the namespace. 
Namespaces can be implemented within a single TypeScript file or across multiple TypeScript files.
It is possible to embed namespaces into namespaces, providing even more possibilities for organizing code.

While namespaces are easy to use for simple implementations and do not depend on a module loader, modules offer some additional benefits that namespaces do not. Modules:

- Declare their dependencies.
- Provide better code reuse.
- Offer strong isolation.
- Hide the internal statements of the module definitions and show only the methods and parameters associated to the declared component.
- Provide better tooling support for bundling.
- Are recommended over namespaces for Node.js applications because modules are the default.
- Can resolve top-down JavaScript flow issues because a reference to an external method or class is instantiated only on method invocation.

