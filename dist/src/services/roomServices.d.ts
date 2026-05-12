import { CreateRoomSchemaType } from "../schema/romm.schema.js";
declare class RoomServices {
    createRoom(data: CreateRoomSchemaType): Promise<{
        "Sala criada": {
            name: string;
            description: string;
        };
    }>;
}
declare const _default: RoomServices;
export default _default;
//# sourceMappingURL=roomServices.d.ts.map