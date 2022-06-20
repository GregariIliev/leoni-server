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
      this.belongsToMany(models.Position, { through: 'Departments_Positions', foreignKey: 'department_id' });
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
      validate: {
        min: {
          args: [5],
          msg: 'Minimum employees on this department is 5'
        },
        max: {
          args: [20],
          msg: 'Maximum employees on this department is 20'
        }
      },
      field: 'max_employees'
    },
    salaryMultiplayer: {
      type: DataTypes.FLOAT(1.1),
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 2
      },
      field: 'salary_multiplayer'
    }
  }, {
    sequelize,
    modelName: 'Department'
  });
  return Department;
};