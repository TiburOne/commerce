export default (sequelize, DataTypes) => {
  const ViajeComun = sequelize.define(
    "ViajeComun",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_ubicacion_origen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Ubicaciones',
          key: 'id'
        }
      },
      id_ubicacion_destino: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Ubicaciones',
          key: 'id'
        }
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
        allowNull: true
      },
      id_acoplado: {
       type: DataTypes.INTEGER,
       allowNull: true
      },
      id_carta_porte: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      id_chofer: {
        type: DataTypes.INTEGER,
        allowNull: true, // Chofer puede ser nulo
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
    ViajeComun.belongsTo(models.Ubicacion, { foreignKey: 'id_ubicacion_origen', as: 'Origen' });
    ViajeComun.belongsTo(models.Ubicacion, { foreignKey: 'id_ubicacion_destino', as: 'Destino' });
    ViajeComun.belongsTo(models.Chofer, { foreignKey: 'id_chofer', as: 'Chofer' });  // Asociación con Choferes
  };

  return ViajeComun;
};
