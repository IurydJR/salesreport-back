const Sale = require('../models/Sale');

module.exports = {

  async delete(request, response){
      const {id} = request.params;
  
      try{
          const sale = await sale.findOneAndDelete({ _id: id });
          if (!sale) {
              return response.status(404).json({ error: "Register not found" });
          }
          return response.json(sale);
  
      } catch (error) {
      return response.status(500).json({ error: "Error to delete Sale" });
      }
  },

  async read(request, response) {
      try {
          const saleList = await sale.find();
          return response.json(saleList);
      } catch (error) {
          return response.status(500).json({ error: 'Error on Server' });
      }
  },

  async update(request, response){
      try{
          const {id} = request.params;
          const {brand, product, category, SalesDate, Quantity} = request.body;
          const sale = await sale.findByIdAndUpdate(id, {
            brand, product, category, SalesDate, Quantity
          },{new: true})
          
          if (!sale) {
              return response.status(404).json({ error: "Not found Register" });
          }
          return response.json(sale);
      } catch (error) {
      return response.status(500).json({ error: "Error to update" });
      }
  },

  async create(request, response){
      const {brand, product, category, SalesDate, Quantity} = request.body;

      try{
        const sale = sale.create(request.body);

      } catch (error) {
      return response.status(500).json({ error: "Error to create sale" });
  }
  }
}