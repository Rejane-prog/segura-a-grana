const app = require('./app');

const PORTA = Number(process.env.PORT) || 3000;

app.listen(PORTA, () => {
  console.log(`Segura a Grana rodando em http://localhost:${PORTA}`);
});
