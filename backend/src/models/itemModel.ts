import Sequelize, { BuildOptions, DataTypes, Model } from "sequelize";
import db from "../db";
export interface TItem {
  id: number;
  name: string;
  startingPrice: number;
  auctionStartTime: number;
  auctionEndTime: string;
  sellerId: number;
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
  },
  {
    timestamps: true,
  }
);

export default Item;
