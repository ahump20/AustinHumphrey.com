/**
 * Export resume data from the TypeScript content model to JSON
 * for consumption by the Python PDF generator.
 *
 * Usage:  npx tsx scripts/export_resume.ts
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { resume } from "../src/content/resume.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = resolve(__dirname, "resume_export.json");

writeFileSync(outputPath, JSON.stringify(resume, null, 2), "utf-8");

console.log(`Resume data exported to ${outputPath}`);
