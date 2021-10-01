import {DataTypes, Model} from 'sequelize'
import {isValidISBN} from "../../utils/validators";
import sequelize from "../setup";
import {Organization} from "./organization.model";

export class Book extends Model {
    ISBN!: string
    title!: string
    author!: string
    year!: number
    numberOfExamples!: number
    imagePath: string
    organizationName: string
    isActive: boolean
}

Book.init({
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    ISBN: {
        primaryKey: true,
        type: DataTypes.STRING,
        validate: {
            isValidISBN(value) {
                if (!isValidISBN(value)) throw new Error('ISBN is not valid.')
            }
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        validate: {
            min: 0,
            max: new Date().getFullYear(),
        },
    },
    numberOfExamples: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        validate: {
            min: 0,
        },
    },
    imagePath: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true,
        },
    },
    organizationName: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Organization,
            key: 'name'
        }
    },
}, {
    sequelize,
    modelName: 'Book'
})
