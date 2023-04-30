import { PrismaClient } from '@prisma/client';
import { log } from 'console';
//normal syntax
const prisma = new PrismaClient();

//to log all of our query --- for debugging or seeing the log in terminal
// const prisma = new PrismaClient({ log: ['query'] });

//-------creating a db
// async function main() {
//   //...we will write our prisma client queries here
//   const user = await prisma.user.create({ data: { name: 'Saurav' } });
//   console.log(user);
// }

//------- getting the whole saved db
// async function main() {
//   const users = await prisma.user.findMany();
//   console.log(users);
// }

//------- deleting everything to run the script
// async function main() {
//   await prisma.user.deleteMany();
// }

async function main() {
  //everytime it emptys the database before going to next line
  await prisma.user.deleteMany();
  //if we save again then it will give the error Unique constraint failed on the constraint: `User_email_key` so we are using above line for this error to clear everytime it runs
  const user = await prisma.user.create({
    data: {
      name: 'Piyush',
      email: 'piyush@test.com',
      age: 25,
      // nested Creations --- with userPreferences -- hwich we sahy is equal to objecgt
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    //use either include or select not both
    //to run userPreferences
    // include: {
    //   userPreference: true,
    // },

    //can replace include with select
    select: {
      name: true,
      // userPreference: true,
      userPreference: { select: { id: true } },
    },
  });
  console.log(user);
}

//createMany = just like create but passing an array of data ,,,,you cannot use selecty class in createMany
// async function mains() {
//   const users = await prisma.user.createMany({
//     data: [
//       {
//         name: 'Demon',
//         email: 'Demon@test.com',
//         age: 14,
//       },
//       {
//         name: 'BlackDevil',
//         email: 'BlackDevil@test.com',
//         age: 18,
//       },
//     ],
//   });
//   console.log(users);
// }

//findUnique -----reading of data  --- unique always returns one single user
async function changetomains() {
  const user = await prisma.user.findUnique({
    where: {
      // email: 'BlackDevil@test.com',
      //we define @@unique age and name in schema.prisma with so here we need to define it with _
      age_name: {
        age: 14,
        name: 'Demon',
      },
    },
    //we can use include or select in this
  });

  console.log(user);
}

//findFirst ----- to search user based on name
// async function mains() {
//   const user = await prisma.user.findFirst({
//     where: {
//       name: 'BlackDevil',
//     },
//   });
//   console.log(user);
// }

// findMany --to find many users that matches
async function change2mains() {
  const user = await prisma.user.findMany({
    where: {
      name: 'Hunter',
    },
    //orderBy: to make an order in ascending or descneding asc/desc
    orderBy: {
      // age: 'asc',
      age: 'asc',
    },
    //if we use distinct on name then it will only get the first Hunter with the name ,,,  can also do with name and age-- it will give Hungter with different age now --it wil return which ever has unique name and age because name and age is different for them
    // distinct: ['name'],
    // distinct: ['name', 'age'],

    //pagination --more important then distinct is going to be pagination -- pagination is say take and how much we want to return ,,,
    take: 2,
    //skip --we can combine take with skip ,, means we are skipping one user and taking the next two user
    skip: 0,
  });
  console.log(user);
}

async function mains() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Hunter',
        age: 21,
        email: 'hunter5@test.com',
      },
    ],
  });
}
mains()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
