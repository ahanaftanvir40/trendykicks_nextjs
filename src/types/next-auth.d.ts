import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            _id?: string;
            email: string;
            isAdmin: boolean
        } & DefaultSession['user'];
    }

    interface User {
        _id?: string;
        email: string;
        isAdmin: boolean
    }


}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        email: string;
        isAdmin: boolean
    }
}

