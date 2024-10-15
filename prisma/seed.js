/**
 * @file Seeds the DB with relevant information required for testing and running the Unity game.
 * @author GTS
 */
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @description Seeds all of the required users with predetermined info.
 */
const seedUsers = async () => {
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

  for (const user of users) {
    // Hashes the user's password to ensure personal data security.
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(user.password, salt);
    user.password = hashedPassword;

    // Where a user exists, update it with the provided information, otherwise create one.
    // Safer than create, since if the user already exists it will replace the current info with the more relevant info.
    await prisma.user.upsert({
        where: {
          name: user.name,
        },
        update: user,
        create: user,
    });
  }
};

/**
 * @description Runs all seeding processes when the script is called.
 */
const main = async () => {
  try {
    await seedUsers();
    await seedItems();
  } catch (err) {
    console.error(err);
  } finally {
    // Closes all open connections and stops script safely.
    await prisma.$disconnect();
    process.exit(0);
  }
};

// Runs immediately upon being called, e.g., as a script
main();
