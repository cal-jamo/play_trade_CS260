"use client";
import React, { useEffect, useState } from 'react';

const SportsNews = () => {
    const [article, setArticle] = useState(null);
    const [advice, setAdvice] = useState(null);

    useEffect(() => {
        fetch('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty')
            .then((res) => res.json())
            .then((jsonResponse) => {
                console.log(jsonResponse);
                setArticle(jsonResponse);
            })
            .catch((error) => {
                console.error('Error fetching the article:', error);
            });

        fetch('https://gomezmig03.github.io/MotivationalAPI/en.json')
            .then((res) => res.json())
            .then((jsonResponse) => {
                const randomAdvice = jsonResponse[Math.floor(Math.random() * jsonResponse.length)];
                setAdvice(randomAdvice);
            })
            .catch((error) => {
                console.error('Error fetching the advice:', error);
            });
    }, []);

    return (
      <div className='text-white container mb-2'>
      <h1 className='text-center mb-5'>Here is some hacker news and advice</h1>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {article && (
            <div className="row">
              <div className="card h-100 border-light bg-secondary text-white">
                <div className="card-body">
                  <h5 className="card-title text-center">{article.title}</h5>
                  <p className="card-text text-center">By: {article.by}</p>
                  <p className="card-text text-center">Score: {article.score}</p>
                </div>
                <div className="card-footer text-center">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-light"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          )}
          {advice && (
          <div className="mt-4">
            <h2 className="text-center">Random Advice</h2>
            <p className="text-center">{advice.phrase}</p>
            <p className="text-center"><em>- {advice.author}</em></p>
          </div>
        )}
        </div>
      </div>
    );
};

export default SportsNews;