import  { FaGithub } from '../../../node_modules/react-icons/fa/index'
import  { FiX } from '../../../node_modules/react-icons/fi/index'


import Styles from "./styles.module.scss";

export function SignInButton(){
const isUserLoggedIn = false;


return isUserLoggedIn ?(
    <button 
    type="button"
   className={Styles.SignInButton} 
   >

        <FaGithub color='#04d361'/>
        Renan Cardoso
        <FiX color='#737380' className={Styles.closeIcon}/>
    </button>
) : (
    <button 
    type="button"
   className={Styles.SignInButton} 
   >

        <FaGithub color='#eba417'/>
        Sign in with Github
    </button>
)

}