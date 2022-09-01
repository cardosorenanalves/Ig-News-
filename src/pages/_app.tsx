import { Header } from '../components/Header/index'
import '../styles/global.scss'

function MyApp({ Component, pageProps } ) {

  return(
    <>
      <Header/>
      <Component {...pageProps} />
   </>
  )
 

}

export default MyApp
