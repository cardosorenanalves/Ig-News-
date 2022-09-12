import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './style.module.scss'
import * as Prismic from '@prismicio/client'
import {RichText} from 'prismic-dom'
import Link from 'next/link';

type Post = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}
interface PostsProps{
    posts: Post[]
}

export default function Posts({posts}: PostsProps){
    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link href={`/posts/${post.slug}`}>
                          <a key={post.slug} href='#'>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>  
                        </Link>
                      
                    ))}
                </div>
            </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () =>{
    const prismic = getPrismicClient()

    const response = await prismic.getByType( 'publication', {
        lang: 'pt-BR',
    });

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    })

    return{
        props: {
            posts
        }
    }
}