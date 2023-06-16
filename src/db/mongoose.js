const mongoose = require('mongoose');

mongoose.connect(
  'mongodb://127.0.0.1:27017/task-manager-react-api',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,

  },
).then(() => console.log('connected successfully'))
  .catch((error) => console.log('Error Occurred', error));
