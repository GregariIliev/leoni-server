'use strict';

import { Model, DataTypes } from 'sequelize'

interface DepartmentAttributes {
  id: string,
  name: string,
  maxEmployees: number,
  salaryMultiplayer: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Department extends Model<DepartmentAttributes> implements DepartmentAttributes {
    id!: string;
    name!: string;
    maxEmployees!: number;
    salaryMultiplayer!: number;

    static associate(models: any) {
      // define association here
    }
  }
  Department.init({
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
        }
      }
    },
    maxEmployees: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'max_employees'
    },
    salaryMultiplayer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      field: 'salary_multiplayer'
    }
  }, {
    sequelize,
    modelName: 'Department'
  });

  //Department.belongsToMany(Position, { through: 'DepartmentsPositions' });

  return Department;
};