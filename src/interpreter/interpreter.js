// src/interpreter/interpreter.js
const AST = require('../ast/ast');

function interpret(ast) {
    let environment = {};

    function evaluate(node) {
        switch (node.type) {
            case 'Program':
                node.body.forEach(evaluate);
                break;
            case 'VariableDeclaration':
                environment[node.name] = evaluate(node.value);
                break;
            case 'NumberLiteral':
                return node.value;
            case 'StringLiteral':
                return node.value;
            case 'Identifier':
                if (environment[node.name] === undefined) {
                    throw new Error(`Undefined variable: ${node.name}`);
                }
                return environment[node.name];
            case 'PrintStatement':
                console.log(evaluate(node.value));
                break;
            case 'BinaryExpression':
                let left = evaluate(node.left);
                let right = evaluate(node.right);
                switch (node.operator) {
                    case '+': return left + right;
                    case '-': return left - right;
                    case '*': return left * right;
                    case '/': return left / right;
                    case '>': return left > right;
                    case '<': return left < right;
                    case '>=': return left >= right;
                    case '<=': return left <= right;
                    case '==': return left == right;
                    case '!=': return left != right;
                    default: throw new Error(`Unknown operator: ${node.operator}`);
                }
            case 'IfStatement':
                let condition = evaluate(node.condition);
                if (condition) {
                    node.body.forEach(evaluate);
                } else if (node.elseBody) {
                    node.elseBody.forEach(evaluate);
                }
                break;
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }

    evaluate(ast);
}

// Export the interpret function
module.exports = { interpret };