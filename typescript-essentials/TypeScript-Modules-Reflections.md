
1. **Getting Started with TypeScript**:

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

2. **Declare Variable Types in TypeScript**:

- Explain the advantages of declaring typed variables in TypeScript.
- Declare variables using primitive types.
- Declare variables using object types.
- Declare variables using union and intersection types.

```Primitive types:``` 
The primitive types are the boolean, number, string, void, null, and undefined. The void type exists purely to indicate the absence of a value, such as in a function with no return value. The null and undefined types are subtypes of all other types.

```Object types and type parameters:``` 
The object types are all class, interface, array, and literal types.

Using ```enums```:

Helps reduce errors caused by transposing or mistyping numbers.
Makes it easy to change values in the future.
Makes code easier to read, which means it's less likely that errors will creep into it.
Ensures forward compatibility. With enumerations, your code is less likely to fail if someone changes the values corresponding to the member names in the future.

The ```any``` type is the one type that can represent any JavaScript value with no constraints. The any type will allow you to reassign different types of values.

The ```unknown``` type is similar to the ```any``` type in that any value is assignable to type ```unknown```. However, can't access ```any``` properties of an ```unknown``` type, nor can you call or construct them.

If need to treat a variable as a different data type, can use a type assertion: 

Type assertions have two forms. One is the as-syntax:

```(randomValue as string).toUpperCase();```

The other version is the "angle-bracket" syntax:

```(<string>randomValue).toUpperCase();```

A ```union``` type uses the vertical bar or pipe (|) to separate each type:

```let multiType: number | boolean;```


An ```intersection``` type combines two or more types to create a new type that has all properties of the existing types. An ```intersection``` allows you to add together existing types to get a single type that has all the features you need.

An ```Intersection``` type uses the ampersand (&) to separate each type:

```type ManagementEmployee = Employee & Manager;```

A ```literal``` is a more concrete subtype of a collective type.
There are three sets of ```literal``` types available in TypeScript: string, number, and boolean.