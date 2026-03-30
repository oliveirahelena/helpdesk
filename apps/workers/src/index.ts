import { buildWorkerApp } from "./bootstrap/worker-app";

const app = buildWorkerApp();

app.start().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
