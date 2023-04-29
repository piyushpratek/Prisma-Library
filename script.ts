import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  //...we will write our prisma client queries here
  const user = await prisma.user.create({ data: { name: 'Saurav' } });
  console.log(user);
}

main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
