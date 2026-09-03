const config = require('../src/lib/config'); 
const mongoose = require('mongoose');
const Recipe = require('../src/lib/models/recipes.model'); 
const Exercise = require('../src/lib/models/exercise.model')

const dessertData = require("../src/data/dessert-recipes");
const meatData = require("../src/data/meat-recipes");
const saladData = require("../src/data/salad-recipes");
const veganData = require("../src/data/vegan-recipes");

const runningData = require("../src/data-exercises/running-exercises"); 
const gymData = require("../src/data-exercises/gym-exercises"); 
const flexData = require("../src/data-exercises/flex-exercises"); 

// Extraemos el array y le inyectamos únicamente la propiedad 'categoria'
const dessert = dessertData.desserts.map(r => ({ ...r, categoria: 'dessert' }));
const meat = meatData.meats.map(r => ({ ...r, categoria: 'meat' }));
const salad = saladData.salads.map(r => ({ ...r, categoria: 'salad' }));
const vegan = veganData.vegans.map(r => ({ ...r, categoria: 'vegan' }));

const running = runningData.running.map(r => ({ ...r, categoria: "running" }));
const gym = gymData.gym.map(r => ({ ...r, categoria: "gym" })); 
const flex = flexData.flex.map(r =>({ ...r, categoria: "flex" })); 

// Unimos todas las recetas en un solo array
const allRecipes = [...dessert, ...meat, ...salad, ...vegan];

const allExercises = [...running, ...gym, ...flex]; 

// Obtener la URI desde convict
const mongoUri = config.get('db');

mongoose.connect(mongoUri)
  .then(async () => {
    console.log('Conectado a MongoDB...');
    // Limpia la colección para evitar duplicados
    await Recipe.deleteMany({}); 
    await Exercise.deleteMany({});

    const createdRecipes = await Recipe.insertMany(allRecipes);
    console.log(`¡Éxito! Se han subido ${createdRecipes.length} recetas a la base de datos.`);

    const createdExercises = await Exercise.insertMany(allExercises);
    console.log(`¡Éxito! Se han subido ${createdExercises.length} ejercicios a la base de datos.`);

    await mongoose.connection.close(); 
    console.log("Conexion a la base de datos cerrada")
    process.exit(0);
  })
  .catch(err => {
    console.error('Error al poblar la base de datos:', err);
    process.exit(1);
  });