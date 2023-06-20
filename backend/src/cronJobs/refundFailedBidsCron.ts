import cron from "cron";
import { InternalServerError } from "../utils/appError";
import models from "../models";
async function TriggerJob() {
  console.log("Trigger");
  const itemBiddings = await models.Item.findAll();
  console.log("itemBiddings", itemBiddings);
}
function start() {
  let job;
  try {
    job = new cron.CronJob({
      cronTime: "*/5 * * * * *",
      onTick: async () => await TriggerJob(),
      start: true,
      timeZone: "Asia/Kolkata",
    });
    job.start();
    if (job.running) {
      return "Refund for failed bidding job has started ";
    }
    return "Refund for failed bidding job failed to start";
  } catch (ex) {
    throw new InternalServerError("Failed to start job");
  }
}

export default { start };
