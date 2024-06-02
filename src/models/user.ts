import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";


export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    declare id: number;
    declare username: string;
    declare password: string;
    
}


export function UserFactory(sequelize: Sequelize) {
    User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
        
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
        
    }

},
 {
    freezeTableName: true,
    tableName: 'user',
    sequelize
});
}