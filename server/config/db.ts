import mongoose from 'mongoose';
// import beautifyUnique from 'mongoose-beautiful-unique-validation';
const URI = process.env.MONGODB_URI || 'mongodb://localhost/test';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// mongoose.plugin(beautifyUnique);

const connection = mongoose.createConnection(`${URI}`);

connection.on('error', (err) => {
  if (err) throw err;
  console.error.bind(console, 'connection error:');
});

export default connection;
