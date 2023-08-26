import React, { useState } from 'react';

function Articles() {
  const [articles, setArticles] = useState([
    {
      title: 'Article 1 title',
      upvotes: 10,
      date: '2022-01-01',
    },
    {
      title: 'Article 2 title',
      upvotes: 5,
      date: '2022-02-01',
    },
    {
      title: 'Article 3 title',
      upvotes: 8,
      date: '2022-03-01',
    },
  ]);

  const sortByUpvotes = () => {
    const sortedArticles = [...articles].sort((a, b) => b.upvotes - a.upvotes);
    setArticles(sortedArticles);
  };

  const sortByDate = () => {
    const sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
    setArticles(sortedArticles);
  };

  return (
    <div className="card w-50 mx-auto">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>
              <button onClick={sortByUpvotes} className="sort-button" data-testid="button-sort-upvotes">
                Upvotes
              </button>
            </th>
            <th>
              <button onClick={sortByDate} className="sort-button" data-testid="button-sort-date">
                Date
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr data-testid="article" key={`article-${index}`}>
              <td data-testid="article-title">{article.title}</td>
              <td data-testid="article-upvotes">{article.upvotes}</td>
              <td data-testid="article-date">{article.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
