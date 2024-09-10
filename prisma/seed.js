import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
    {
        name: 'dave',
        password: 'DavePassword!',
        money: 20
    },
    {
        name: 'jeffrey',
        password: 'BetterPassword24!',
        money: 15
    },
    {
        name: 'amanda',
        password: 'SuperDuperPassword98_',
        money: 300
    },
];

const main = async () => {
  try {
    for (let user in users) {
        await prisma.user.upsert({
            where: {
                name: user.name,
            },
            update: {
                ...user
            },
            create: {
                ...user
            },
        });
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();