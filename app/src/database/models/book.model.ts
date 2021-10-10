import {DataTypes, Model} from 'sequelize'
import {isValidISBN} from "../../utils/validators";
import sequelize from "../setup";
import {Organization} from "./organization.model";


export class Book extends Model {
    id: number
    ISBN!: string
    title!: string
    author!: string
    year!: number
    totalExamples!: number
    imagePath: string
    organizationName: string
    isActive: boolean
}

Book.init({
    ISBN: {
        type: DataTypes.STRING, validate: {
            isValidISBN(value) {
                if (!isValidISBN(value)) throw new Error('ISBN is not valid.')
            }
        }
    },
    organizationName: {
        type: DataTypes.STRING, allowNull: false, references: {model: Organization, key: 'name'}
    },
    isActive: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    title: {type: DataTypes.STRING, allowNull: false},
    author: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.INTEGER, validate: {min: 0, max: new Date().getFullYear()}},
    totalExamples: {type: DataTypes.INTEGER, defaultValue: 0, allowNull: false},
    imagePath: {type: DataTypes.STRING, validate: {isUrl: true,},},
}, {
    sequelize,
    modelName: 'Book'
})
