'use strict';

import { Model, DataTypes } from 'sequelize';

interface PositionAttributes {
  id: string,
  name: string,
  salaryMultiplayer: number,
  shift: string
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Position extends Model {
    id!: string;
    name!: string;
    salaryMultiplayer!: number;
    shift!: string

    static associate(models: any) {
      this.belongsToMany(models.Department, { through: 'Departments_Positions', foreignKey: 'position_id' })
    }
  }

  Position.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Department name must be at least 20 characters.'
        },
        notEmpty: {
          msg: 'Name cannot be empty.'
        }
      }
    },
    salaryMultiplayer: {
      type: DataTypes.FLOAT(1.1),
      allowNull: true,
      defaultValue: 1,
      validate: {
        min: {
          args: [1],
          msg: 'Minimum salary multiplayer on this positions is 1.0'
        },
        max: {
          args: [2],
          msg: 'Maximum salary multiplayer on this positions is 2.0'
        }
      },
      field: 'salary_multiplayer'
    },
    shift: {
      type: DataTypes.STRING(),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Position'
  });
  return Position;
};