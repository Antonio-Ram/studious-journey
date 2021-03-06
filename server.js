const express = require('express');
const apiRoutes = require('./routes');
const sequelize = require('./config/connection');
const  htmlRoutes = require('./routes/htmlRoutes');

const app = express();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(apiRoutes);
app.use(htmlRoutes);


sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening`));
});