import Item from "./itemModel";
import User from "./userModel";
import Bid from "./bidModel";

User.hasMany(Item, { foreignKey: "sellerId" });
Item.belongsTo(User, { foreignKey: "sellerId" });

Item.hasMany(Bid, { foreignKey: "itemId" });
Bid.belongsTo(Item, { foreignKey: "itemId" });

User.hasMany(Bid, { foreignKey: "userId" });
Bid.belongsTo(User, { foreignKey: "userId" });

// Sync the models with the database
User.sync()
  .then(() => console.log("User table created successfully"))
  .catch((error) => console.error("Error creating User table:", error));

Item.sync()
  .then(() => console.log("Item table created successfully"))
  .catch((error) => console.error("Error creating Item table:", error));

Bid.sync()
  .then(() => console.log("Bid table created successfully"))
  .catch((error) => console.error("Error creating Bid table:", error));

export default {
  User,
  Item,
  Bid,
};
