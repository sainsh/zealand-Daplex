
/* 
 *  Database functions for setting threshold for amount of helpdesk cases pr. square meter 
 *  for each helpdesk category.
 * 
 *  - Team Cyclone
 */

 const headerName = "ThresholdsDbTools.js: ";


/**
 * CRUD for thresholds table 
 */
 
 /**
  * Create method for helpdesk Thresholds
  */
createHelpdeskThreshold = async function(yellowThreshold, redThreshold, propertyId, sequelize, Sequelize){

    let debugMessage = headerName + "createHelpdeskThreshold: ";

    console.log(debugMessage + "Starting... \n" + 
                                "yellowThreshold = " + yellowThreshold + "\n" +
                                "redThreshold = " + redThreshold + "\n" +
                                "propertyId = " + propertyId);


    try{
        console.log(debugMessage + "Getting HelpdeskThresholdsTable.")
        let thresholdTable = getHelpdeskThresholdsTable(sequelize, Sequelize);

        let result = await thresholdTable.create({
            property_type_id: propertyId, 
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
readHelpdeskThreshold = async function(id, sequelize, Sequelize){

    let debugMessage = headerName + 'readHelpdeskThresholdTable: '; 

    console.log(debugMessage + 'Read initialized...');
    
    try {
        let helpdeskThresholds = getHelpdeskThresholdsTable(sequelize, Sequelize);
        let result = await helpdeskThresholds.findAll((id ? {where: {property_type_id: id}} : {}));

        let answer = result.length === 0 ? result : 'nothing was found with the specified id';

        result.forEach(element => {
            console.log(debugMessage + "id: " + element.id + " threshold yellow: " + 
            element.threshold_yellow + " threshold red " + element.threshold_red + 
            " property type id: " +  element.property_type_id);
        }); 

        return result.length === 0 ? await Promise.reject(new Error("No helpdesk threshold data found")) : result;
    } catch(e){
        throw e;
    }

}




updateHelpdeskThresholdTable = async function(id, propertyId, yellowThreshold, redThreshold, sequelize, Sequelize){
    
    let debugMessage = headerName + 'updateHelpdeskThresholdTable: '; 

    console.log(debugMessage + 'Update initialized...');

    try {
        console.log(debugMessage + 'Getting Table...');
        let thresholdTable = getHelpdeskThresholdsTable(sequelize, Sequelize);

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


/** 
 * Method returning the threshold limits table (layout).
 * @param sequelize: from DB tools 
 * @param Sequelize: from DB tools
 * @returns table setup for threshold in daplex db
 */
getHelpdeskThresholdsTable = (sequelize, Sequelize) => {
    return sequelize.define('helpdesk_thresholds', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true, 
            primaryKey: true,
        },
        property_type_id: {
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


exports.getHelpdeskThresholdsTable = getHelpdeskThresholdsTable;
exports.createHelpdeskThreshold = createHelpdeskThreshold;
exports.readHelpdeskThreshold = readHelpdeskThreshold;
exports.updateHelpdeskThresholdTable = updateHelpdeskThresholdTable;


