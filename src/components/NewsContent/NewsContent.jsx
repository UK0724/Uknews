import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import "../NewsContent/NewsContent.css";

function NewsContent({newsArray,newsResults,loadmore,setLoadmore}) {
    return (
        <div className='main'>
            <Container className='con' maxWidth="md">
                {newsArray.map(newsItem=>(
                    <NewsCard newsItem = {newsItem} key ={newsItem.title} />
                ))}

                {loadmore<=newsResults &&(
                    <>
                    <hr/>
                    <button className='loadmore' onClick={()=>setLoadmore(loadmore+20)}>
                    Load More
                </button></>
                )}
                
                
            </Container>
        </div>
    );
}

export default NewsContent;