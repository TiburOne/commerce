export default (sequelize, DataTypes) => {
   const Cheque = sequelize.define('Cheque', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     pagoId: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
         model: 'Pagos',
         key: 'id'
       }
     },
     numeroCheque: {
       type: DataTypes.STRING,
       allowNull: false
     },
     banco: {
       type: DataTypes.STRING,
       allowNull: false
     },
     fechaEmision: {
       type: DataTypes.DATE,
       allowNull: false
     },
     fechaCobro: {
       type: DataTypes.DATE,
       allowNull: false
     },
     estado: {
       type: DataTypes.STRING,
       allowNull: false
     }
   }, {
     tableName: 'Cheques'
   });
 
   Cheque.associate = function(models) {
     Cheque.belongsTo(models.Pago, {
       foreignKey: 'pagoId',
       as: 'pago'
     });
   };
 
   return Cheque;
 };
 