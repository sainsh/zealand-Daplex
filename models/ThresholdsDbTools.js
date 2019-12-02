
/* 
 *  Database functions for setting threshold for amount of helpdesk cases pr. square meter 
 *  for each helpdesk category.
 * 
 *  - Team Cyclone
 */


/**
 * CRUD for thresholds table 
 */
 
createHelpdeskThreshold = async function(yellowThreshold, redThreshold, propertyId){

    try{
        let thresholdTable = getHelpdeskThresholdsTable();
        

    }
    

}

async function (helpdeskWeightArray) {
    try {
        let helpdeskWeightTable = getHelpdeskWeightTable();
        let resultsArray = [];
        console.log(helpdeskWeightArray[0]);
        let result = await helpdeskWeightTable.create({
            property_type_id: helpdeskWeightArray[0],
            helpdesk_indeklima: helpdeskWeightArray[1],
            helpdesk_udv_b: helpdeskWeightArray[2],
            helpdesk_mur_facade: helpdeskWeightArray[3],
            helpdesk_tag: helpdeskWeightArray[4],
            helpdesk_ud_gavl: helpdeskWeightArray[5],
            helpdesk_tagdaekning: helpdeskWeightArray[6],
            helpdesk_tag_ned: helpdeskWeightArray[7],
            helpdesk_vinduer: helpdeskWeightArray[8],
            helpdesk_fundament: helpdeskWeightArray[9],
            helpdesk_teknisk: helpdeskWeightArray[10]
        });


        resultsArray.push(result.dataValues.property_type_id);
        console.log(resultsArray[0]);
    
        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};



/** 
 * Method returning the threshold limits table (layout).
 * @param sequelize: from DB tools 
 * @param Sequelize: from DB tools
 */
getHelpdeskThresholdsTable = (sequelize, Sequelize) => {
    return sequelize.define('helpdesk_thresholds', {
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




exports.getHelpdeskThresholdsTable;
exports.createHelpdeskThreshold;


