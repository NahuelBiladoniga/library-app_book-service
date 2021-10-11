import {DataTypes, Model} from "sequelize";
import sequelize from "../setup";

export class Reservation extends Model {
    userEmail!: string
    organizationName!: string
    bookId!: string
    startDate!: Date
    endDate!: Date
}

Reservation.init({
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        organizationName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY,
    },

    {
        indexes: [
            {
                unique: true,
                fields: ['organizationName', 'bookId', 'startDate', 'endDate']
            }
        ],
        sequelize,
        modelName: 'Reservation'
    },
)
