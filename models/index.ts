'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.ts')[env];
const db: any = {};


import { employees } from '../seeders/customEmployees';
import { departments } from '../seeders/customDepartments';
import { positions } from '../seeders/customPositions';

let sequelize: any;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);

} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file: any) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.createCustomEmployees = async () => {
  await db.Employee.bulkCreate(employees, { individualHooks: true })
    .then(() => console.log('Custom employees created succesful.'))
    .catch(() => console.log('Custom employees creation FAIL.'));
}

db.createCustomDepartments = async () => {
  await db.Department.bulkCreate(departments)
    .then(() => console.log('Custom departments created seccesful.'))
    .catch(() => console.log('Custom departments creation FAIL.'));
}

db.createCustomPositions = async () => {
  await db.Position.bulkCreate(positions)
    .then(() => console.log('Custom positions created succesful.'))
    .catch(() => console.log('Custom positions creation FAIL.'));
}

db.addPositionsOnDepartments = async (departmentId: number, positionsIs: number[]) => {
  const department = await db.Department.findByPk(departmentId);

  department.addPositions(positionsIs)
    .then(() => {
      console.log('Custom position are added to department.');
    })
    .catch(() => {
      console.log('Fali to add custom position to department.');
    })
}

export default db;
