import React from "react";
import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";

import { useLazyGetSummaryQuery } from "../services/articles";
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary,  {error, isFetching}] =  useLazyGetSummaryQuery();

  // to store allArticles in local storage we will use useEffect 
    useEffect(()=>{
      const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

      if(articlesFromLocalStorage){
        setAllArticles(articlesFromLocalStorage);
      }
    },[])  // dependecy array is empty that means we are executing useEffect at the start of the application

  // we will be making api request in the following function
  const handleSubmit = async (e) =>{
    e.preventDefault()
    console.log("wait");
    const {data} = await getSummary({articleUrl: article.url});

    if(data && data.summary){
    const newArticle = {...article, summary:data.summary};

    const updatedArticles = [newArticle,...allArticles]

    setArticle(newArticle);
    setAllArticles(updatedArticles);
    
    localStorage.setItem('articles', JSON.stringify(updatedArticles))
    }
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      {/* search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img src={linkIcon} alt="icon" className="absolute left-0 ml-3 w-5" />
          <input
            type="url"
            placeholder="enter a url"
            value={article.url}
            onChange={(e) => {setArticle({...article, url:e.target.value})}}
            required
            className="url_input peer"
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            🍳
          </button>
        </form>
        {/* Browse Url History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index)=>(
    
            <div key={`link-${index}`}
            onClick={() =>setArticle(item)}
            className="link_card"
            >
        
              <div className="copy_btn">
                <img src = {copy} alt="copy_icon"
                className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncated">{item.url}</p>
            </div>
          ))}
        </div>
      </div>
      {/* display result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ): error ? (
          <p>
            give some other link with a block of articles that can be summarized or you have done too may request try again later or update pricing
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}

                </p>
              </div>
            </div>
          )
        )}

      </div>
    </section>
  );
};

export default Demo;
