import DBUtils from "../utils/db-utils";

export default class PreRequisites {

    /**
     * This method is used to clear the linked players
     * @param dbconurl 
     * @param playerid 
     */
    async clearLinkedPlayer(dbconurl:string,playerid:string){
        const dbutils = new DBUtils(dbconurl);
        const result= await dbutils.getResultSet("select top 1 LinkNumber from playerlink where playerid='"+playerid+"'")
        if (result.recordset.length>0){
           let linkid:string= result.recordset[0].LinkNumber
           await dbutils.doUpdateOrDelete("update link set Status='I' where LinkNumber='"+linkid+"'")
           await dbutils.doUpdateOrDelete("delete from playerlink where playerid='"+playerid+"'")
           console.log("Cleared the linked playerid")
        }
    }

    /**
     * This method is used to clear the comments
     * @param dbconurl 
     * @param playerid 
     */
    async clearComments(dbconurl:string,playerid:string){
        const dbutils = new DBUtils(dbconurl);
        await dbutils.doUpdateOrDelete("update playercomment set Status='I' where playerid ='"+playerid+"' and userid='1' and Status='A'  and Expiration>(SELECT CONVERT(DATETIME, CONVERT(DATE, GETDATE()), 121))")
    }

    /**
     * This method is used to clear the lock
     * @param dbconurl 
     * @param playerid 
     */
    async clearLock(dbconurl:string,playerid:string){
        const dbutils = new DBUtils(dbconurl);
        await dbutils.doUpdateOrDelete("delete from pat where PlayerID='" +playerid+ "'")
    }


    async updateEnrollmentDOBConfig(dbconurl:string,configvalue:string){
        const dbutils = new DBUtils(dbconurl);
        await dbutils.doUpdateOrDelete("update ConfigGlobal set ConfigValue=" +configvalue+ " where ItemID = 600");
    }
}