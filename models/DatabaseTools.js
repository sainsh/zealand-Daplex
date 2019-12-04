const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');

const htt = require('./ThresholdsDbTools');
exports.htt = htt;

const wtt = require('./WaterThresholdsDbTools');
exports.wtt = wtt;

const ptt = require('./PowerThresholdsDbTools');
exports.ptt = ptt;

const host = '127.0.0.1';
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
        },
        color: {
            type: Sequelize.STRING,
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

function getStateWeightTable() {
    return sequelize.define('state_weight_data', {
        property_type_id: {
            type: Sequelize.INTEGER,
            autoIncrement: false,
            primaryKey: true
        },
        state_tekniske: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        state_udvendige: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        state_osv: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}

function getOverallWeightTable() {
    return sequelize.define('overall_weight_data', {
        property_type_id: {
            type: Sequelize.INTEGER,
            autoIncrement: false,
            primaryKey: true
        },
        overall_tilstand: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        overall_energi: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        overall_helpdesk: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
}

//

function getHelpdeskWeightTable() {
    return sequelize.define('helpdesk_weight_data', {
        property_type_id: {
            type: Sequelize.INTEGER,
            autoIncrement: false,
            primaryKey: true
        },
        helpdesk_indeklima: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        helpdesk_teknisk: {
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
        }
    });
}



function getMaintenanceTable() {
    return sequelize.define('maintenance_data', {
        maintenance_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        property_id: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        cost: {
            type: Sequelize.DOUBLE,
            allowNull: true
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
    let helpdeskThresholdTable = htt.getHelpdeskThresholdsTable(sequelize, Sequelize);
    let waterThresholdTable = wtt.getWaterThresholdsTable(sequelize, Sequelize);
    let powerThresholdTable = ptt.getPowerThresholdsTable(sequelize, Sequelize);
    let maintenanceTable = getMaintenanceTable();
    let stateWeightTable = getStateWeightTable();
    let overallWeightTable = getOverallWeightTable();

    helpdeskTable.belongsTo(propertiesTable, {foreignKey: 'property_id'});
    maintenanceTable.belongsTo(propertiesTable, {foreignKey: 'property_id'});

    await propertiesTable.sync({force: false});
    await helpdeskTable.sync({force: false});
    await helpdeskWeightTable.sync({force: false});
    await helpdeskThresholdTable.sync({force: false});
    await waterThresholdTable.sync({force: false});
    await powerThresholdTable.sync({force: false});
    await stateWeightTable.sync({force: false});
    await maintenanceTable.sync({force: false});
    await overallWeightTable.sync({force: false});
};

/**
 * Function for creating a new property (ejendom).
 * @param propertyName
 * @param propertySize
 * @param propertyTypeId
 * @returns {Promise<properties.property_id|{autoIncrement, type, primaryKey}|helpdesk_data.property_id|{allowNull, type}|*|number>}
 */
exports.createProperty = async function (propertyName, propertySize = 1000, propertyTypeId = 420) {
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

exports.updatePropertyColor = async function (id, color) {
    try {
        let propertiesTable = getPropertiesTable();
        await propertiesTable.update(
            {color: color},
            {where: {property_id: id}});
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


        resultsArray.push(result.dataValues.property_type_id);


        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

// SLET VENLIGST IKKE DENNE LINJE
// exports.createHelpdeskWeightTable([420, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
// SLET VENLIGST IKKE DENNE LINJE

exports.createStateWeightTable = async function (stateWeightArray) {
    try {
        let stateWeightTable = getStateWeightTable();
        let resultsArray = [];
        console.log(stateWeightArray[0]);
        let result = await stateWeightTable.create({
            property_type_id: stateWeightArray[0],
            state_tekniske: stateWeightArray[1],
            state_udvendige: stateWeightArray[2],
            state_osv: stateWeightArray[3]
        });


        resultsArray.push(result.dataValues.property_type_id);
        console.log(resultsArray[0]);

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

exports.updateHelpdeskWeightTable = async function (helpdeskWeightArray) {
    try {
        let helpdeskWeightTable = getHelpdeskWeightTable();
        let resultsArray = [];
        let result = await helpdeskWeightTable.update({
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
        }, {returning: true, where: {property_type_id: helpdeskWeightArray[0]}});


        resultsArray.push(result.dataValues);
        console.log(resultsArray[0]);

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

exports.updateStateWeightTable = async function (stateWeightArray) {
    try {
        let stateWeightTable = getStateWeightTable();
        let resultsArray = [];
        console.log(stateWeightArray[1]);
        let result = await stateWeightTable.update({
            state_tekniske: stateWeightArray[1],
            state_udvendige: stateWeightArray[2],
            state_osv: stateWeightArray[3],
        }, {returning: true, where: {property_type_id: stateWeightArray[0]}});


        resultsArray.push(result.dataValues);
        console.log(resultsArray[0]);

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

exports.updateOverallWeightTable = async function (overallWeightArray) {
    try {
        let overallWeightTable = getOverallWeightTable();
        let resultsArray = [];
        let result = await overallWeightTable.update({
            overall_tilstand: overallWeightArray[1],
            overall_energi: overallWeightArray[2],
            overall_helpdesk: overallWeightArray[3],
        }, {returning: true, where: {property_type_id: overallWeightArray[0]}});


        resultsArray.push(result.dataValues);
        console.log(resultsArray[0]);

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

exports.readHelpdeskWeightData = async function (id) {
    try {
        let weightTable = getHelpdeskWeightTable();
        let result = await weightTable.findAll((id ? {where: {property_type_id: id}} : {})); // Add the "where" option, if the ID is not undefined
        return result.length === 0 ? await Promise.reject(new Error("No properties found")) : result; // Return an error, if 0 results are found, else return the result(s)
    } catch (e) {
        throw e;
    }
};

exports.createHelpdeskLimit = async function (helpdeskLimitArray) {
    try {
        let helpdeskLimitsTable = getHelpdeskLimitsTable();
        let resultsArray = [];

        let result = await helpdeskLimitsTable.create({
            helpdesk_indeklima: helpdeskLimitArray[0],
            helpdesk_tekniske_anlaeg: helpdeskLimitArray[1],
            helpdesk_udv_belaegning: helpdeskLimitArray[2],
            helpdesk_murwaerk_og_facade: helpdeskLimitArray[3],
            helpdesk_tag: helpdeskLimitArray[4],
            helpdesk_udhaeng_og_gavle: helpdeskLimitArray[5],
            helpdesk_tagdaekning: helpdeskLimitArray[6],
            helpdesk_tagrender_og_nedloeb: helpdeskLimitArray[7],
            helpdesk_vinduer_og_udv_doere: helpdeskLimitArray[8],
            helpdesk_fundament_og_sokkel: helpdeskLimitArray[9]
        });

        resultsArray.push(result.dataValues);

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

exports.createMaintenanceData = async function (maintenanceDataArray) {
    try {
        let maintenanceTable = getMaintenanceTable();
        let resultsArray = [];
        let propertiesTable = getPropertiesTable();

        for (let maintenanceObject of maintenanceDataArray) { // Loop through all the data
            let propertyNameTrimmed = maintenanceObject['Ejendom'].replace(/\(\d+\)/, "").trim();
            let propertyId = await propertiesTable.findAll(({where: {property_name: propertyNameTrimmed}})); // Check whether the property exists

            if (propertyId.length === 0) // If the results array have a length of 0, the property doesn't exist
                propertyId = await exports.createProperty(propertyNameTrimmed); // Create a new property
            else
                propertyId = propertyId[0].dataValues.property_id;

            let propertyExistsInMaintenanceTable = await maintenanceTable.findAll(({where: {property_id: propertyId}})); // Check whether the property exists in the maintenance table

            if (propertyExistsInMaintenanceTable.length === 0) { // Only create maintenance data if the property doesn't already exist in the maintenance table
                let result = await maintenanceTable.create({
                    property_id: propertyId,
                    cost: maintenanceObject['2019']
                });

                resultsArray.push(result.dataValues.maintenance_id)
            }
        }

        return resultsArray; // Return an array containing all inserted IDs
    } catch (e) {
        throw e;
    }
};

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
        return result.length === 0 ? await Promise.reject(new Error("No helpdesk weight data found")) : result; // Return an error, if 0 results are found, else return the result(s)
    } catch (e) {
        throw e;
    }
};

exports.readMaintenanceData = async function (id) {
    try {
        let maintenanceTable = getMaintenanceTable();
        let result = await maintenanceTable.findAll((id ? {where: {property_id: id}} : {})); // Add the "where" option, if the ID is not undefined
        return result.length === 0 ? await Promise.reject(new Error("No maintenance data found")) : result; // Return an error, if 0 results are found, else return the result(s)
    } catch (e) {
        throw e;
    }
};

//exports.readMaintenanceData().then(res => console.log(res[0].dataValues));

exports.processHelpdeskData = async function (resultPerProperty) {
    let helpdeskData = await exports.readHelpdeskData();

    for (let data of helpdeskData) { // Count helpdesk reports for each property
        let helpdeskSubject = data.dataValues.subject;
        let propertyId = data.dataValues.property_id;

        if (!resultPerProperty[propertyId])
            resultPerProperty[propertyId] = {};

        resultPerProperty[propertyId][helpdeskSubject] = (resultPerProperty[propertyId][helpdeskSubject] ? resultPerProperty[propertyId][helpdeskSubject] + 1 : 1);
    }

    let helpdeskWeights = await exports.readHelpdeskWeight();
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

    for (let propertyId in resultPerProperty) { // Loop through each property, which has helpdesk data
        if (resultPerProperty.hasOwnProperty(propertyId)) {
            let property = await exports.readProperty(propertyId);
            let propertyTypeId = property[0].dataValues.property_type_id;
            let weightsObject;

            for (let helpdeskWeight of helpdeskWeights) { // Loop through helpdesk weights to find the matching weight for the property type
                if (helpdeskWeight.dataValues.property_type_id === propertyTypeId) {
                    weightsObject = helpdeskWeight.dataValues;
                    break;
                }
            }

            let totalScore = 0;

            for (let subject in resultPerProperty[propertyId]) { // Loop through each individual helpdesk subject, which has 1 or more reports
                if (resultPerProperty[propertyId].hasOwnProperty(subject)) {
                    let numberOfReports = resultPerProperty[propertyId][subject];
                    let subjectDatabaseName = map[subject];
                    let multiplier = weightsObject[subjectDatabaseName] / 100; // Get the multiplier for the current subject
                    console.log(multiplier);
                    totalScore += numberOfReports * multiplier; // Add the score to the total score
                }
            }

            resultPerProperty[propertyId].helpdeskScore = totalScore;
        }
    }

    return resultPerProperty;
};

// exports.processHelpdeskData();

exports.processMaintenanceData = async function (resultPerProperty) {
    let maintenanceData = await exports.readMaintenanceData();
    let propertiesTable = getPropertiesTable();

    for (let data of maintenanceData) {
        let propertyId = data.dataValues.property_id;

        if (!resultPerProperty[propertyId])
            resultPerProperty[propertyId] = {};

        let property = await propertiesTable.findAll(({where: {property_id: propertyId}}));
        let propertySize = property[0].dataValues.property_size;
        resultPerProperty[propertyId].maintenanceScore = data.dataValues.cost / propertySize;
    }

    return resultPerProperty;
};

// exports.processMaintenanceData({});

exports.calculateScore = async function () {
    let resultPerProperty = {};
    resultPerProperty = await exports.processHelpdeskData(resultPerProperty);
    resultPerProperty = await exports.processMaintenanceData(resultPerProperty);

    for (let propertyId in resultPerProperty) {
        if (resultPerProperty.hasOwnProperty(propertyId)) {
            let totalScore = 0;

            if (resultPerProperty[propertyId].helpdeskScore) {
                let helpdeskScore = resultPerProperty[propertyId].helpdeskScore;
                totalScore += (helpdeskScore <= 0.3 ? 1 : (helpdeskScore <= 0.6) ? 2 : 3);
            }

            if (resultPerProperty[propertyId].maintenanceScore) {
                let maintenanceScore = resultPerProperty[propertyId].maintenanceScore;
                totalScore += (maintenanceScore <= 3 ? 1 : (maintenanceScore <= 6) ? 2 : 3);
            }

            if (totalScore < 1)
                await exports.updatePropertyColor(propertyId, "Grøn");
            else if (totalScore < 3)
                await exports.updatePropertyColor(propertyId, "Gul");
            else
                await exports.updatePropertyColor(propertyId, "Rød");
        }
    }
};

// exports.calculateScore();



// DB Tools export from ThresholdDbTools - Team Cyclone
exports.createHelpdeskThreshold = (yellowThreshold, redThreshold, propertyId) => {htt.createHelpdeskThreshold(yellowThreshold, redThreshold, propertyId, sequelize, Sequelize)};
exports.readHelpdeskThreshold = (id) => {htt.readHelpdeskThreshold(id, sequelize, Sequelize)}; 
exports.updateHelpdeskThreshold = (id, propertyId, yellowThreshold, redThreshold) => htt.updateHelpdeskThreshold(id, propertyId, yellowThreshold, redThreshold, sequelize, Sequelize);
exports.deleteHelpdeskThreshold = (id) => htt.deleteHelpdeskThreshold(id, sequelize, Sequelize);


// DB Tools export from WaterThresholdDbTools - Team Cyclone
exports.createWaterThreshold = (yellowThreshold, redThreshold, propertyId) => {wtt.createWaterThreshold(yellowThreshold, redThreshold, propertyId, sequelize, Sequelize)};
exports.readWaterThreshold = (id) => {wtt.createWaterThreshold(id, sequelize, Sequelize)};

// DB Tools export from PowerThresholdDbTools - Team Cyclone
exports.createPowerThreshold = (yellowThreshold, redThreshold, propertyId) => {ptt.createPowerThreshold(yellowThreshold, redThreshold, propertyId, sequelize, Sequelize)};
exports.readPowerThreshold = (id) => {ptt.createPowerThreshold(id, sequelize, Sequelize)};




