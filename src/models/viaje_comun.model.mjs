export default (sequelize, DataTypes) => {
  const ViajeComun = sequelize.define(
    "ViajeComun",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      origen: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitud_origen: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      longitud_origen: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      destino: {
        type: DataTypes.STRING,
        allowNull: false
      },
      latitud_destino: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      longitud_destino: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      id_especie: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tipo_tarifa: {
       type: DataTypes.ENUM('Por Tonelada', 'Por Kilometro', 'Fija'),
       allowNull: false
     },
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_tipo_acoplado: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_camion: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_acoplado:{
       type: DataTypes.INTEGER,
       allowNull: false
      },
      id_carta_porte: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      id_ubicacion_origen: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Ubicaciones',
          key: 'id'
        }
      },
      id_ubicacion_destino: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Ubicaciones',
          key: 'id'
        }
      }
    },
    {
      tableName: "Viajes_Comunes"
    }
  );

  ViajeComun.associate = function(models) {
    ViajeComun.belongsTo(models.Camion, { foreignKey: "id_camion" });
    ViajeComun.belongsTo(models.TipoAcoplado, { foreignKey: "id_tipo_acoplado" });
    ViajeComun.belongsTo(models.Especie, { foreignKey: "id_especie" });
    ViajeComun.belongsTo(models.EstadoViaje, { foreignKey: "id_estado" });
    ViajeComun.belongsTo(models.CartaDePorte, { foreignKey: "id_carta_porte" });
    ViajeComun.belongsTo(models.Ubicacion, { foreignKey: 'id_ubicacion_origen', as: 'UbicacionOrigen' });
    ViajeComun.belongsTo(models.Ubicacion, { foreignKey: 'id_ubicacion_destino', as: 'UbicacionDestino' });
  };

  return ViajeComun;
};
