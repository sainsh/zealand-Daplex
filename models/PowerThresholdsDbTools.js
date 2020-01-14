
/* 
 *  Database functions for setting threshold for power pr. square meter for each building type
 *  
 * 
 *  - Team Cyclone
 */

 const headerName = "PowerThresholdsDbTools.js";

 /**
 * CRUD for thresholds table 
 */
 
 /**
  * Create method for power Thresholds
  */

 createPowerThreshold = async function(yellowThreshold, redThreshold, propertyId, sequelize, Sequelize){

    let debugMessage = headerName + "createPowerThreshold: ";

    console.log(debugMessage + "Starting... \n" + 
                                "yellowThreshold = " + yellowThreshold + "\n" +
                                "redThreshold = " + redThreshold + "\n" +
                                "propertyId = " + propertyId);


    try{
        console.log(debugMessage + "Getting PowerThresholdsTable.")
        let thresholdTable = getPowerThresholdsTable(sequelize, Sequelize);

        let result = await thresholdTable.create({
            property_id: propertyId, 
            threshold_yellow: yellowThreshold,
            threshold_red: redThreshold
        });
        
        console.log(debugMessage + "ID's inserted = " + result.dataValues.id);
        
    } catch(e){
        console.log(debugMessage + "\n"  + e);
    }

 };

 /**
 * READ method power Thresholds
 */
readPowerThreshold = async function(id, sequelize, Sequelize){

    let debugMessage = headerName + 'readPowerThresholdTable: '; 

    console.log(debugMessage + 'Read initialized...');

    let powerThresholds = getPowerThresholdsTable(sequelize, Sequelize);
    let result = await powerThresholds.findAll((id ? {where: {property_id: id}} : {}));

    console.log(debugMessage + result.length === 0 ? result : 'nothing was found with the specified id');

    return result.length === 0 ? await Promise.reject(new Error("No power threshold data found")) : result;
}

updatePowerThreshold = async function(id, propertyId, yellowThreshold, redThreshold, sequelize, Sequelize){
    
    let debugMessage = headerName + 'updatePowerThresholdTable: '; 

    console.log(debugMessage + 'Update initialized...');

    try {
        console.log(debugMessage + 'Getting Table...');
        let thresholdTable = getPowerThresholdsTable(sequelize, Sequelize);

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

deletePowerThreshold = async function(id, sequelize, Sequelize){
    
    let debugMessage = headerName + 'deletePowerThresholdTable: '; 

    console.log(debugMessage + 'Delete initialized...');

    try {
        console.log(debugMessage + 'Getting Threshodld Table...');
        let thresholdTable = getPowerThresholdsTable(sequelize, Sequelize);

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
getPowerThresholdsTable = (sequelize, Sequelize) => {
    return sequelize.define('power_thresholds', {
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

exports.getPowerThresholdsTable = getPowerThresholdsTable;
exports.createPowerThreshold = createPowerThreshold;
exports.readPowerThreshold = readPowerThreshold;
exports.updatePowerThreshold = updatePowerThreshold;
exports.deletePowerThreshold = deletePowerThreshold;
    
