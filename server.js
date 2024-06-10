/**
 * IMPORTS PARA USO
 */
const app = require('./app');
const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.DATABASE_HOST;
  const password = process.env.DATABASE_PASSWORD;
  const connectURI = uri.replace('<password>', password);
  console.log(connectURI);

  try {
    const connect = await mongoose.connect(connectURI);
    if (connect) {
      console.log('Conectado com sucesso!');
    }
  } catch (err) {
    console.error(err);
  }
};

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listen to the port: ${PORT}`);
});
