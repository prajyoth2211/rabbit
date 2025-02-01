// src/parser/parser.js
const { TokenType } = require('../lexer/lexer');
const AST = require('../ast/ast'); // Import AST

function parse(tokens) {
    let pos = 0;

    function peek() {
        return tokens[pos];
    }

    function consume() {
        return tokens[pos++];
    }

    function expect(type) {
        let token = consume();
        if (token.type !== type) {
            throw new Error(`Expected ${type}, got ${token.type}`);
        }
        return token;
    }

    function parseExpression() {
        let token = peek();
        if (token.type === TokenType.Number) {
            return new AST.NumberLiteral(parseFloat(consume().value));
        } else if (token.type === TokenType.String) {
            return new AST.StringLiteral(consume().value); // Use AST.StringLiteral
        } else if (token.type === TokenType.Identifier) {
            return new AST.Identifier(consume().value);
        } else if (token.type === TokenType.Punctuation && token.value === '(') {
            consume();
            let expr = parseExpression();
            expect(TokenType.Punctuation, ')');
            return expr;
        } else {
            throw new Error(`Unexpected token: ${token.type}`);
        }
    }

    function parseExpression() {
        let left = parsePrimaryExpression();
        while (peek().type === TokenType.Operator && /[\+\-\*\/=<>!&|]/.test(peek().value)) {
            let operator = consume().value;
            let right = parsePrimaryExpression();
            left = {
                type: 'BinaryExpression',
                operator,
                left,
                right
            };
        }
        return left;
    }
    
    function parsePrimaryExpression() {
        let token = peek();
        if (token.type === TokenType.Number) {
            return new AST.NumberLiteral(parseFloat(consume().value));
        } else if (token.type === TokenType.String) {
            return new AST.StringLiteral(consume().value);
        } else if (token.type === TokenType.Identifier) {
            return new AST.Identifier(consume().value);
        } else if (token.type === TokenType.Punctuation && token.value === '(') {
            consume();
            let expr = parseExpression();
            expect(TokenType.Punctuation, ')');
            return expr;
        } else {
            throw new Error(`Unexpected token: ${token.type}`);
        }
    }

    function parseStatement() {
        let token = peek();
        if (token.type === TokenType.Keyword && token.value === 'let') {
            consume();
            let name = expect(TokenType.Identifier).value;
            expect(TokenType.Operator, '=');
            let value = parseExpression();
            expect(TokenType.Punctuation, ';');
            return new AST.VariableDeclaration(name, value);
        } else if (token.type === TokenType.Keyword && token.value === 'print') {
            consume();
            let value = parseExpression();
            expect(TokenType.Punctuation, ';');
            return new AST.PrintStatement(value);
        } else if (token.type === TokenType.Keyword && token.value === 'if') {
            consume();
            expect(TokenType.Punctuation, '(');
            let condition = parseExpression();
            expect(TokenType.Punctuation, ')');
            let body = parseBlock();
            let elseBody = null;
            if (peek().type === TokenType.Keyword && peek().value === 'else') {
                consume();
                elseBody = parseBlock();
            }
            return new AST.IfStatement(condition, body, elseBody);
        } else {
            throw new Error(`Unexpected token: ${token.type}`);
        }
    }
    
    function parseBlock() {
        expect(TokenType.Punctuation, '{');
        let body = [];
        while (peek().type !== TokenType.Punctuation || peek().value !== '}') {
            body.push(parseStatement());
        }
        expect(TokenType.Punctuation, '}');
        return body;
    }

    function parseProgram() {
        let program = new AST.Program([]);
        while (peek().type !== TokenType.EOF) {
            program.body.push(parseStatement());
        }
        return program;
    }

    return parseProgram();
}

// Export the parse function
module.exports = { parse };