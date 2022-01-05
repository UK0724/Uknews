import React from 'react';

function Likes(props) {
    return (
        <div className='newsCard'>
        <img src={props.data.urlimg ? props.data.urlimg : 'https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-01.jpg'} alt={props.data.title} className='newsImage' />
        <div className='newsText'>
            <div>
                <span className='title'>
                    {props.data.title}
                </span>&nbsp;
                <span className='author'>
                    <a href={props.data.url} target="_blank" rel="noopener">
                        <b>News</b>
                    </a>{" "}
                    <span className="muted">
                        {" "}
                        by {props.data.source ? props.data.source : "unknown"} /{" "}
                        {" "}
                            {props.data.date1}
                            on {props.data.day2}
                    </span>

                </span>
            </div>
            <div className='lowerNewsText'>
                <div className='description'>
                    {props.data.description}
                </div>
                <span className='readmore'>
                    read more at{" "}
                    <a href={props.data.url} target="_blank" rel="noopener">
                    {props.data.source}
                    </a>
                </span>
            </div>
        </div>
    </div>
    );
}

export default Likes;