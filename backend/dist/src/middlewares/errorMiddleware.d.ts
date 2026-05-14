import { Request, Response, NextFunction } from 'express';
export default function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>>;
//# sourceMappingURL=errorMiddleware.d.ts.map