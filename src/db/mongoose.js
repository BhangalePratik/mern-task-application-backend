const mongoose = require('mongoose');

console.log(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
mongoose.connect(
  `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,

  },
).then(() => console.log('connected successfully'))
  .catch((error) => console.log('Error Occurred', error));
