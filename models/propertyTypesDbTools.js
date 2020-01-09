
/** 
 * Method returning the property types table (layout).
 * @param sequelize: from DB tools 
 * @param Sequelize: from DB tools
 * @returns table setup for property_types in db
 */
getPropertyTypesTable = (sequelize, Sequelize) => {
    return sequelize.define('property_types', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true, 
            primaryKey: true,
        },
        type_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}

exports.createPropertyType = async function(typeId, name, sequelize, Sequelize){

    try{
        let result = await getPropertyTypesTable(sequelize, Sequelize).create({
            type_id: typeId,
            name: name
        });

        
    } catch(e){
        throw e;
    }
    
}

exports.updatePropertyTypes = async function(typeId, name, sequelize, Sequelize){

    try{
    
        let result = getPropertyTypesTable(sequelize, Sequelize).update({
            type_id: typeId,
            name: name
        }, {returning: true, where: {id: id}});

        // returns id of updated field
        return result[0];

    } catch(e){
        throw e; 
    }

}

// returns specific id if id is provided, else it returns all elements
exports.readPropertyTypes = async function(id, sequelize, Sequelize){

    if(id){
        try{
    
            let result = await getPropertyTypesTable(sequelize, Sequelize).findAll((id ? {where: {id: id}} : {}));
            
            return result.length === 0 ? await Promise.reject(new Error("No property types data found with id " + id)) : result;
        } catch(e){
            throw e;
        }
    } else {

        try{
    
            let result = await getPropertyTypesTable(sequelize, Sequelize).findAll();
            
            return result.length === 0 ? await Promise.reject(new Error("No property types data found")) : result;
        } catch(e){
            throw e;
        }

    }
    

}

exports.deletePropertyType = async function(id, sequelize, Sequelize){

    try{

        let result = getPropertyTypesTable(sequelize, Sequelize).destroy({
            where: {id: id}
        }, {returning: true, where: {id: id}});
    

        return result; // Return object of removed database row
    
    
    } catch (e) {
        throw e;
    }

}

exports.getPropertyTypesTable = getPropertyTypesTable;