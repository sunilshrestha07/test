import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string;
      verified?: boolean;
      username?: string;
    } & DefaultSession['user'];
  }

  interface User {
    _id?: string;
    verified?: boolean;
    username?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    _id?: string;
    verified?: boolean;
    username?: string;
  }
}