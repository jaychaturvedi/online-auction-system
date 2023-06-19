import Sequelize, { BuildOptions, DataTypes, Model } from "sequelize";
import db from "../db";
export interface TBid {
  id: number;
  itemId: number;
  userId: number;
  amount: number;
  bidTime: string;
}

type TBidModel<T> = typeof Model & {
  new (values?: object, options?: BuildOptions): T;
};

let Bid: TBidModel<TBid & Model> = <TBidModel<TBid & Model>>db.define(
  "Bid",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemId: {
      //itemId is primary key id in items table and refers to bid placed for item
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      //userId is primary key id in users table and refers to bid placed by user
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      //amount refers to bid amount placed for item
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bidTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Bid;
