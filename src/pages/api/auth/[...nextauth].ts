import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
    
    providers: [
        GithubProvider({
          clientId: process.env.NEXT_AUTH_GITHUB_ID,
          clientSecret: process.env.NEXT_AUTH_GITHUB_SECRET,
          authorization: {
            params: {
              scope: 'read:user',
            },
          },
        }),
      ]

})