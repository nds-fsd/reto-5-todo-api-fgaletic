const express = require('express');
const app = express();
const router = require('./routers/index');
// const todoRouter = require('./routers/todo');
// const userRouter = require('./routers/users'); this is redundant


//Le decimos a nuestra app, que vamos recibir peticiones donde el Body contiene texto en formato JSON.
app.use(express.json());

//Le decimos a nuestra app, que "utilize" el router de to-dos. Esto es equivalente a haber definido todos nuestros endpoints directamente sobre el objeto app como vimos en clase.
app.use('/index', router);


//a partir de este punto y gracias a la linea escrita mas arriba, si llega alguna peticion que empieze por /todo, está se redirige hacia todoRouter.




app.listen(3001, () => {
    console.log("Server is up and running in port 3001");
});




