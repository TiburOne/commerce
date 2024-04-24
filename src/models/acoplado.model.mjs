export default (sequelize, DataTypes) => {
  const Acoplado = sequelize.define(
    "Acoplado",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_transportista: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dominio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_tipo_acoplado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Acoplados",
    }
  );

  Acoplado.associate = function (models) {
    Acoplado.belongsTo(models.Transportista, {
      foreignKey: "id_transportista",
      as: "transportista",
    });
    Acoplado.belongsTo(models.TipoAcoplado, {
      foreignKey: "id_tipo_acoplado",
      as: "tipo_acoplado",
    });
    Acoplado.hasMany(models.ViajeComun, {
      foreignKey: "id_acoplado",
      as: "acoplado",
    });
  };

  return Acoplado;
};
