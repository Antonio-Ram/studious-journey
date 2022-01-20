const bcrypt = require('bcrypt');
const { Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration 
Profile.init(
    {
        //Table columns and configs
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newProfileData) {
                newProfileData.password = await bcrypt.hash(newProfileData.password, 10);
                return newProfileData;
            },
            async beforeUpdate(updatedProfileData) {
                updatedProfileData.password = await bcrypt.hash(updatedProfileData.password, 10);
                return updatedProfileData;
            }
        },
        //Table config options
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'profile'
    }
);

module.exports = Profile;