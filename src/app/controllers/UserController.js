const express = require('express')
const User = require('../models/User');
const jwt = require('jsonwebtoken');

function generateToken(params = {}){
    
  const token = jwt.sign(params, authConfig.secret, {
      expiresIn:10086400,
  });

  return token;
}

module.exports = {

  async delete(request, response){
      const {id} = request.params;
  
      try{
          const user = await User.findOneAndDelete({ _id: id });
          if (!user) {
              return response.status(404).json({ error: "Registro não encontrado para deletar" });
          }
          user.password = undefined;
          return response.json(user);
  
      } catch (error) {
      console.error('Erro ao excluir:', error);
      return response.status(500).json({ error: "Erro ao excluir usuário" });
      }
  },

  async read(request, response) {
      try {
          const userList = await User.find();
          return response.json(userList);
      } catch (error) {
          console.error('Erro ao buscar dados do banco de dados:', error);
          return response.status(500).json({ error: 'Erro interno do servidor' });
      }
  },

  async update(request, response){
      try{
          const {id} = request.params;
          const {password, name} = request.body;
          const user = await User.findByIdAndUpdate(id, {
              name,
              password
          },{new: true}).select('+password');
          
          if (!user) {
              return response.status(404).json({ error: "Registro não encontrado para atualizar" });
          }
          user.password = undefined;

          return response.json(user);
      } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar usuário" });
      }
  },

  async create(request, response){
      const {email, name} = request.body;

      try{
          if (await User.findOne({email})){
              return response.status(400).json({error: "E-mail já cadastrado"});
          }
          const user = User.create(request.body);

          user.password = undefined;


          return response.send({
              user: name,
              token: generateToken({ id: user.id}),
          });

      } catch (error) {
      console.error('Erro ao criar user:', error);
      return response.status(500).json({ error: "Erro ao criar usuário" });
  }
  }
}