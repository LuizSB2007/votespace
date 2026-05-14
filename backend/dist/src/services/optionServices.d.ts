import { CreateOptionSchemaType } from "../schema/option.schema.js";
declare class OptionServices {
    findAllOptions(roomId: string): Promise<{
        id: string;
        roomId: string;
        text: string;
    }[]>;
    findOptionById(id: string): Promise<{
        id: string;
        roomId: string;
        text: string;
    } | null>;
    createOption(data: CreateOptionSchemaType): Promise<string>;
    updateOption(id: string, text: string): Promise<string>;
    deleteOption(id: string): Promise<string>;
}
declare const _default: OptionServices;
export default _default;
//# sourceMappingURL=optionServices.d.ts.map