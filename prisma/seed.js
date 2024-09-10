import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  try {
    await prisma.user.create({
      data: {
        name: 'dave',
        password: 'DavePassword!',
        money: 20
      },
    });
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();