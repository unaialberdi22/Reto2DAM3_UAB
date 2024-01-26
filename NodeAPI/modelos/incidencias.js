module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Incidencias', {
        incidenceId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        incidenceType: {
            type: DataTypes.STRING
        },
        cause: {
            type: DataTypes.STRING
        },
        startDate: {
            type: DataTypes.DATEONLY, // Usa DATEONLY para almacenar solo la fecha sin la hora
            get() {
              const rawValue = this.getDataValue('startDate');
              return rawValue ? new Date(rawValue).toISOString().split('T')[0] : null;
            },
            set(value) {
              // Puedes ajustar el formato según tus necesidades
              const formattedDate = value ? new Date(value) : null;
              this.setDataValue('startDate', formattedDate);
            }
          },
          endDate: {
            type: DataTypes.DATEONLY,
            get() {
              const rawValue = this.getDataValue('endDate');
              return rawValue ? new Date(rawValue).toISOString().split('T')[0] : null;
            },
            set(value) {
              const formattedDate = value ? new Date(value) : null;
              this.setDataValue('endDate', formattedDate);
            }
          },
        latitude: {
            type: DataTypes.STRING
        },
        longitude: {
            type: DataTypes.STRING
        },
        urlImage: {
          type: DataTypes.BLOB('long'), // Tipo de datos BLOB para imágenes grandes
        },
      });
    };