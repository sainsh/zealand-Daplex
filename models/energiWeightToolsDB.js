
/* 
 *  Database functions for setting Weight for amount of Energi cases pr. square meter 
 *  for each Energi category.
 * 
 *  - Team Cyclone
 */

const headerName = "energiWeightToolsDB.js: ";


/**
 * CRUD for energi table 
 */
 
 /**
  * Create method for energi Weight
  */
createEnergiWeight = async function(categoryId, propertyId, weight, sequelize, Sequelize){

    let debugMessage = headerName + "createWeightEnergi: ";

    console.log(debugMessage + "Starting... \n" + 
                                "weight     = " + weight + "\n" +
                                "CategoryId = " + categoryId + "\n" +
                                "propertyId = " + propertyId);


    try{
        console.log(debugMessage + "Getting weightEnergiTabel.")
        let weightTable = getWeightEnergiTable(sequelize, Sequelize);

        let result = await weightTable.create({
            property_id: propertyId, 
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
readEnergiWeight = async function(id, sequelize, Sequelize){

    let debugMessage = headerName + 'readEnergiWeightTable: '; 

    console.log(debugMessage + 'Read initialized...');
    
    try {
        let energiWeights = getEnergiWeightTable(sequelize, Sequelize);
        let result = await energiWeights.findAll((id ? {where: {id: id}} : {}));

        let answer = result.length === 0 ? result : 'nothing was found with the specified id';

        result.forEach(element => {
            console.log(debugMessage + "id: " + element.id + " Weight " + element.weight + 
            " property type id: " +  element.property_id + " Energi category id = " + element.energi_category_id);
        }); 

        return result.length === 0 ? await Promise.reject(new Error("No Energi Weight data found")) : result;
    } catch(e){
        throw e;
    }

}




updateEnergiWeight = async function(id, propertyId, categoryId, weight , sequelize, Sequelize){
    
    let debugMessage = headerName + 'updateEnergiWeightTable: '; 

    console.log(debugMessage + 'Update initialized...');

    try {
        console.log(debugMessage + 'Getting Table...');
        let WeightTable = getEnergiWeightTable(sequelize, Sequelize);

        console.log(debugMessage + 'Updating Table...');
        let result = await WeightTable.update({
            property_id: propertyId,
            energi_category_id: categoryId,
            weight: weight
        }, {returning: true, where: {id: id}});
    
        console.log(debugMessage + "Result = " + result);

        return result[0]; // Return an array containing all inserted IDs
    
    
    } catch (e) {
        console.log(debugMessage + "database error occurred.");
        throw e;
    }

}

deleteEnergiWeight = async function(id, sequelize, Sequelize){
    
    let debugMessage = headerName + 'deleteEnergiWeightTable: '; 

    console.log(debugMessage + 'Delete initialized...');

    try {
        console.log(debugMessage + 'Getting Weight Table...');
        let weightTable = getEnergiWeightTable(sequelize, Sequelize);

        console.log(debugMessage + 'deleting id from Table...');
        let result = await weightTable.destroy({
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
 * Method returning the Weight limits table (layout).
 * @param sequelize: from DB tools 
 * @param Sequelize: from DB tools
 * @returns table setup for Weight in daplex db
 */
getEnergiWeightTable = (sequelize, Sequelize) => {
    return sequelize.define('energi_weight', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true, 
            primaryKey: true
        },
        property_id: {
            type: Sequelize.INTEGER,
            refrences: {model: 'properties', key: 'property_id'}
            // refrencesKey: 'property_id'
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


exports.getEnergiWeightTable = getEnergiWeightTable;
exports.createEnergiWeight = createEnergiWeight;
exports.readEnergiWeight = readEnergiWeight;
exports.updateEnergiWeight = updateEnergiWeight;
exports.deleteEnergiWeight = deleteEnergiWeight;


