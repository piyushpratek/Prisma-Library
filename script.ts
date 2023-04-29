import { PrismaClient } from '@prisma/client';
import { error, log } from 'console';
const prisma = new PrismaClient();

async function main() {
  //...we will write our prisma client queries here
  prisma.user.create({ data: { name: 'Piyush' } });
  console.log(error);
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
