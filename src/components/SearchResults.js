import React from 'react';

const SearchResults = ({ results }) => {
  const getTypeIcon = (type) => {
    switch (type) {
      case 'document':
        return '📄';
      case 'page':
        return '📝';
      case 'list':
        return '📋';
      default:
        return '📁';
    }
  };

  return (
    <div className="results-container mt-6">
      <h2 className="text-lg font-semibold mb-4">Search Results ({results.length})</h2>
      
      {results.map((result) => (
        <div key={result.id} className="result-card">
          <div className="flex items-start">
            <span className="text-xl mr-2">{getTypeIcon(result.type)}</span>
            <div>
              <h3 className="result-title">{result.title}</h3>
              <p 
                className="result-excerpt"
                dangerouslySetInnerHTML={{ __html: result.excerpt }}
              />
              <div className="result-meta">
                Last modified: {result.modified} | Author: {result.author}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="pagination mt-4 flex justify-center">
        <button className="pagination-control mx-1 px-3 py-1">1</button>
        <button className="pagination-control mx-1 px-3 py-1 disabled">2</button>
        <button className="pagination-control mx-1 px-3 py-1 disabled">3</button>
      </div>
    </div>
  );
};

export default SearchResults; 