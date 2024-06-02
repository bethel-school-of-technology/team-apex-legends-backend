import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { User } from "./user";


export class Car extends Model<InferAttributes<Car>, InferCreationAttributes<Car>>{
    declare carId: number;
    declare make: string;
    declare model: string;
    declare year: number;
    declare color: string;
    declare miles: number;
    declare city: string;
    declare state: string;
    declare price: number;
    declare username: string;
  
}


export function CarFactory(sequelize: Sequelize) {
    Car.init({
        carId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    make: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false        
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    miles: {
        type: DataTypes.INTEGER,
        allowNull: false        
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false        
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false        
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false        
    }
  

},
 {
    freezeTableName: true,
    tableName: 'cars',
    sequelize
});



}