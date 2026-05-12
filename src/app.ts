import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import errorsMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use('/users', usersRoutes);
app.use('/room', roomRoutes);
app.use(errorsMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});