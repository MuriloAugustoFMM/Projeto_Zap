const express = require('express')
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
app.use(express.static('public'))
app.use(express.json())

app.use('/api/tasks', taskRoutes);

app.listen(3000, () => console.log('API rodando na porta 3000'));

