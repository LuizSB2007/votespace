import prisma from "../utils/prisma.js";
class OptionServices {
    // Pega todas as opções de uma sala
    async findAllOptions(roomId) {
        const options = await prisma.option.findMany({ where: { roomId } });
        return options;
    }
    // Pega uma opção específica de uma sala
    async findOptionById(id) {
        const option = await prisma.option.findUnique({ where: { id } });
        return option;
    }
    // Cria uma nova opção para uma sala
    async createOption(data) {
        const option = await prisma.option.create({ data: { ...data } });
        return option;
    }
    // Atualiza o texto de uma opção
    async updateOption(id, text) {
        const option = await prisma.option.update({ where: { id }, data: { text } });
        return option;
    }
    // Deleta uma opção de uma sala
    async deleteOption(id) {
        await prisma.option.delete({ where: { id } });
        return "Opção excluída com sucesso";
    }
}
export default new OptionServices();
//# sourceMappingURL=optionServices.js.map