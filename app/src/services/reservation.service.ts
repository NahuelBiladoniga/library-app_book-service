import axios from 'axios'
import { RequestErrorDto } from '../dtos/requestError.dto'
import { getServicesConfig } from '../utils/environment'

export default class ReservationService {
    public static async areActiveReservationsFromThisDay(ISBN: string, organizationName: string, date: Date): Promise<Boolean> {
        try {
            const reserveServiceURl = getServicesConfig().reserveService
            const response = await axios({
                method: 'get',
                url: `http://${reserveServiceURl}:80/reservations/hasActiveReservations`,
                headers: {
                    'organization-name': organizationName,
                    'isbn': ISBN,
                },
                params: {
                    'date': date.toDateString()
                },
            })

            if (response.status < 400) {
                const {areReserveActive} = response.data

                return areReserveActive
            }

            throw new RequestErrorDto(
                `Book service could not fetch book token for ibn: ${ISBN} and organization: ${organizationName}`,
                400,
            )
        } catch(e) {
            console.log(e)
            throw new RequestErrorDto(
                `Could not connect to reservation service`,
                500,
            )
        }
    }
}
