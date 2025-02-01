## <h1> Rabbit Language Documentation </h1>

## Overview

Rabbit is a custom programming language designed for [purpose of the language, e.g., scripting, educational use, etc.]. It includes features such as:

## Features

Simple and Intuitive Syntax – Easy-to-read and write syntax for beginners and experienced developers.

Lightweight and Fast Execution – Designed for efficiency and quick script execution.

Dynamic Typing – No need to declare variable types explicitly.

Built-in Standard Library – Includes functions for string manipulation, mathematical operations, and I/O handling.

Control Flow Structures – Supports loops (for, while) and conditional statements (if-else).

Function Support – Define and use custom functions to modularize code.

Error Handling – Provides structured error messages and debugging support.

Cross-Platform Compatibility – Can be used on various operating systems.

## Tech Stack

Language: JavaScript

Testing: Jest

## <h3> Documentation: Markdown files (docs/)

Installation & Setup

Clone the repository:

git clone https://github.com/prajyoth2211/rabbit.git


## <h3> Project Structure

rabbit-language/
│
├── src/
│   ├── lexer/
│   │   └── lexer.js
│   ├── parser/
│   │   └── parser.js
│   ├── interpreter/
│   │   └── interpreter.js
│   ├── ast/
│   │   └── ast.js
│   ├── utils/
│   │   └── utils.js
│   └── rabbit.js
│
├── examples/
│   ├── hello.rabbit
│   ├── arithmetic.rabbit
│   └── loops.rabbit
│
├── tests/
│   ├── lexer.test.js
│   ├── parser.test.js
│   ├── interpreter.test.js
│   └── integration.test.js
│
├── docs/
│   ├── syntax.md
│   ├── api.md
│   └── getting-started.md
│
├── package.json
├── README.md
└── .gitignore

## <h3> How to Use Rabbit

Rabbit allows users to write and execute scripts using a simple and intuitive syntax. Below are the key steps to use Rabbit:

## Writing a Script

Create a new .rabbit file and write your Rabbit code. For example:

print("Hello, World!")

## Running a Script

## To execute a Rabbit script, use the Rabbit interpreter:

rabbit run myscript.rabbit

## Variables and Data Types

Rabbit supports various data types like integers, strings, and lists:

let name = "Alice"
let age = 25
print(name + " is " + age + " years old")

## Control Flow

Rabbit provides control structures like loops and conditionals:

if age > 18 {
    print("Adult")
} else {
    print("Minor")
}

## Functions

You can define and call functions in Rabbit:

function greet(name) {
    print("Hello, " + name)
}
greet("Bob")

## Language Syntax

Refer to docs/syntax.md for detailed syntax rules.

## API Reference

Refer to docs/api.md for API usage details.

## Contribution Guidelines

Fork the repository.

Create a feature branch.

Submit a pull request.


Contact

For issues or suggestions, please open an issue on GitHub.
