import { z } from "zod";
export const CreateRoomSchema = z.object({
    name: z.string().min(3, "O nome da sala deve conter pelo menos 3 caracteres"),
    description: z.string().min(10, "A descrição da sala deve conter pelo menos 10 caracteres"),
}).strict();
//# sourceMappingURL=romm.schema.js.map