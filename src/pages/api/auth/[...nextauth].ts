import { query as q } from 'faunadb'

import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import {fauna} from '../../../services/fauna'



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
      ],

      callbacks: {
        async signIn({user, account, profile}) {
            const {email} = user
            try{
            await fauna.query(
                q.Create(
                    q.Collection('users'),
                    {data: {email}}
                )
            )
          } catch(e){
            console.log(e)
          }

            return true
            
        }
      }

})