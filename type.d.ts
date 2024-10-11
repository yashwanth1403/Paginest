// types.d.ts
import NextAuth from "next-auth";

// Extend the default User and Session types
declare module "next-auth" {
  interface User {
    id: string; // Unique identifier for the user
    email: string; // Email address of the user
    name?: string; // Optional name field
    // Add any other custom fields you may need
  }

  interface Session {
    user: {
      id: string; // Unique identifier for the user
      email: string; // Email address of the user
      name?: string; // Optional name field
      // Add any other custom fields you may need
    };
    expires: string; // Expiration time of the session
  }
}
