export default (sequelize, DataTypes) => {
  const Cliente = sequelize.define(
    "Cliente",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
      },
      telefono: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      documentoIdentidad: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cuit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "Clientes",
    }
  );

  Cliente.associate = function (models) {
    // Asociacion Factura
    Cliente.hasMany(models.Factura, {
      foreignKey: "clienteId",
      as: "facturas",
    });

    // Asociacion Ordenes
    Cliente.hasMany(models.Orden, {
      foreignKey: "clienteId",
      as: "ordenes",
    });
  };

  return Cliente;
};
