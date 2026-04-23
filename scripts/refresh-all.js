#!/usr/bin/env node

const { spawn } = require("node:child_process");
const path = require("node:path");

const ROOT_DIR = path.resolve(__dirname, "..");
const STEPS = [
  "sync-github-discovery.js",
  "update-github-metadata.js",
  "build-detailed-index.js",
  "build-curated-views.js",
  "update-readme-stats.js",
];

function runStep(scriptName) {
  return new Promise((resolve, reject) => {
    console.log(`Running ${scriptName}`);

    const child = spawn(process.execPath, [path.join(__dirname, scriptName)], {
      cwd: ROOT_DIR,
      env: process.env,
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${scriptName} exited with code ${code}`));
    });

    child.on("error", reject);
  });
}

async function main() {
  for (const scriptName of STEPS) {
    await runStep(scriptName);
  }

  console.log("Refresh pipeline completed.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
