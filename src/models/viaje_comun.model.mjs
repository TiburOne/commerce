export default (sequelize, DataTypes) => {
  const ViajeComun = sequelize.define(
    "ViajeComun",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_creador: {
        type: DataTypes.INTEGER,
        allowNull: true,  // Asumiendo que puede ser nulo si es el primer viaje del lote
        references: {
          model: "Viajes_Comunes", // Asegúrate de que el nombre del modelo es correcto
          key: "id",
        }
      },
      id_ubicacion_origen: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Ubicaciones",
          key: "id",
        },
      },
      id_ubicacion_destino: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Ubicaciones",
          key: "id",
        },
      },
      id_especie: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipo_tarifa: {
        type: DataTypes.ENUM("Por Tonelada", "Por Kilometro", "Fija"),
        allowNull: false,
      },
      id_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_camion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_acoplado: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_carta_porte: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_chofer: {
        type: DataTypes.INTEGER,
        allowNull: true, // Chofer puede ser nulo
      },
      valor_tarifa:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      }
    },
    {
      tableName: "Viajes_Comunes",
    }
  );

  ViajeComun.associate = function (models) {
    ViajeComun.belongsTo(models.Camion, { foreignKey: "id_camion" });
    // Asociación con TipoAcoplado
    ViajeComun.belongsToMany(models.TipoAcoplado, {
      through: "Viajes_TipoAcoplados",
      foreignKey: "idViaje",
      otherKey: "idTipoAcoplado",
      as: "TiposAcoplados"
    });
    ViajeComun.belongsTo(models.Especie, { foreignKey: "id_especie" });
    ViajeComun.belongsTo(models.EstadoViaje, { foreignKey: "id_estado" });
    ViajeComun.belongsTo(models.CartaDePorte, { foreignKey: "id_carta_porte" });
    ViajeComun.belongsTo(models.Ubicacion, {
      foreignKey: "id_ubicacion_origen",
      as: "Origen",
    });
    ViajeComun.belongsTo(models.Ubicacion, {
      foreignKey: "id_ubicacion_destino",
      as: "Destino",
    });
    ViajeComun.belongsTo(models.Chofer, {
      foreignKey: "id_chofer",
      as: "Chofer",
    }); // Asociación con Choferes
  };

  return ViajeComun;
};
