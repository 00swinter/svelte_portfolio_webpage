import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 1. Get the directory where THIS script is located
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Find build.json in the same folder
const buildFilePath = path.join(__dirname, 'build_tracker.json');

// 3. Read, Increment, Write
const fileContent = fs.readFileSync(buildFilePath, 'utf-8');
const buildData = JSON.parse(fileContent);

buildData.buildNumber += 1;
buildData.buildDate = new Date().toISOString();

fs.writeFileSync(buildFilePath, JSON.stringify(buildData, null, 2));

console.log(`Build number updated to: ${buildData.buildNumber}`);