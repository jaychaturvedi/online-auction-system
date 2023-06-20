import Sequelize, { BuildOptions, DataTypes, Model } from "sequelize";
import db from "../db";
export interface TItem {
  id: number;
  name: string;
  startingPrice: number;
  currentPrice: number;
  auctionStartTime: number;
  auctionEndTime: number;
  sellerId: number;
  refundProcessed: boolean;
}

type TItemModel<T> = typeof Model & {
  new (values?: object, options?: BuildOptions): T;
};

let Item: TItemModel<TItem & Model> = <TItemModel<TItem & Model>>db.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      //name of the item
      type: DataTypes.STRING,
      allowNull: false,
    },
    startingPrice: {
      //minimum starting price of the item for bidding
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currentPrice: {
      //current bidding price of the item
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    auctionStartTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    auctionEndTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sellerId: {
      //sellerId is primary key id in users table
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    refundProcessed: {
      //to track which item's failed biddings are refunded
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Item;
