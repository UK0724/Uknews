import { useEffect, useState } from "react"
import NavBar from "./components/NavBar/NavBar"
import NewsContent from "./components/NewsContent/NewsContent"
import axios from "axios";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer} from 'react-toastify';
import Profile from "./components/Profile/Profile";

const apiKey ='d209475b0cb24fc792fc97885fdc2860';
const App = () =>{
  const [category,setCategory] = useState('general');
  const [newsArray,setNewsArray] = useState([]);
  const [newsResults,setNewsResults] = useState();
  const [search,setSearch] = useState('');
  const [loadmore,setLoadmore] = useState(20)

  const newApi = async() =>{
    
    try{
      const news = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&category=${category}&q=${search}&pageSize=${loadmore}`
      );
      // console.log(news);
      setNewsArray(news.data.articles)
      setNewsResults(news.data.totalResults)
    }
    catch(error){ 
      console.error(error);
    }
  };

  useEffect(()=>{
    newApi();
  },[category,newsResults,loadmore])
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="SignUp" element={<SignUp/>}/>
            <Route path="Uknews"
            element={
              <><NavBar category={category} setNewsArray={setNewsArray} setCategory={setCategory} setsearch={setSearch} search={search} setNewsResults={setNewsResults} />
              <NewsContent
                newsArray={newsArray}
                newsResults={newsResults} 
                loadmore = {loadmore}
                setLoadmore = {setLoadmore}/></>
            }
            />
            <Route path="profile" element={<Profile/>}/>     
          </Routes>
    </BrowserRouter>
    </>
  )
}

export default App