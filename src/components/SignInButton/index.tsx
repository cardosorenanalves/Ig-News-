import  { FaGithub } from '../../../node_modules/react-icons/fa/index'
import  { FiX } from '../../../node_modules/react-icons/fi/index'
import { signIn, signOut, useSession } from 'next-auth/react'



import Styles from "./styles.module.scss";

export function SignInButton(){
const {data: session} = useSession()

console.log(session)


return session ?(
    <button 
    type="button"
   className={Styles.SignInButton} 
   onClick={()=> signOut()}
   >

        <FaGithub color='#04d361'/>
        {session.user.name}
        <FiX color='#737380' className={Styles.closeIcon}/>
    </button>
) : (
    <button 
    type="button"
   className={Styles.SignInButton} 
   onClick={()=> signIn('github')}
   >

        <FaGithub color='#eba417'/>
        Sign in with Github
    </button>
)

}