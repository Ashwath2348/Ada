const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const tmp = require('tmp');

const app = express();
app.use(bodyParser.json());

// Endpoint to compile and run C code
app.post('/compile', (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    // Create a temporary file for the C code
    const tempFile = tmp.fileSync({ postfix: '.c' });
    const outputFile = tmp.tmpNameSync({ postfix: '.out' });

    fs.writeFileSync(tempFile.name, code);

    // Compile and run the C code with a timeout
    const compileCmd = `gcc "${tempFile.name}" -o "${outputFile}" && "${outputFile}"`;

    exec(compileCmd, { timeout: 5000 }, (error, stdout, stderr) => {
        tempFile.removeCallback(); // Cleanup C file
        fs.unlink(outputFile, () => {}); // Remove compiled binary

        if (error) {
            return res.status(500).json({
                error: stderr || error.message
            });
        }

        res.json({ result: stdout });
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
