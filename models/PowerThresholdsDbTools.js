
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

 }

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
            refrencesKey: 'property_id'
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
    
