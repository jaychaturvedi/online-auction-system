import Sequelize, { BuildOptions, DataTypes, Model } from "sequelize";
import db from "../db";

export interface TUser {
  _id: string;
  password: string;
  email: string;
  balance: number;
  name: string;
  address: string;
}

type TUserModel<T> = typeof Model & {
  new (values?: object, options?: BuildOptions): T;
};

let User: TUserModel<TUser & Model> = <TUserModel<TUser & Model>>db.define(
  "user",
  {
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
User.sync()
  .then(() => console.log("User table created successfully"))
  .catch((error) => console.error("Error creating User table:", error));

export default User;
