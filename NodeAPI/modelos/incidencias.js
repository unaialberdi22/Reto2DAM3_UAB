module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Incidencias', {
        incidenceId: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        incidenceType: {
            type: DataTypes.STRING
        },
        cause: {
            type: DataTypes.STRING
        },
        startDate: {
            type: DataTypes.STRING
        },
        endDate: {
            type: DataTypes.STRING
        },
        latitude: {
            type: DataTypes.STRING
        },
        longitude: {
            type: DataTypes.STRING
        }
    });
};