
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

exports.createHelpdeskThreshold = async function(categoryName, sequelize, Sequelize){

    try{
        let thresholdTable = getHelpdeskCategoriesTable(sequelize, Sequelize);

        let result = await thresholdTable.create({
            name: categoryName,
        });

        console.log("create helpdesk categori: " + result[0]);
        
    } catch(e){
        throw e;
    }
    
}