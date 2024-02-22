const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const companyRoutes = require('./routes/company');
const clientRoutes = require('./routes/client');

const app = express();
const port = 4000;

app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/companies', companyRoutes);
app.use('/clients', clientRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
