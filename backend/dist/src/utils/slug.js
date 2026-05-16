import slugify from 'slugify';
import prisma from './prisma.js';
// Função responsável por transformar um nome em slug e garantir que seja unico
export async function generateUniqueSlug(name) {
    const slug = slugify(name, { lower: true, strict: true });
    const existSlug = await prisma.rooms.findMany({
        where: { slug: slug },
    });
    if (existSlug.length > 0)
        return slug + '-' + Math.random().toString(36).substring(2, 8);
    return slug;
}
//# sourceMappingURL=slug.js.map