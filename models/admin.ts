'use strict';

import { Model, DataTypes } from 'sequelize';

import bcrypt from 'bcrypt'

interface AdminAttributes {
  id: number;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Admin extends Model<AdminAttributes> implements AdminAttributes {
    id!: number;
    email!: string;
    password!: string;

    static associate(models: any) {
      // define association here
    }
  }
  Admin.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notNull: {
          msg: 'Email cannot be empty.'
        },
        len: {
          args: [0, 30],
          msg: 'Email must be at least 30 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        const hashPassword = await bcrypt.hash(user.password, 12);
        user.password = hashPassword
      }
    },
    sequelize,
    modelName: 'Admin'
  });
  return Admin;
};