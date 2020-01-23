
/* 
 *  Database functions for setting Weight for amount of Energi cases pr. square meter 
 *  for each Energi category.
 * 
 *  - Team Cyclone
 */

const headerName = "energyWeightToolsDB.js: ";


/**
 * CRUD for energi table 
 */
 
 /**
  * Create method for energi Weight
  */
createEnergyWeight = async function(propertyId, categoryId, weight, sequelize, Sequelize){

    let debugMessage = headerName + "createWeightEnergi: ";

    console.log(debugMessage + "Starting... \n" + 
                                "weight     = " + weight + "\n" +
                                "CategoryId = " + categoryId + "\n" +
                                "propertyId = " + propertyId);


    try{
        console.log(debugMessage + "Getting weightEnergiTabel.")
        let weightTable = getEnergyWeightTable(sequelize, Sequelize);

        let result = await weightTable.create({
            property_type_id: propertyId, 
            energi_category_id: categoryId,
            weight: weight
        });
        
        console.log(debugMessage + "ID inserted = " + result.dataValues.id);
        
    } catch(e){
        console.log(debugMessage + "\n"  + e);
    }
    
}

/**
 * READ method Energi Weight
 */
readEnergyWeight = async function(property_type_id, sequelize, Sequelize){

    let debugMessage = headerName + 'readEnergiWeightTable: '; 

    console.log(debugMessage + 'Read initialized...');
    
    try {
        let energiWeights = getEnergyWeightTable(sequelize, Sequelize);
        let result = await energiWeights.findAll((property_type_id ? {where: {property_type_id: property_type_id}} : {}));

        let answer = result.length === 0 ? result : 'nothing was found with the specified id';

        result.forEach(element => {
            console.log(debugMessage +" Weight " + element.weight + 
            " property type id: " +  element.property_type_id + " Energi category id = " + element.energi_category_id);
        }); 

        return result.length === 0 ? console.log("nothing in db")
         : result;
    } catch(e){
        throw e;
    }

}



//Not sure if works
updateEnergyWeight = async function(propertyId, categoryId, weight , sequelize, Sequelize){
    
    let debugMessage = headerName + 'updateEnergiWeightTable: '; 

    console.log(debugMessage + 'Update initialized...');

    try {
        console.log(debugMessage + 'Getting Table...');
        let WeightTable = getEnergyWeightTable(sequelize, Sequelize);

        console.log(debugMessage + 'Updating Table...');
        let result = await WeightTable.update({
            energi_category_id: categoryId,
            weight: weight
        }, {returning: true, where: {property_type_id: propertyid, energi_category_id: categoryId}});
    
        console.log(debugMessage + "Result = " + result);

        return result[0]; // Return an array containing all inserted IDs
    
    
    } catch (e) {
        console.log(debugMessage + "database error occurred.");
        throw e;
    }

}

deleteEnergyWeight = async function (propertyid, sequelize, Sequelize){
    
    let debugMessage = headerName + 'deleteEnergiWeightTable: '; 

    console.log(debugMessage + 'Delete initialized...');

    try {
        console.log(debugMessage + 'Getting Weight Table...');
        let weightTable = getEnergyWeightTable(sequelize, Sequelize);

        console.log(debugMessage + 'deleting id from Table...');
        let result = weightTable.destroy({ //removed await
            where: {property_type_id: propertyid}
        }, {returning: true, where: {property_type_id: propertyid}});
    
        console.log(debugMessage + "Deleted ID = " + result.id);

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
getEnergyWeightTable = (sequelize, Sequelize) => {
    return sequelize.define('energi_weight', {
        property_type_id: {
            type: Sequelize.INTEGER,
            refrences: {model: 'property_types', key: 'type_id'}
            // refrencesKey: 'property_type_id'
        },
        energi_category_id: {
            type: Sequelize.INTEGER, 
            refrences: {model: 'helpdesk_categories', key: 'id'} //Check model
            //refrencesKey: 'id'
        },
        weight: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}


exports.getEnergyWeightTable = getEnergyWeightTable;
exports.createEnergyWeight = createEnergyWeight;
exports.readEnergyWeight = readEnergyWeight;
exports.updateEnergyWeight = updateEnergyWeight;
exports.deleteEnergyWeight = deleteEnergyWeight;


