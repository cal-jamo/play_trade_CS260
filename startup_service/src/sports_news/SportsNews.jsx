"use client";
import React, { useEffect, useState } from 'react';

const SportsNews = () => {
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        fetch('https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=72fba5b14dc14f968aea3812b9bcdf92')
            .then((res) => res.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                setArticles(jsonResponse.articles);
            });
    }, []);

    return (
      <div className='text-white container mb-4'>
      <h1 className='text-center display-4 mb-4'>Sports News</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {articles && articles.map((article, index) => (
            <div key={index} className="col">
              <div className="card h-100 border-light bg-secondary text-white">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    className="card-img-top"
                    alt={article.title}
                    style={{ objectFit: 'cover', maxHeight: '200px' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-center">{article.title}</h5>
                  <p className="card-text text-center">{article.description}</p>
                </div>
                <div className="card-footer text-center">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light"
                  >
                    Read more at {article.source.name}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
    );
};

export default SportsNews;
