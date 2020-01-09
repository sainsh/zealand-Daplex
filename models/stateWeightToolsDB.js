
/* 
 *  Database functions for setting Weight for amount of State cases pr. square meter 
 *  for each State category.
 * 
 *  - Team Cyclone
 */

const headerName = "stateWeightToolsDB.js: ";


/**
 * CRUD for Weight table 
 */
 
 /**
  * Create method for State Weight
  */
createStateWeight = async function(categoryId, propertyId, weight, sequelize, Sequelize){

    let debugMessage = headerName + "createWeightState: ";

    console.log(debugMessage + "Starting... \n" + 
                                "weight     = " + weight + "\n" +
                                "CategoryId = " + categoryId + "\n" +
                                "propertyId = " + propertyId);


    try{
        console.log(debugMessage + "Getting weightStateTabel.")
        let weightTable = getWeightStateTable(sequelize, Sequelize);

        let result = await weightTable.create({
            property_id: propertyId, 
            State_category_id: categoryId,
            weight: weight
        });
        
        console.log(debugMessage + "ID inserted = " + result.dataValues.id);
        
    } catch(e){
        console.log(debugMessage + "\n"  + e);
    }
    
}

/**
 * READ method State Weight
 */
readStateWeight = async function(id, sequelize, Sequelize){

    let debugMessage = headerName + 'readStateWeightTable: '; 

    console.log(debugMessage + 'Read initialized...');
    
    try {
        let StateWeights = getStateWeightTable(sequelize, Sequelize);
        let result = await StateWeights.findAll((id ? {where: {id: id}} : {}));

        let answer = result.length === 0 ? result : 'nothing was found with the specified id';

        result.forEach(element => {
            console.log(debugMessage + "id: " + element.id + " Weight " + element.weight + 
            " property type id: " +  element.property_id + " State category id = " + element.state_category_id);
        }); 

        return result.length === 0 ? await Promise.reject(new Error("No State Weight data found")) : result;
    } catch(e){
        throw e;
    }

}




updateStateWeight = async function(id, propertyId, categoryId, weight , sequelize, Sequelize){
    
    let debugMessage = headerName + 'updateStateWeightTable: '; 

    console.log(debugMessage + 'Update initialized...');

    try {
        console.log(debugMessage + 'Getting Table...');
        let WeightTable = getStateWeightTable(sequelize, Sequelize);

        console.log(debugMessage + 'Updating Table...');
        let result = await WeightTable.update({
            property_id: propertyId,
            state_category_id: categoryId,
            weight: weight
        }, {returning: true, where: {id: id}});
    
        console.log(debugMessage + "Result = " + result);

        return result[0]; // Return an array containing all inserted IDs
    
    
    } catch (e) {
        console.log(debugMessage + "database error occurred.");
        throw e;
    }

}

deleteStateWeight = async function(id, sequelize, Sequelize){
    
    let debugMessage = headerName + 'deleteStateWeightTable: '; 

    console.log(debugMessage + 'Delete initialized...');

    try {
        console.log(debugMessage + 'Getting Weight Table...');
        let weightTable = getStateWeightTable(sequelize, Sequelize);

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
getStateWeightTable = (sequelize, Sequelize) => {
    return sequelize.define('state_weight', {
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
        state_category_id: {
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


exports.getStateWeightTable = getStateWeightTable;
exports.createStateWeight = createStateWeight;
exports.readStateWeight = readStateWeight;
exports.updateStateWeight = updateStateWeight;
exports.deleteStateWeight = deleteStateWeight;


