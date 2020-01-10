
/* 
 *  Database functions for setting Weight for amount of helpdesk cases pr. square meter 
 *  for each helpdesk category.
 * 
 *  - Team Cyclone
 */

const headerName = "helpdeskWeightToolsDB.js: ";


/**
 * CRUD for Weight table 
 */
 
 /**
  * Create method for helpdesk Weight
  */
createHelpdeskWeight = async function(propertyId, categoryId, weight, sequelize, Sequelize){

    let debugMessage = headerName + "createWeightHelpdesk: ";

    console.log(debugMessage + "Starting... \n" + 
                                "weight     = " + weight + "\n" +
                                "CategoryId = " + categoryId + "\n" +
                                "propertyId = " + propertyId);


    try{
        console.log(debugMessage + "Getting weightHelpdeskTabel.")
        let weightTable = getHelpdeskWeightTable(sequelize, Sequelize);

        let result = await weightTable.create({
            property_type_id: propertyId, 
            helpdesk_category_id: categoryId,
            weight: weight
        });
        
        console.log(debugMessage + "ID inserted = " + result.dataValues.id);
        
    } catch(e){
        console.log(debugMessage + "\n"  + e);
    }
    
}

/**
 * READ method helpdesk Weight
 */
readHelpdeskWeight = async function(id, sequelize, Sequelize){
//KIG HER
    let debugMessage = headerName + 'readHelpdeskWeightTable: '; 

    console.log(debugMessage + 'Read initialized...');
    
    
    try {
        let helpdeskWeights = getHelpdeskWeightTable(sequelize, Sequelize);
        let result = await helpdeskWeights.findAll((id ? {where: {property_type_id: id}} : {}));

        return result.length === 0 ? console.log("nothing in db")
         : result;
    } catch(e){
        throw e;
    }

}



//Not sure if works
updateHelpdeskWeight = async function(propertyId, categoryId, weight , sequelize, Sequelize){
    
    let debugMessage = headerName + 'updateHelpdeskWeightTable: '; 

    console.log(debugMessage + 'Update initialized...');

    try {
        console.log(debugMessage + 'Getting Table...');
        let WeightTable = getHelpdeskWeightTable(sequelize, Sequelize);

        console.log(debugMessage + 'Updating Table...');
        let result = await WeightTable.update({
            weight: weight
        }, {returning: true, where: {property_type_id: propertyId, helpdesk_category_id: categoryId}});
        console.log(debugMessage + "Result = " + result);

        return result[0]; // Return an array containing all inserted IDs
    
    
    } catch (e) {
        console.log(debugMessage + "database error occurred.");
        throw e;
    }

}

deleteHelpdeskWeight = async function(propertyId, sequelize, Sequelize){
    
    let debugMessage = headerName + 'deleteHelpdeskWeightTable: '; 


    console.log(debugMessage + 'Delete initialized...' + propertyId);

    try {
        console.log(debugMessage + 'Getting Weight Table...');
        let weightTable = getHelpdeskWeightTable(sequelize, Sequelize);

        console.log(debugMessage + 'deleting id from Table...');
        let result = weightTable.destroy({ //removed await
            where: {property_type_id: propertyId}
        }, {returning: true, where: {property_type_id: propertyId}});
    
        console.log(debugMessage + "Deleted ID = " + result.property_type_id);

        return result; // Return an array containing all inserted IDs
    
    
    } catch (e) {
        console.log(debugMessage + "database error occurred.");
        throw e;
    }

}



/** 
 * Method returning the Weight limits table (layout).
 * @param sequelize: from DB tools 
 * @param Sequelize: from DB tools
 * @returns table setup for Weight in daplex db
 */
getHelpdeskWeightTable = (sequelize, Sequelize) => {
    return sequelize.define('helpdesk_weight', {
        property_type_id: {
            type: Sequelize.INTEGER,
            refrences: {model: 'property_types', key: 'type_id'}
            // refrencesKey: 'property_id'
        },
        helpdesk_category_id: {
            type: Sequelize.INTEGER, 
            refrences: {model: 'helpdesk_categories', key: 'id'}
            //refrencesKey: 'id'
        },
        weight: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}


exports.getHelpdeskWeightTable = getHelpdeskWeightTable;
exports.createHelpdeskWeight = createHelpdeskWeight;
exports.readHelpdeskWeight = readHelpdeskWeight;
exports.updateHelpdeskWeight = updateHelpdeskWeight;
exports.deleteHelpdeskWeight = deleteHelpdeskWeight;


