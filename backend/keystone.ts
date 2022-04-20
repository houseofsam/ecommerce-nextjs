import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data/index';

const databaseURL = process.env.DATABASE_URL || 'mogodb://localhost/keystone-ecommerce';

// session configs, authentication
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User', //specify which schema is responsible for users
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // to-do: Add initial roles. First user should have all roles
  }
})

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true //will pass along cookie when created
      }
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        console.log('Connected to DB');
        if(process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      }
    },
    lists: createSchema({
      // schema items imported
      User,
      Product,
      ProductImage
    }),
    ui: {
      // Show UI only for people who pass this test 
      isAccessAllowed: ({ session }) => {
        console.log(session);
        return !!session?.data; //coerce to boolean
      },
    },
    // Add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // will pass ID with everything that is queried for easy access
      // GraphQL query
      User: `id name email`,
    })
  })
);