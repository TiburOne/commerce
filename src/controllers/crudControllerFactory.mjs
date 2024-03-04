// crudControllerFactory.mjs

export const crudControllerFactory = (Model) => ({
   crear: async (req, res) => {
       try {
           const item = await Model.create(req.body);
           res.status(201).send(item);
       } catch (error) {
           res.status(400).send(error);
       }
   },
   listarTodos: async (req, res) => {
       try {
           const items = await Model.findAll();
           res.status(200).send(items);
       } catch (error) {
           res.status(400).send(error);
       }
   },
   obtenerPorId: async (req, res) => {
       try {
           const item = await Model.findByPk(req.params.id);
           if (!item) {
               return res.status(404).send({ message: 'Item no encontrado.' });
           }
           res.status(200).send(item);
       } catch (error) {
           res.status(400).send(error);
       }
   },
   actualizar: async (req, res) => {
       try {
           const [updated] = await Model.update(req.body, { where: { id: req.params.id } });
           if (updated) {
               const updatedItem = await Model.findByPk(req.params.id);
               res.status(200).send(updatedItem);
           } else {
               throw new Error('Item no encontrado');
           }
       } catch (error) {
           res.status(400).send(error);
       }
   },
   eliminar: async (req, res) => {
       try {
           const deleted = await Model.destroy({ where: { id: req.params.id } });
           if (deleted) {
               res.status(204).send("Item eliminado");
           } else {
               throw new Error('Item no encontrado');
           }
       } catch (error) {
           res.status(400).send(error);
       }
   }
});
