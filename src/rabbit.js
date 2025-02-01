// src/rabbit.js
const { tokenize } = require('./lexer/lexer');
const { parse } = require('./parser/parser'); // Import parse from parser.js
const { interpret } = require('./interpreter/interpreter');

function runRabbit(source) {
    try {
        // Step 1: Tokenize the source code
        const tokens = tokenize(source);
        console.log('Tokens:', tokens);

        // Step 2: Parse the tokens into an AST
        const ast = parse(tokens);
        console.log('AST:', JSON.stringify(ast, null, 2));

        // Step 3: Interpret the AST
        interpret(ast);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Export the runRabbit function for use in other files
module.exports = { runRabbit };

// If running directly from the command line, read a file and execute it
if (require.main === module) {
    const fs = require('fs');
    const path = require('path');

    // Read the Rabbit program from a file
    const filePath = path.join(__dirname, '../examples/conditional.rabbit');
    const source = fs.readFileSync(filePath, 'utf-8');

    // Run the Rabbit program
    runRabbit(source);
}