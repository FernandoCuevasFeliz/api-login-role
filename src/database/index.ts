import mongoose from 'mongoose';

const URI = process.env.MONGO_URI || 'mongodb://localhost/db_test';

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB is connected'))
  .catch(err => console.error(err));
