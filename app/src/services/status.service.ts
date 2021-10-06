import sequelize from "../database/setup";

export default class StatusService {

    public static async getServerStatus(){
        await StatusService.getDatabaseStatus();
    }

    private static async getDatabaseStatus() {
        await sequelize.authenticate();
    }
}