import cron from "cron";
import { InternalServerError } from "../utils/appError";
import models from "../models";
import { Op } from "sequelize";

import moment from "moment";
async function TriggerJob() {
  const itemBiddings = await models.Item.findAll({
    where: {
      status: "open",
      [Op.and]: [
        {
          auctionEndTime: {
            [Op.gt]: moment().subtract(3, "hours").valueOf(),
          },
        },
        {
          auctionEndTime: {
            [Op.lt]: moment().valueOf(),
          },
        },
      ],
    },
  });
  for (const item of itemBiddings) {
    //item expired
    const promises = [
      models.Bid.update(
        { status: "success" }, //if the auction has closed, mark bid as success whose prices matches currentPrice
        {
          where: {
            itemId: item.id,
            amount: { [Op.eq]: item.currentPrice },
            status: "open",
          },
        }
      ),
      models.Bid.update(
        { status: "failed" }, //if the auction has closed those bids as failed whose prices are lower than currentPrice
        {
          where: {
            itemId: item.id,
            amount: { [Op.ne]: item.currentPrice },
            status: "open",
          },
        }
      ),
    ];
    // Add money into sellers account for
    if (item.currentPrice) {
      promises.push(
        models.Item.update(
          { status: "sold" }, //if the auction has closed, mark item as sold if any bidding was placed
          { where: { id: item.id, currentPrice: { [Op.ne]: null } } }
        )
      );
      promises.push(
        models.User.increment(
          { balance: item.currentPrice }, //if the bidding was success, add bidding money to seller's account
          { where: { id: item.sellerId } }
        ) as Promise<any>
      );
    } else {
      promises.push(
        models.Item.update(
          { status: "notsold" }, //if the auction has closed, mark item as notsold if no bidding was placed
          { where: { id: item.id, currentPrice: { [Op.eq]: null } } }
        )
      );
    }
    await Promise.allSettled(promises);
    const failedBids = await models.Bid.findAll({
      where: { itemId: item.id, status: "failed" },
    });
    for (const bid of failedBids) {
      await models.User.increment(
        { balance: bid.amount }, //if the bidding was failed, add bidding money to bidder's account
        { where: { id: bid.userId } }
      );
    }
  }
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
