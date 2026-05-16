import express from 'express';
import cors from 'cors'
import usersRoutes from './routes/usersRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import authRoutes from './routes/authRoutes.js'
import errorsMiddleware from './middlewares/errorMiddleware.js';
import { authMiddleware } from './middlewares/authMiddlewares.js';

const app = express();

app.use(express.json());

// CORS
app.use(cors({
  origin: process.env.URL_CORS,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use('/auth', authRoutes); //Rota para autenticar usuários
app.use('/users', authMiddleware, usersRoutes); //Rota de usuários
app.use('/room', authMiddleware, roomRoutes); //Rota das salas, opçoes e votos

app.use(errorsMiddleware); //Coleta erros lançados por toda API

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});