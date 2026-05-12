import roomServices from '../services/roomServices.js';
import { CreateRoomSchema } from '../schema/romm.schema.js';
import { ZodError } from 'zod';
class roomController {
    async createRoom(req, res) {
        try {
            const data = CreateRoomSchema.parse(req.body);
            const newRoom = await roomServices.createRoom(data);
            res.status(200).json(newRoom);
        }
        catch (error) {
            if (error instanceof ZodError)
                return res.status(400).json({ error: error.issues });
        }
    }
}
export default new roomController();
//# sourceMappingURL=roomController.js.map