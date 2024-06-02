import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { CarFactory } from "./car";


const dbName = 'carshopdb';
const username = 'root';
const password = 'Password1!';

const sequelize = new Sequelize(dbName, username, password, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

UserFactory(sequelize);
CarFactory(sequelize);

export const db = sequelize;