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
            allowNull: true
        },
        property_size: {
            type: Sequelize.DOUBLE,
            allowNull: true
        },
        property_type_id: {
            type: Sequelize.INTEGER,
            allowNull: true
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
        property_type_id: {
            type: Sequelize.INTEGER,
            autoIncrement: false,
            primaryKey: true
        },
        helpdesk_indeklima: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        helpdesk_teknisk: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        helpdesk_udv_b: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        helpdesk_mur_facade: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        helpdesk_tag: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        helpdesk_ud_gavl: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        helpdesk_tagdaekning: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        helpdesk_tag_ned: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        helpdesk_vinduer: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        helpdesk_fundament: {
            type: Sequelize.DOUBLE,
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

// exports.setupDatabase(host, user, password);

/**
 * Function for creating the tables.
 * @returns {Promise<void>}
 */
exports.setupTables = async function () {
    let propertiesTable = getPropertiesTable();
    let helpdeskTable = getHelpdeskTable();
    let helpdeskWeightTable = getHelpdeskWeightTable();

    helpdeskTable.belongsTo(propertiesTable, {foreignKey: 'property_id'});

    await propertiesTable.sync({force: false});
    await helpdeskTable.sync({force: false});
    await helpdeskWeightTable.sync({force: false});
};

/**
 * Function for creating a new property (ejendom).
 * @param propertyName
 * @param propertySize
 * @param propertyTypeId
 * @returns {Promise<properties.property_id|{autoIncrement, type, primaryKey}|helpdesk_data.property_id|{allowNull, type}|*|number>}
 */
exports.createProperty = async function (propertyName, propertySize = 100, propertyTypeId = 420) {
    try {
        let propertiesTable = getPropertiesTable();

        let result = await propertiesTable.create({
            property_name: propertyName,
            property_size: propertySize,
            property_type_id: propertyTypeId
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
            property_type_id: helpdeskWeightArray[0],
            helpdesk_indeklima: helpdeskWeightArray[1],
            helpdesk_teknisk: helpdeskWeightArray[2],
            helpdesk_udv_b: helpdeskWeightArray[3],
            helpdesk_mur_facade: helpdeskWeightArray[4],
            helpdesk_tag: helpdeskWeightArray[5],
            helpdesk_ud_gavl: helpdeskWeightArray[6],
            helpdesk_tagdaekning: helpdeskWeightArray[7],
            helpdesk_tag_ned: helpdeskWeightArray[8],
            helpdesk_vinduer: helpdeskWeightArray[9],
            helpdesk_fundament: helpdeskWeightArray[10]
        });

        resultsArray.push(result.dataValues);

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

// exports.createHelpdeskWeightTable([420, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]);

exports.readProperty = async function (id) {
    try {
        let propertiesTable = getPropertiesTable();
        let result = await propertiesTable.findAll((id ? {where: {property_id: id}} : {})); // Add the "where" option, if the ID is not undefined
        return result.length === 0 ? await Promise.reject(new Error("No properties found")) : result; // Return an error, if 0 results are found, else return the result(s)
    } catch (e) {
        throw e;
    }
};

exports.readHelpdeskData = async function (id) {
    try {
        let helpdeskTable = getHelpdeskTable();
        let result = await helpdeskTable.findAll((id ? {where: {property_type_id: id}} : {})); // Add the "where" option, if the ID is not undefined
        return result.length === 0 ? await Promise.reject(new Error("No helpdesk data found")) : result; // Return an error, if 0 results are found, else return the result(s)
    } catch (e) {
        throw e;
    }
};

exports.readHelpdeskWeight = async function (id) {
    try {
        let helpdeskWeightTable = getHelpdeskWeightTable();
        let result = await helpdeskWeightTable.findAll((id ? {where: {property_type_id: id}} : {})); // Add the "where" option, if the ID is not undefined
        return result.length === 0 ? await Promise.reject(new Error("No helpdesk data found")) : result; // Return an error, if 0 results are found, else return the result(s)
    } catch (e) {
        throw e;
    }
};

exports.processHelpdeskData = async function () {
    let results = await exports.readHelpdeskData();
    // console.log(results);

    let resultPerProperty = {};

    // Count helpdesk reports for each property
    for (let result of results) {
        let helpdeskSubject = result.dataValues.subject;
        let propertyId = result.dataValues.property_id;

        if (!resultPerProperty[propertyId])
            resultPerProperty[propertyId] = {};

        resultPerProperty[propertyId][helpdeskSubject] = (resultPerProperty[propertyId][helpdeskSubject] ? resultPerProperty[propertyId][helpdeskSubject] + 1 : 1);
    }

    // console.log(resultPerProperty);

    let helpdeskWeights = await exports.readHelpdeskWeight();
    console.log(helpdeskWeights);

    let map = {
        'Lys og el': 'helpdesk_indeklima',
        'Tekniske anlæg': 'helpdesk_teknisk',
        'Varme og ventilation': 'helpdesk_udv_b',
        '0': 'helpdesk_mur_facade',
        '1': 'helpdesk_tag',
        '2': 'helpdesk_ud_gavl',
        '3': 'helpdesk_tagdaekning',
        '4': 'helpdesk_tag_ned',
        'Vinduer, døre og konstruktion': 'helpdesk_vinduer',
        '5': 'helpdesk_fundament'
    };

    for (let propertyId in resultPerProperty) {
        if (resultPerProperty.hasOwnProperty(propertyId)) {

            let prop = await exports.readProperty(propertyId);
            let propertyTypeId = prop[0].dataValues.property_type_id;
            console.log(propertyTypeId);

            let weightsObject;

            for (let helpdeskWeight of helpdeskWeights) {
                if (helpdeskWeight.dataValues.property_type_id === propertyTypeId) {
                    weightsObject = helpdeskWeight.dataValues;
                    break;
                }
            }

            let score = 0;

            for (let subject in resultPerProperty[propertyId]) {
                if (resultPerProperty[propertyId].hasOwnProperty(subject)) {
                    let numberOfReports = resultPerProperty[propertyId][subject];
                    let subjectDatabaseName = map[subject];
                    let multiplier = weightsObject[subjectDatabaseName];
                    console.log(multiplier)
                    score += numberOfReports * multiplier;
                }
            }

            console.log(score);
        }
    }
};

// exports.processHelpdeskData();