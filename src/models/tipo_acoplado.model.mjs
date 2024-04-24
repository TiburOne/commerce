export default (sequelize, DataTypes) => {
  const TipoAcoplado = sequelize.define(
    "TipoAcoplado",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Tipos_Aclopados",
    }
  );

  TipoAcoplado.associate = function (models) {
    TipoAcoplado.hasMany(models.Acoplado, { foreignKey: "id_tipo_acoplado" });
    TipoAcoplado.hasMany(models.ViajeComun, { foreignKey: "id_tipo_acoplado" });
  };

  return TipoAcoplado;
};
