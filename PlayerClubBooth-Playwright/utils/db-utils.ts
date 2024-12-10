import { expect } from "@playwright/test";
import sql, { ConnectionPool } from "mssql";

/**
 * This class is used to do db related operations
 */

export default class DBUtils {

    connectionurl: string;
    conn: ConnectionPool;

    constructor(connectionurl: string) {

        this.connectionurl = connectionurl

    }

    /**
     * This method is used to egt the values from db based on the sql query
     * @param query 
     * @returns 
     */
    async getResultSet(query: string): Promise<any> {
        let req: sql.Request;
        let result: any;
        this.conn = await sql.connect(this.connectionurl)
        if (this.conn.connected) {
            try {
                req = this.conn.request();
                result = await req.query(query);


            }
            catch (err) {
                console.log(err);
                expect(true).toBeFalsy();
            }
            finally {
                await this.conn.close();
                console.log("Connection Closed");
            }
        }

        return result;
    }

    /**
     * This method is used to do update or delete from db
     * @param query 
     * @returns 
     */
    async doUpdateOrDelete(query: string): Promise<any> {
        let req: sql.Request;
        let result: any;
        this.conn = await sql.connect(this.connectionurl)
        if (this.conn.connected) {
            try {
                req = this.conn.request();
                result = await req.query(query);


            }
            catch (err) {
                console.log(err);
                expect(true).toBeFalsy();
            }
            finally {
                await this.conn.close();
                console.log("Connection Closed");
            }
        }

        return result.rowsAffected.length;
    }
}