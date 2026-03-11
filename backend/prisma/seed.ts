
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = [
        { name: 'Technology' },
        { name: 'Design' },
        { name: 'Coding' },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { name: cat.name },
            update: {},
            create: cat,
        });
    }

    const allCats = await prisma.category.findMany();
    console.log('Categories seeded:', JSON.stringify(allCats, null, 2));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
