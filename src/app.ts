import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import optionRoutes from './routes/optionRoutes.js'
import voteRoutes from './routes/voteRoutes.js'
import errorsMiddleware from './middlewares/errorMiddleware.js';
import { authMiddleware } from './middlewares/authMiddlewares.js';

const app = express();

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/room', authMiddleware, roomRoutes);
app.use('/option', authMiddleware, optionRoutes);
app.use('/vote', authMiddleware, voteRoutes);
app.use(errorsMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});