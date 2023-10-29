import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newsData, setNewsData] = useState([]);

  const apiKey = '6WMQUPP4NLA3W9XM'; // Your Alpha Vantage API key

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&keywords=${searchTerm}&apikey=${apiKey}`
      );

      const feed = response.data.feed || [];

      setNewsData(feed);
    } catch (error) {
      console.error('Error fetching news data: ', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-blue-300">
      <h1 className="text-9xl text-blue font-serif mt-8">FinanceFlash</h1>
      <div className="bg-white rounded-lg p-4 w-2/3 shadow-lg mt-4 relative">
  <form onSubmit={handleSearch} className="flex items-center">
    <input
      type="text"
      placeholder="Search Your Company..."
      className="w-full p-2 rounded-md focus:outline-none border border-gray-600 pl-10"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button
      type="submit"
      className="bg-blue text-black py-2 px-4  border-gray-600 rounded-lg hover:bg-red hover:text-green-500 focus:outline-none transform transition-transform duration-300 hover:scale-105 border-2 border-blue"
    >
      Search
    </button>
  </form>
</div>

      


      {newsData.length > 0 && (
        <div className="mt-4 ">
          <h2 className="text-2xl text-red mb-2 text-center font-serif mt-4">News Results:</h2>
          <ul>
            {newsData.map((article, index) => {
              const publishedDateTime = article.time_published; // Assuming this is "20231028T214500"
              const year = parseInt(publishedDateTime.substr(0, 4), 10);
              const month = parseInt(publishedDateTime.substr(4, 2), 10) - 1; // Months are 0-based
              const day = parseInt(publishedDateTime.substr(6, 2), 10);
              const hour = parseInt(publishedDateTime.substr(9, 2), 10);
              const minute = parseInt(publishedDateTime.substr(11, 2), 10);
              const second = parseInt(publishedDateTime.substr(13, 2), 10);

              const publishedDate = new Date(year, month, day, hour, minute, second);

              return (
                <li key={index} className="text-center bg-gradient-to-l from-blue-300 to-blue-100 mb-3 p-4 mx-auto border border-blue-800 rounded-lg  w-1/2">
                  <a 
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-lg"
                    >
                  {article.title}
                  </a>

                  <p className="text-lg text-red-500 mt-2">
                    Published on: {publishedDate.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-lg text-red-500">Source: {article.source}</p>
                  <p className="text-lg text-red-500">Overall Sentiment: {article.overall_sentiment_label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
