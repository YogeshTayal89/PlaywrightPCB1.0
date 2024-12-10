import moment from 'moment';
/**
 * This class is having all the utility methods
 */
export default class Utils {

    /**
     * MEthod is used to get the random number
     * @param max 
     * @returns 
     */
    async getRandomNumber(max: number): Promise<string> {
        return String(Math.floor(Math.random() * max));
    }

     /**
     * MEthod is used to get the random number between two numbers
     * @param min 
     * @param max
     * @returns 
     */
     async getRandomNumberBetweenTwoNumbers(min:number,max: number): Promise<string> {
        return String(Math.floor(Math.random() * max)+min);
    }

    /**
     * This method is used to get the future date
     * @returns 
     */
    async getFutureDate(): Promise<string> {
        let futuredate = moment(new Date(), 'MM/DD/yyyy').add(5, "years")
        let futuredateformat: string = moment(futuredate).format('MM/D/yyyy, hh:mm A');
        return futuredateformat;
    }

    /**
     * This method is used to get the past date 
     * @returns 
     */
    async getPastDate(): Promise<string> {
        let pastdate = moment(new Date(), 'MM/DD/yyyy').subtract(5, "years")
        let pastdateformat: string = moment(pastdate).format('MM/D/yyyy, hh:mm A');
        return pastdateformat;
    }

}