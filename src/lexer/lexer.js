// src/lexer/lexer.js
const TokenType = {
    Number: 'Number',
    Identifier: 'Identifier',
    Keyword: 'Keyword',
    Operator: 'Operator',
    Punctuation: 'Punctuation',
    String: 'String', // Add this line
    EOF: 'EOF'
};

const Keywords = new Set(['let', 'if', 'else', 'for', 'print']);

function isDigit(char) {
    return /\d/.test(char);
}

function isAlpha(char) {
    return /[a-zA-Z_]/.test(char);
}

function isAlphaNumeric(char) {
    return isAlpha(char) || isDigit(char);
}

function tokenize(source) {
    let tokens = [];
    let pos = 0;

    while (pos < source.length) {
        let char = source[pos];

        // Skip whitespace
        if (/\s/.test(char)) {
            pos++;
            continue;
        }

        // Handle single-line comments (//)
        if (char === '/' && source[pos + 1] === '/') {
            while (pos < source.length && source[pos] !== '\n') {
                pos++;
            }
            continue;
        }

        // Handle numbers
        if (isDigit(char)) {
            let num = '';
            while (pos < source.length && isDigit(source[pos])) {
                num += source[pos++];
            }
            tokens.push({ type: TokenType.Number, value: num });
            continue;
        }

        // Handle identifiers and keywords
        if (isAlpha(char)) {
            let ident = '';
            while (pos < source.length && isAlphaNumeric(source[pos])) {
                ident += source[pos++];
            }
            if (Keywords.has(ident)) {
                tokens.push({ type: TokenType.Keyword, value: ident });
            } else {
                tokens.push({ type: TokenType.Identifier, value: ident });
            }
            continue;
        }

        // Handle strings
        if (char === '"') {
            let str = '';
            pos++; // Skip the opening quote
            while (pos < source.length && source[pos] !== '"') {
                str += source[pos++];
            }
            if (source[pos] !== '"') {
                throw new Error('Unterminated string literal');
            }
            pos++; // Skip the closing quote
            tokens.push({ type: TokenType.String, value: str });
            continue;
        }

        // Handle operators
        if (/[\+\-\*\/=<>!&|]/.test(char)) {
            let op = char;
            pos++;
            while (pos < source.length && /[\+\-\*\/=<>!&|]/.test(source[pos])) {
                op += source[pos++];
            }
            tokens.push({ type: TokenType.Operator, value: op });
            continue;
        }

        // Handle punctuation
        if (/[\(\)\{\},;.]/.test(char)) {
            tokens.push({ type: TokenType.Punctuation, value: char });
            pos++;
            continue;
        }

        // Handle unknown characters
        throw new Error(`Unknown character: ${char}`);
    }

    tokens.push({ type: TokenType.EOF, value: '' });
    return tokens;
}

// Export the tokenize function
module.exports = { tokenize, TokenType };