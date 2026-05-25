import express from 'express';
import { create, destroy, index, show, update } from '../controllers/functionPosts.js';

//creo il mio router e lo esporto 
const postsRouter = express.Router();

//route index
postsRouter.get('/', index);
//route show che mi restituisce il singolo elemento del mio json tramite id parametro che gli passo io 
postsRouter.get('/:id', show)
//route store che crea un nuovo elemento
postsRouter.post('/', create)
//route che modifica interamente un elemento
postsRouter.put('/:id', update)
//route che elimina un elemento
postsRouter.delete('/:id', destroy)
export default postsRouter;