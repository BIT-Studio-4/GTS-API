import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = [
  {
    name: "dave",
    password: "DavePassword!",
    money: 20,
  },
  {
    name: "jeffrey",
    password: "BetterPassword24!",
    money: 15,
  },
  {
    name: "amanda",
    password: "SuperDuperPassword98_",
    money: 300,
  },
];

const seedUsers = async () => {
  for (const user of users) {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(user.password, salt);
    user.password = hashedPassword;

    await prisma.user.upsert({
        where: {
          name: user.name,
        },
        update: user,
        create: user,
    });
  }
};

const main = async () => {
  try {
    await seedUsers();
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
};

main();
