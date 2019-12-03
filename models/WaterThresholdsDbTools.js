
/* 
 *  Database functions for setting threshold for amount of helpdesk cases pr. square meter 
 *  for each helpdesk category.
 * 
 *  - Team Cyclone
 */

 const headerName = "WaterThresholdsDbTools.js";

 /**
 * CRUD for thresholds table 
 */
 
 /**
  * Create method for water Thresholds
  */

 createWaterThreshold = async function(yellowThreshold, redThreshold, propertyId, sequelize, Sequelize){

    let debugMessage = headerName + "createWaterThreshold: ";

    console.log(debugMessage + "Starting... \n" + 
                                "yellowThreshold = " + yellowThreshold + "\n" +
                                "redThreshold = " + redThreshold + "\n" +
                                "propertyId = " + propertyId);


    try{
        console.log(debugMessage + "Getting WaterThresholdsTable.")
        let thresholdTable = getWaterThresholdsTable(sequelize, Sequelize);

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
 * READ method helpdesk Thresholds
 */
readWaterThreshold = async function(id, sequelize, Sequelize){

    let debugMessage = headerName + 'readWaterThresholdTable: '; 

    console.log(debugMessage + 'Read initialized...');

    let waterThresholds = getWaterThresholdsTable(sequelize, Sequelize);
    let result = await waterThresholds.findAll((id ? {where: {property_id: id}} : {}));

    console.log(debugMessage + result.length === 0 ? result : 'nothing was found with the specified id'); 

    return result.length === 0 ? await Promise.reject(new Error("No water threshold data found")) : result;
}


/** 
 * Method returning the threshold limits table (layout).
 * @param sequelize: from DB tools 
 * @param Sequelize: from DB tools
 * @returns table setup for threshold in daplex db
 */
getWaterThresholdsTable = (sequelize, Sequelize) => {
    return sequelize.define('water_thresholds', {
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

exports.getWaterThresholdsTable = getWaterThresholdsTable;
exports.createWaterThreshold = createWaterThreshold;
exports.readWaterThreshold = readWaterThreshold;

