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
      age: 'asc',
      // age: 'desc',
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

// async function mains() {
//   await prisma.user.createMany({
//     data: [
//       {
//         name: 'Hunter',
//         age: 13,
//         email: 'hunter13@test.com',
//       },
//     ],
//   });
// }
async function change22mains() {
  const user = await prisma.user.findMany({
    where: {
      //gives user with equals name as object
      // name: { equals: 'Hunter' },

      //it will give which is not equal to
      // name: { not: 'Hunter' },

      //using "in" and passing as array that gives an array
      // name: { in: ['Hunter'] },

      //opposite of in which gives an array which doent match
      // name: { notIn: ['Hunter'] },

      //get user whose age is "lt=less than" 20
      // age: { lt: 20 },

      //applying type of "and &&" query= it will give person whose name is Hunter and age less than 20
      // name: 'Hunter',
      // age: { lt: 20 },

      //greater than 20
      // age: { gt: 20 },

      //greater than equal to
      // age: { gte: 20 },

      //less than equal to
      // age: { lte: 20 },

      //Another query "contains" =allows us to check if the text is contained inside of another piece of text
      // email: { contains: '@test.com' },

      //More specific use  "endsWith"
      // email: { endsWith: '@test.com' },

      //"startsWith"
      // email: { startsWith: 'h' },

      //Combining using "AND" = in Array we can put our query =in below putting as object =use this query while on emails
      AND: [
        // { email: { startsWith: 'hunter' } },
        // { email: { endsWith: '@test.com' } },
      ],

      //OR Query =its gonna return user with the email and user with age also both gets true
      OR: [
        // { email: { startsWith: 'hunter' } }, { age: { gt: 20 } }
      ],

      //NOT Query = it will not give whatever inside of it
      // NOT: [{ email: { startsWith: 'hunter' } }],

      //Queries on Relationships = gives empty array bcoz none of our user has  " emailUpdates: true,"
      // userPreference: {
      //   emailUpdates: true,
      // },

      //evry single post that this person written, start with the title of test? if so return that user ==stuffing queries like every none some
      writtenPosts: {
        // every: {
        // none: {

        //some= do any one of them have
        some: {
          title: 'Test',
        },
      },
    },
  });
  console.log(user.length); //get length
  console.log(user);
}

//Query = relationship filtering = which actually checks to get our post here =find manhy posts where the user here

async function change222mains() {
  const user = await prisma.post.findMany({
    where: {
      author: {
        // "is" this a particular author
        is: {
          age: 27,
        },
      },
    },
  });
  // console.log(user.length); //get length
  // console.log(user);
}

//Updating =two functions we have = "update" will update the first user it finds and "updateMany" will update every user it finds that matches the data
// update = takes two section =were gonna have a data and we're going to have where  data and where =combines find and create

// async function mains() {
//   const user = await prisma.user.update({
//     where: {
//       email: 'hunter14@test.com',
//     },
//     data: {
//       email: 'hunter13@test.com',
//     },
//   });
//   console.log(user);
// }

//updating old name to new name  =updateMany doenst allow us to do select or an include  with findMany and createMany you also cannot do that
async function mains2() {
  const user = await prisma.user.updateMany({
    where: {
      name: 'Hunter',
    },
    data: {
      name: 'Black Hunter',
    },
  });

  console.log(user);
}

async function mains22() {
  const user = await prisma.user.findFirst({
    where: {
      name: 'Black Hunter',
    },
  });

  console.log(user);
}

//when it comes to age update is good
async function mains222() {
  const user = await prisma.user.update({
    where: {
      email: 'hunter15@test.com',
    },
    // data: {
    //   age: {
    //     increment: 1,
    //   },
    // },

    // data: {
    //   age: {
    //     // decrement: 10,
    //     // multiply: 10,
    //     divide: 9,
    //   },
    // },

    data: {
      userPreference: {
        connect: {
          id: 'df37efef-28de-4cec-9e01-3639d7f97afe',
        },
      },
    },
  });

  console.log(user);
}

//created emailUpdates true for above userPreference got id which is in connect above
// async function mains() {
//   const preference = await prisma.userPreference.create({
//     data: {
//       emailUpdates: true,
//     },
//   });
//   console.log(preference);
// }

async function mains2222() {
  const user = await prisma.user.findFirst({
    where: {
      name: 'Hunter',
    },
    include: { userPreference: true },
  });
  console.log(user);
}

//instead of connect say disconnect ==instead can use create
async function mains1() {
  const user = await prisma.user.update({
    where: {
      email: 'hunter@test.com',
    },
    data: {
      userPreference: {
        disconnect: true,
      },
    },
  });
  console.log(user);
}

//delete  and deleteMany //deleteMany
//to delete everything just pass as deleteMany()
async function mains() {
  const user = await prisma.user.deleteMany({
    // where: {
    //   email: 'Hunter@test.com',
    // },
    where: {
      age: { gt: 19 },
    },
  });
  console.log(user);
}
mains()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
