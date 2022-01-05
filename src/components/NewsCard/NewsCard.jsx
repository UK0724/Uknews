import React from 'react';
import '../NewsCard/NewsCard.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import fireDB from '../config';
import { collection, addDoc, getDoc, getDocs, Firestore, doc, deleteDoc } from "firebase/firestore";


function NewsCard({ newsItem }) {
    const fulldate = new Date(newsItem.publishedAt); // Sat  Jan 09 2021  17:45:30  GMT+0530
    const date = fulldate.toString().split(" "); // ["Sat", "Jan", "09", "2021", "17:45:30", "GMT+0530"]
    const hour = parseInt(date[4].substring(0, 2)); //
    const time = hour > 12 ? true : false;
    // console.log(newsItem);
    const { user } = JSON.parse(localStorage.getItem('CurnetUser'))
    const email = user.email;

    let check = async (e) => {
        // Add a new document with a generated id.
        e.target.classList.toggle("red");
        let urlimg = newsItem.urlToImage;
        let title = newsItem.title;
        let url = newsItem.url;
        let description = newsItem.description;
        let source = newsItem.source.name
        let userd = "";
        let date1 = time ? `${hour - 12}:${date[4].substring(3, 5)} pm` : `${hour}:${date[4].substring(3, 5)} am`;
        let day2 = `${date[2]} ${date[1]} ${date[3]}, ${date[0]}`
        let user = { email, urlimg, title, url, description, source, date1, day2 }
        if ((e.target.classList.contains('red'))) {
            try {
                const docRef = await addDoc(collection(fireDB, "Likes"), user);
                console.log("Document written with ID: ", docRef.id);
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                const docRef = await getDocs(collection(fireDB, "Likes"));
                docRef.forEach((doc) => {
                    if (doc.data().title === title) {
                        userd = doc.id
                        let idlike = { userd, title }
                        try {
                            const addid = addDoc(collection(fireDB, "IdLikes"), idlike)
                            console.log("Document written with ID: ", docRef.id);
                        }
                        catch (err) {
                            console.log(err);
                        }
                    }
                })
                console.log(userd);
            }
            catch (err) {
                console.log(err);
            }
            await deleteDoc(doc(fireDB, "Likes", userd));
        }

    }

    return (
        <div className='newsCard'>
            <img src={newsItem.urlToImage ? newsItem.urlToImage : 'https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-01.jpg'} alt={newsItem.title} className='newsImage' />
            <div className='newsText'>
                <div>
                    <span className='title'>
                        {newsItem.title}
                    </span>&nbsp;
                    <span className='author'>
                        <a href={newsItem.url} target="_blank" rel="noopener">
                            <b>News</b>
                        </a>{" "}
                        <span className="muted">
                            {" "}
                            by {newsItem.author ? newsItem.author : "unknown"} /{" "}
                            {time
                                ? `${hour - 12}:${date[4].substring(3, 5)} pm`
                                : `${hour}:${date[4].substring(3, 5)} am`}{" "}
                            on {date[2]} {date[1]} {date[3]}, {date[0]}
                        </span>

                    </span>
                </div>
                <div className='lowerNewsText'>
                    <div className='description'>
                        {newsItem.description}
                    </div>
                    <span className='readmore'>
                        read more at{" "}
                        <a href={newsItem.url} target="_blank" rel="noopener">
                            <b>{newsItem.source.name}</b>
                        </a>
                    </span>
                </div>
            </div>
            <FavoriteBorderIcon onClick={check} className='favorite' ></FavoriteBorderIcon>
        </div>
    );
}

export default NewsCard;