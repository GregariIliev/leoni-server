'use strict';

import { Model, DataTypes } from 'sequelize';

import bcrypt from 'bcrypt'

interface EmployeeAttributes {
  id: string,
  firstName: string,
  lastName: string,
  middleName: string,
  email: string,
  password: string,
  address: string,
  phone: string,
  salary: number,
  shift: string,
  
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Employee extends Model<EmployeeAttributes> implements EmployeeAttributes {
    id!: string;
    firstName!: string;
    lastName!: string;
    middleName!: string;
    email!: string;
    password!: string;
    address!: string;
    phone!: string;
    salary!: number;
    shift!: string;

    static associate(models: any) {
      this.hasOne(models.Employee, { foreignKey: 'admin_id' });
      this.belongsTo(models.Department, { foreignKey: 'department_id' });
      this.belongsTo(models.Position, { foreignKey: 'position_id' });
    }
  }
  Employee.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Fisrst name must be at least 20 characters.'
        },
        notEmpty: {
          msg: 'First name cannot be empty.'
        }
      },
      field: 'first_name'
    },
    middleName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Middle name must be at least 20 characters.'
        },
        notEmpty: {
          msg: 'Middle name cannot be empty.'
        }
      },
      field: 'middle_name'
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Last name must be at least 20 characters.'
        },
        notEmpty: {
          msg: 'Last name cannot be empty.'
        }
      },
      field: 'last_name'
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: true,
      validate: {
        isEmail: {
          msg: 'Invalid email format.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: {
          args: [0, 50],
          msg: 'Addres name must be at least 50 characters.'
        },
        notEmpty: {
          msg: 'Address cannot be empty.'
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
        },
        notEmpty: {
          msg: 'Phone cannot be empty.'
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
        },
        notEmpty: {
          msg: 'Shift cannot be empty.'
        }
      }
    }
  },
    {
      hooks: {
        beforeCreate: async (employee) => {
          if (employee.password) {
            const hashPassword = await bcrypt.hash(employee.password, 12);
            employee.password = hashPassword
          }
        },
      },
      sequelize,
      modelName: 'Employee'
    });
  return Employee;
};