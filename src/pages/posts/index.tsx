import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './style.module.scss'


export default function Posts(){
    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href='#'>
                        <time>12 de setembro de 2022</time>
                        <strong>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</strong>
                        <p>Harum explicabo magni rerum ducimus possimus maiores neque voluptates! Ea eveniet sunt facere maiores eligendi consequuntur eum quam amet, adipisci, quidem officia?</p>
                    </a>  
                    <a href='#'>
                        <time>12 de setembro de 2022</time>
                        <strong>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</strong>
                        <p>Harum explicabo magni rerum ducimus possimus maiores neque voluptates! Ea eveniet sunt facere maiores eligendi consequuntur eum quam amet, adipisci, quidem officia?</p>
                    </a>  
                    <a href='#'>
                        <time>12 de setembro de 2022</time>
                        <strong>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</strong>
                        <p>Harum explicabo magni rerum ducimus possimus maiores neque voluptates! Ea eveniet sunt facere maiores eligendi consequuntur eum quam amet, adipisci, quidem officia?</p>
                    </a>  
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () =>{
    const prismic = getPrismicClient()

    const response = await prismic.getByType()

    return{
        props: {}
    }
}