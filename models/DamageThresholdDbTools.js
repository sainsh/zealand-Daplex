
/* 
 *  Database functions for setting threshold for damage pr. damage category for each building type
 *  
 * 
 *  - Team Cyclone
 */

const headerName = "DamageThresholdsDbTools.js";

/**
* CRUD for thresholds table 
*/

/**
 * Create method for damage Thresholds
 */

createDamageThreshold = async function(yellowThreshold, redThreshold, propertyId, sequelize, Sequelize){

    let debugMessage = headerName + "createDamageThreshold: ";
 
    console.log(debugMessage + "Starting... \n" + 
                                "yellowThreshold = " + yellowThreshold + "\n" +
                                "redThreshold = " + redThreshold + "\n" +
                                "propertyId = " + propertyId);
 
 
    try{
        console.log(debugMessage + "Getting DamageThresholdsTable.")
        let thresholdTable = getHeatThresholdsTable(sequelize, Sequelize);
 
        let result = await thresholdTable.create({
            property_id: propertyId, 
            threshold_yellow: yellowThreshold,
            threshold_red: redThreshold
        });
        
        console.log(debugMessage + "ID's inserted = " + result.dataValues.id);
        
    } catch(e){
        console.log(debugMessage + "\n"  + e);
    }
 
}

/**
* READ method damage Thresholds
*/
readDamageThreshold = async function(id, sequelize, Sequelize){

    let debugMessage = headerName + 'readDamageThresholdTable: '; 
 
    console.log(debugMessage + 'Read initialized...');
 
    let damageThresholds = getDamageThresholdsTable(sequelize, Sequelize);
    let result = await heatThresholds.findAll((id ? {where: {property_id: id}} : {}));
 
    console.log(debugMessage + result.length === 0 ? result : 'nothing was found with the specified id'); 
 
    return result.length === 0 ? await Promise.reject(new Error("No damage threshold data found")) : result;
}

updateDamageThreshold = async function(id, propertyId, yellowThreshold, redThreshold, sequelize, Sequelize){
   
   let debugMessage = headerName + 'updateDamageThresholdTable: '; 

   console.log(debugMessage + 'Update initialized...');

   try {
       console.log(debugMessage + 'Getting Table...');
       let thresholdTable = getDamageThresholdsTable(sequelize, Sequelize);

       console.log(debugMessage + 'Updating Table...');
       let result = await thresholdTable.update({
           property_type_id: propertyId,
           threshold_yellow: yellowThreshold,
           threshold_red: redThreshold
       }, {returning: true, where: {id: id}});
   
       console.log(debugMessage + "Result = " + result);

       return result[0]; // Return an array containing all inserted IDs
   
   
   } catch (e) {
       console.log(debugMessage + "database error occurred.")
       throw e;
   }

}

deleteDamageThreshold = async function(id, sequelize, Sequelize){
   
    let debugMessage = headerName + 'deleteDamgeThresholdTable: '; 
 
    console.log(debugMessage + 'Delete initialized...');
 
    try {
        console.log(debugMessage + 'Getting Threshodld Table...');
        let thresholdTable = getDamageThresholdsTable(sequelize, Sequelize);
 
        console.log(debugMessage + 'deleting id from Table...');
        let result = await thresholdTable.destroy({
            where: {id: id}
        }, {returning: true, where: {id: id}});
    
        console.log(debugMessage + "Deleted ID = " + result.id);
 
        return result; // Return an array containing all inserted IDs
    
    
    } catch (e) {
        console.log(debugMessage + "database error occurred.");
        throw e;
    }
 
 }


 /** 
* Method returning the threshold limits table (layout).
* @param sequelize: from DB tools 
* @param Sequelize: from DB tools
* @returns table setup for threshold in daplex db
*/
getDamageThresholdsTable = (sequelize, Sequelize) => {
    return sequelize.define('damage_thresholds', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true, 
            primaryKey: true,
        },
        property_id: {
            type: Sequelize.INTEGER,
            refrences: 'properties',
            refrencesKey: 'property_id',
            unique: true
        },
        threshold_yellow: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        threshold_red: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}

exports.getDamageThresholdsTable = getDamageThresholdsTable;
exports.createDamageThreshold = createDamageThreshold;
exports.readDamageThreshold = readDamageThreshold;
exports.updateDamageThreshold = updateDamageThreshold;
exports.deleteDamageThreshold = deleteDamageThreshold;
