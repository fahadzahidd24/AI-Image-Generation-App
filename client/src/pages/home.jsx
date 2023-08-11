import React, { useState, useEffect } from 'react'
import { Card, FormField, Loader } from '../components/index'
import axios from 'axios';

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
        return data.map((post, index) => {
            return <Card key={index} {...post} />
        })
    }
    else {
        return (<h2 className='mt-5 font-bold  text-[#6449ff] text-xl uppercase'>{title}</h2>)
    }
}

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [searchText, setsearchText] = useState('');

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const posts = await axios.get('https://ai-image-generation-app-one.vercel.app/api/v1/posts').catch(err => alert(err));
            if (posts) {
                setAllPosts(posts.data.data);
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect( () => {
        fetchPosts();
    }, []);

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#fdde30] text-[32px]'>All Collections</h1>
                <p className='mt-2 text-[#ffffff] text-[14px] max-w[500px]'>Generated by G-Image</p>
            </div>
            <div className="mt-10">
                {loading ? (
                    <div className='flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {searchText && (
                            <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                                Showing results for <span className='text-[#222328]'>{searchText}</span>
                            </h2>
                        )}
                        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                            {searchText ? (
                                <RenderCards data={allPosts} title='No results found' />
                            ) : (
                                <RenderCards data={allPosts} title='No Post Found' />
                            )}
                        </div>
                    </>
                )}
            </div>

        </section>
    )
}

export default Home