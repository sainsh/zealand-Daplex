
/** 
 * Method returning the threshold limits table (layout).
 * @param sequelize: from DB tools 
 * @param Sequelize: from DB tools
 * @returns table setup for threshold in daplex db
 */
exports.getHelpdeskCategoriesTable = (sequelize, Sequelize) => {
    return sequelize.define('helpdesk_categories', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true, 
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}

exports.createHelpdeskCategory = async function(categoryName, sequelize, Sequelize){

    try{
        let helpdeskCategoryTable = getHelpdeskCategoriesTable(sequelize, Sequelize);

        let result = await helpdeskCategoryTable.create({
            name: categoryName,
        });

        console.log("create helpdesk categori: " + result[0]);
        
    } catch(e){
        throw e;
    }
    
}

exports.updateHelpdeskCategory = async function(id, name, sequelize, Sequelize){

    try{
        let helpdeskCategoryTable = getHelpdeskCategoriesTable(sequelize, Sequelize);

        let result = helpdeskCategoryTable.update({
            name: name
        }, {returning: true, where: {id: id}});

        console.log(result[0]);

        return result[0];

    } catch(e){
        throw e; 
    }

}

exports.readHelpdeskCategory = async function(id, sequelize, Sequelize){

    try{
        let helpdeskCategoryTable = getHelpdeskCategoriesTable(sequelize, Sequelize);

        let result = helpdeskCategoryTable.findAll((id ? {where: {id: id}} : {}));

        console.log("Elements found in databse with id = " + id);
        result.forEach(element => {
            console.log("id: " + element.id + " name: " + 
            element.name);
        }); 

        return result.length === 0 ? await Promise.reject(new Error("No helpdesk threshold data found")) : result;
    } catch(e){
        throw e;
    }

}

exports.deleteHelpdeskCategory = async function(id, sequelize, Sequelize){

    try{

        let helpdeskCategoryTable = getHelpdeskCategoriesTable(sequelize, Sequelize);

        helpdeskCategoryTable.destroy({
            where: {id: id}
        }, {returning: true, where: {id: id}});
    
        console.log("Deleted ID = " + result.id);

        return result; // Return object of removed database row
    
    
    } catch (e) {
        console.log("database error occurred.");
        throw e;
    }

    }

}