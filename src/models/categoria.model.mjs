export default (sequelize, DataTypes) => {
   const Categoria = sequelize.define('Categoria', {
     id: {
       type: DataTypes.INTEGER,
       primaryKey: true,
       autoIncrement: true
     },
     nombre: {
       type: DataTypes.STRING,
       allowNull: false // No permite valores nulos
     },
     descripcion: {
       type: DataTypes.TEXT,
       allowNull: true // Permite valores nulos, ajusta según tus necesidades
     }
   }, {
     tableName: 'Categorias'
   });
 
   // Relaciones
   // Aquí puedes definir las relaciones con otros modelos si es necesario.
   // Por ejemplo, si cada categoría puede tener múltiples productos, puedes añadir algo como esto:
   Categoria.associate = function(models) {
     Categoria.hasMany(models.Producto, {
       foreignKey: 'categoriaId',
       as: 'productos'
     });
   };
 
   return Categoria;
 };
 