import { CreateRoomSchemaType, UpdateRoomSchemaType } from "../schema/romm.schema.js";
declare class RoomServices {
    findAllRooms(): Promise<{
        id: string;
        name: string;
        description: string | null;
        isPublic: boolean;
        ownerId: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }[]>;
    findRoomById(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        isPublic: boolean;
        ownerId: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    } | null>;
    findRoomByslug(slug: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        isPublic: boolean;
        ownerId: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }[]>;
    createRoom(ownerId: string, data: CreateRoomSchemaType): Promise<string>;
    updateRoom(roomId: string, data: Partial<UpdateRoomSchemaType>): Promise<string>;
    deleteRoom(roomId: string): Promise<string>;
}
declare const _default: RoomServices;
export default _default;
//# sourceMappingURL=roomServices.d.ts.map