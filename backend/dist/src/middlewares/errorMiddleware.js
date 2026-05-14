import { ZodError } from 'zod';
export default function errorMiddleware(error, req, res, next) {
    // Se for erro do Zod, retornamos 400
    if (error instanceof ZodError) {
        return res.status(400).json({
            message: 'Validation error',
            issues: error.issues
        });
    }
    // Se for um erro lançado manualmente, retornamos a mensagem e status 400
    if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
    }
    // Erro genérico (500)
    return res.status(500).json({ message: 'Internal Server Error' });
}
//# sourceMappingURL=errorMiddleware.js.map