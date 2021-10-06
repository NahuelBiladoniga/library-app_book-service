import {CreateOptions, DataTypes, Model} from "sequelize";
import sequelize from "../setup";

export class Reservation extends Model {
    userEmail!: string
    bookId!: string
    startDate!: Date
    endDate!: Date
}

Reservation.init({
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
        },
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY,
    },
    {
        sequelize,
        modelName: 'Reservation'
    },
)
