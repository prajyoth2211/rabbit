// src/ast/ast.js
module.exports = {
    Program: class Program {
        constructor(body) {
            this.type = 'Program';
            this.body = body;
        }
    },
    VariableDeclaration: class VariableDeclaration {
        constructor(name, value) {
            this.type = 'VariableDeclaration';
            this.name = name;
            this.value = value;
        }
    },
    NumberLiteral: class NumberLiteral {
        constructor(value) {
            this.type = 'NumberLiteral';
            this.value = value;
        }
    },
    StringLiteral: class StringLiteral {
        constructor(value) {
            this.type = 'StringLiteral';
            this.value = value;
        }
    },
    Identifier: class Identifier {
        constructor(name) {
            this.type = 'Identifier';
            this.name = name;
        }
    },
    PrintStatement: class PrintStatement {
        constructor(value) {
            this.type = 'PrintStatement';
            this.value = value;
        }
    },
    BinaryExpression: class BinaryExpression {
        constructor(operator, left, right) {
            this.type = 'BinaryExpression';
            this.operator = operator;
            this.left = left;
            this.right = right;
        }
    },
    IfStatement: class IfStatement {
        constructor(condition, body, elseBody) {
            this.type = 'IfStatement';
            this.condition = condition;
            this.body = body;
            this.elseBody = elseBody;
        }
    }
};