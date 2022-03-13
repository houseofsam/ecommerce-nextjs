import { password, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
  // access:
  // ui
  fields: {
    // import fields from keystone
    name: text({ isRequired: true }), 
    email: text({ isRequired: true, isUnique: true }),
    password: password(),
    // to-do: roles, cost, and orders
  },
});