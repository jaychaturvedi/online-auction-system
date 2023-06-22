import Sequelize, { BuildOptions, DataTypes, Model } from "sequelize";
import db from "../db";

export interface TUser {
  id: string;
  password: string;
  email: string;
  balance: number;
  name: string;
  address: string;
  createdAt: any;
  updatedAt: any;
}

type TUserModel<T> = typeof Model & {
  new (values?: object, options?: BuildOptions): T;
};

let User: TUserModel<TUser & Model> = <TUserModel<TUser & Model>>db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default User;
