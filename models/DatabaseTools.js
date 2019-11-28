const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');
const host = 'localhost';
const user = 'root';
const password = '';
const sequelize = new Sequelize('daplex', user, password, {
    host: host,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

function getPropertiesTable() {
    return sequelize.define('properties', {
        property_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        property_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
}

function getHelpdeskTable() {
    return sequelize.define('helpdesk_data', {
        helpdesk_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        submission_date: {
            type: Sequelize.STRING,
            allowNull: true
        },
        expected_execution_date: {
            type: Sequelize.STRING,
            allowNull: true
        },
        submitter_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        submitter_email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        submitter_phone: {
            type: Sequelize.STRING,
            allowNull: true
        },
        property_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        updated: {
            type: Sequelize.STRING,
            allowNull: true
        },
        building: {
            type: Sequelize.STRING,
            allowNull: true
        },
        room_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        placement_description: {
            type: Sequelize.STRING,
            allowNull: true
        },
        responsible: {
            type: Sequelize.STRING,
            allowNull: true
        },
        status: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
}

function getHelpdeskWeightTable() {
    return sequelize.define('helpdesk_weight_data', {
        helpdesk_indeklima: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_udv_b: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_mur_facade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_tag: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_ud_gavl: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_tagdaekning: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_tag_ned: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_vinduer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_fundament: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_teknisk: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}

function getHelpdeskLimitsTable() {
    return sequelize.define('helpdesk_limits_data', {
        helpdesk_indeklima: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_tekniske_anlaeg: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_udv_belaegning: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_murwaerk_og_facade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_tag: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_udhaeng_og_gavle: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_tagdaekning: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_tagrender_og_nedløb: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_vinduer_og_udv_doere: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_fundament_og_sokkel: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}


/**
 * Function for creating the database itself. Sequelize can't do that.
 * @param host
 * @param user
 * @param password
 * @returns {Promise<void>}
 */
exports.setupDatabase = async function (host, user, password) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: host,
            user: user,
            password: password
        });

        let queryCreateDatabase = "CREATE DATABASE IF NOT EXISTS daplex";
        await connection.query(queryCreateDatabase); // Create the database
    } catch (e) {
        throw e;
    } finally {
        if (connection)
            connection.end();
        exports.setupTables();
    }
};

exports.setupDatabase(host, user, password);

/**
 * Function for creating the tables.
 * @returns {Promise<void>}
 */
exports.setupTables = async function () {
    let propertiesTable = getPropertiesTable();
    let helpdeskTable = getHelpdeskTable();
    let helpdeskWeightTable = getHelpdeskWeightTable();
    let getHelpdeskLimitsTable = getHelpdeskLimitsTable();

    helpdeskTable.belongsTo(propertiesTable, {foreignKey: 'property_id'});

    await propertiesTable.sync({force: false});
    await helpdeskTable.sync({force: false});
    await helpdeskWeightTable.sync({force: false});
    await helpdeskLimitsTable.sync({force: false});
};

/**
 * Function for creating a new property (ejendom).
 * @param property_name
 * @returns {Promise<properties.property_id|{autoIncrement, type, primaryKey}|helpdesk_data.property_id|{allowNull, type}>}
 */
exports.createProperty = async function (property_name) {
    try {
        let propertiesTable = getPropertiesTable();

        let result = await propertiesTable.create({
            property_name: property_name
        });

        return result.dataValues.property_id; // Return the autogenerated ID of the inserted row
    } catch (e) {
        throw e;
    }
};

/**
 * Function for creating new helpdesk data.
 * @param helpdeskArray
 * @returns {Promise<[]>}
 */
exports.createHelpdeskData = async function (helpdeskArray) {
    try {
        let helpdeskTable = getHelpdeskTable();
        let resultsArray = [];
        let propertiesTable = getPropertiesTable();

        for (let helpdeskObject of helpdeskArray) { // Loop through all the data
            let propertyId = await propertiesTable.findAll(({where: {property_name: helpdeskObject['Ejendom']}})); // Check whether the property exists

            if (propertyId.length === 0) // If the results array have a length of 0, the property doesn't exist
                propertyId = await exports.createProperty(helpdeskObject['Ejendom']); // Create a new property
            else
                propertyId = propertyId[0].dataValues.property_id;

            let result = await helpdeskTable.create({
                number: helpdeskObject['Nr.'],
                subject: helpdeskObject['Emne'],
                description: helpdeskObject['Beskrivelse'],
                submission_date: helpdeskObject['Indmeldelsesdato'],
                expected_execution_date: helpdeskObject['Forventet udførelsesdato'],
                submitter_name: helpdeskObject['Indmelders navn'],
                submitter_email: helpdeskObject['Indmelders e-mail'],
                submitter_phone: helpdeskObject['Indmelders tlfnr.'],
                property_id: propertyId,
                updated: helpdeskObject['Opdateret'],
                building: helpdeskObject['Bygning'],
                room_number: helpdeskObject['Rumnr.'],
                placement_description: helpdeskObject['Placeringsbeskrivelse'],
                responsible: helpdeskObject['Ansvarlig'],
                status: helpdeskObject['Status'],
            });

            resultsArray.push(result.dataValues.helpdesk_id)
        }

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

exports.createHelpdeskWeightTable = async function (helpdeskWeightArray) {
    try {
        let helpdeskWeightTable = getHelpdeskWeightTable();
        let resultsArray = [];

        let result = await helpdeskWeightTable.create({
            helpdesk_indeklima: helpdeskWeightArray[0],
            helpdesk_udv_b: helpdeskWeightArray[1],
            helpdesk_mur_facade: helpdeskWeightArray[2],
            helpdesk_tag: helpdeskWeightArray[3],
            helpdesk_ud_gavl: helpdeskWeightArray[4],
            helpdesk_tagdaekning: helpdeskWeightArray[5],
            helpdesk_tag_ned: helpdeskWeightArray[6],
            helpdesk_vinduer: helpdeskWeightArray[7],
            helpdesk_fundament: helpdeskWeightArray[8],
            helpdesk_teknisk: helpdeskWeightArray[9]
        });

        resultsArray.push(result.dataValues)

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

exports.createHelpdeskLimitsTable = async function (helpdesklimitsArray) {
    try {
        let helpdeskLimitsTable = getHelpdeskLimitsTable();
        let resultsArray = [];

        let result = await helpdeskLimitsTable.create({
            helpdesk_indeklima: helpdesklimitsArray[0],
            helpdesk_tekniske_anlaeg: helpdesklimitsArray[1],
            helpdesk_udv_belaegning: helpdesklimitsArray[2],
            helpdesk_murwaerk_og_facade: helpdesklimitsArray[3],
            helpdesk_tag: helpdesklimitsArray[4],
            helpdesk_udhaeng_og_gavle: helpdesklimitsArray[5],
            helpdesk_tagdaekning: helpdesklimitsArray[6],
            helpdesk_tagrender_og_nedløb: helpdesklimitsArray[7],
            helpdesk_vinduer_og_udv_doere: helpdesklimitsArray[8],
            helpdesk_fundament_og_sokkel: helpdesklimitsArray[9]
        });

        resultsArray.push(result.dataValues)

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

exports.readProperty = async function (id) {
    try {
        let propertiesTable = getPropertiesTable();
        let result = await propertiesTable.findAll((id ? {where: {property_id: id}} : {})); // Add the "where" option, if the ID is not undefined
        return result.length === 0 ? await Promise.reject(new Error("failed to find id")) : result; // Return an error, if 0 results are found, else return the result(s)
    } catch (e) {
        throw e;
    }
};