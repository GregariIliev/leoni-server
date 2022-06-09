'use strict';

import { Model, DataTypes } from 'sequelize';

interface EmployeeAttributes {
  id: string,
  fistName: string,
  lastName: string,
  middleName: string,
  address: string,
  phone: string,
  salary: number,
  shift: string,
  departmentId: number,
  positionId: number,
  adminId: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Employee extends Model<EmployeeAttributes> implements EmployeeAttributes {
    id!: string;
    fistName!: string;
    lastName!: string;
    middleName!: string;
    address!: string;
    phone!: string;
    salary!: number;
    shift!: string;
    departmentId!: number;
    positionId!: number;
    adminId!: number

    static associate(models: any) {
      // define association here
    }
  }
  Employee.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fistName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Fisrst name must be at least 20 characters.'
        }
      }
    },
    middleName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Middle name must be at least 20 characters.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Last name must be at least 20 characters.'
        }
      }
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Addres name must be at least 20 characters.'
        }
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Phone name must be at least 20 characters.'
        }
      }
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 700,
      validate: {
        min: {
          args: [700],
          msg: 'Minimum salary is 700'
        },
        max: {
          args: [10000],
          msg: 'Maximum salary is 10000'
        }
      }
    },
    shift: {
      type: DataTypes.ENUM('A', 'B', 'C', 'R'),
      allowNull: false,
      validate: {
        isIn: {
          args: [['A', 'B', 'C', 'R']],
          msg: 'Shift must one of A, B, C or R'
        }
      }
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'department_id'
    },
    positionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      field: 'position_id'
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
      field: 'admin_id'
    }
  }, {
    sequelize,
    modelName: 'Employee'
  });
  return Employee;
};