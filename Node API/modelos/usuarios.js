module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Usuarios', {
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "-> Falta username"
                }
            },
            unique: {
                args: true,
                msg: '-> ya existe un usuario con ese nombre'
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "-> Falta password"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "-> Falta email"
                },
                isEmail: {
                    msg: "-> Email no válido"
                }
            },
            unique: {
                args: true,
                msg: '-> ya existe un usuario con ese email'
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
};