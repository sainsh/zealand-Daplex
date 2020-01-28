/** 
 * Method returning the power table (layout).
 * @param sequelize: from DB tools 
 * @param Sequelize: from DB tools
 * @returns table setup for power in daplex db
 */

getPowerTable = (sequilize, Sequilize) => {
    return sequilize.define("power", {
        id: {
            type: Sequilize.INTEGER,
            allowNULL: false,
            autoIncrement: true,
            primaryKey: true,
        },
        installationNumber: {
            type: Sequilize.STRING,
            allowNULL: false,
        },
        meterNumber: {
            type: Sequilize.STRING,
            allowNULL: false,
        },
        timeEnd: {
            type: Sequilize.DATE,
            allowNULL: false,
        },
        timeStart: {
            type: Sequilize.DATE,
            allowNULL: false,
        },
        value: {
            type: Sequilize.DOUBLE,
            allowNULL: false,
        },
    });
};

exports.createPower = async (power, sequilize, Sequilize) => {
    let powerTable = getPowerTable(sequilize, Sequilize);
    try {
        for (let i = 0; i<power.length; i++) {
            let array = power[i]
            
            if(array[0] == '#E17 (forbrugt fra net)') continue;
            let result = await powerTable.create({
                installationNumber: array[0],
                meterNumber: array[1],
                timeEnd: array[3],
                timeStart: array[4],
                value: array[5],
            });
            console.log("Inserted this " + result.dataValues.id)
        }

        await exports.readPower("571313185430049334",sequilize,Sequilize);
    } catch (error) {
        console.error(error);
    };
    
};

exports.readPower = async (installationNumber, sequilize, Sequilize) => {
    let powerTable = getPowerTable(sequilize, Sequilize);
    let result = await powerTable.findAll({ where: { installationNumber: installationNumber } });
    console.log(result[0].installationNumber);
    return result.length === 0 ? await Promise.reject(new Error("no elements with that number")) : result;
};

exports.deletePower = async (id, sequilize, Sequilize) => {
    let powerTable = getPowerTable(sequilize, Sequilize);

    try {
        let result = await powerTable.destroy(
            { where: { id: id } }, { returning: true, where: { id: id } });
        console.log("deleted this" + id);
        return result;
    } catch (error) {
        console.error(error);
    };
}

exports.getPowerTable = getPowerTable;