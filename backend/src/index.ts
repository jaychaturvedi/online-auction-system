import db from "./db";
import server from "./server";
async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await db.sync();
    console.log("Database connection OK!");
  } catch (error: any) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}
const PORT = Number(process.env.SPORT) || 5000;

async function init() {
  await assertDatabaseConnectionOk();
  server.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
  });
}
init();
