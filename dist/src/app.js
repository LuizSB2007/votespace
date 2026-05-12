import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
const app = express();
app.use(express.json());
app.use('/users', usersRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=app.js.map