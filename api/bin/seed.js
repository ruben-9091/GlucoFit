const config = require('../src/lib/config'); 
const mongoose = require('mongoose');
const Recipe = require('../src/lib/models/recipes.model'); 

const dessertData = require("../src/data/dessert-recipes");
const meatData = require("../src/data/meat-recipes");
const saladData = require("../src/data/salad-recipes");
const veganData = require("../src/data/vegan-recipes");

// Extraemos el array y le inyectamos únicamente la propiedad 'categoria'
const dessert = dessertData.desserts.map(r => ({ ...r, categoria: 'dessert' }));
const meat = meatData.meats.map(r => ({ ...r, categoria: 'meat' }));
const salad = saladData.salads.map(r => ({ ...r, categoria: 'salad' }));
const vegan = veganData.vegans.map(r => ({ ...r, categoria: 'vegan' }));

// Unimos todas las recetas en un solo array
const allRecipes = [...dessert, ...meat, ...salad, ...vegan];

// Obtener la URI desde convict
const mongoUri = config.get('db');

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('Conectado a MongoDB...');
    await Recipe.deleteMany({}); // Limpia la colección para evitar duplicados
    const created = await Recipe.insertMany(allRecipes);
    console.log(`¡Éxito! Se han subido ${created.length} recetas a la base de datos.`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error al poblar la base de datos:', err);
    process.exit(1);
  });