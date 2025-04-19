import React, { useState } from 'react';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    
    // Mock search results - in a real app, this would call an API
    setTimeout(() => {
      setResults([
        {
          id: 1,
          title: 'SharePoint Integration Guide',
          excerpt: 'This document explains how to set up and configure the <mark>SharePoint</mark> integration with eGain...',
          type: 'document',
          modified: '2023-06-15',
          author: 'John Smith'
        },
        {
          id: 2,
          title: 'User Permissions Matrix',
          excerpt: 'The complete guide to <mark>SharePoint</mark> permission levels and how they map to eGain access roles...',
          type: 'page',
          modified: '2023-05-22',
          author: 'Jane Doe'
        },
        {
          id: 3,
          title: 'Troubleshooting Common Issues',
          excerpt: 'Solutions for common <mark>SharePoint</mark> connectivity and authentication problems when using the integration...',
          type: 'list',
          modified: '2023-07-01',
          author: 'Technical Support Team'
        }
      ]);
      setIsSearching(false);
    }, 800);
  };

  const handleVoiceSearch = () => {
    // Voice search functionality would be implemented here
    alert('Voice search triggered');
  };

  return (
    <div className="container">
      <div className="search-container">
        <form onSubmit={handleSearch}>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Ask a question about your SharePoint content"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button 
                type="button" 
                className="clear-button"
                onClick={() => setQuery('')}
              >
                ✕
              </button>
            )}
            <button 
              type="button" 
              className="voice-button"
              onClick={handleVoiceSearch}
            >
              🎤
            </button>
            <button type="submit" className="btn-primary ml-2">
              Search
            </button>
          </div>
        </form>

        {isSearching ? (
          <div className="loading mt-8 text-center">
            <div className="progress-indicator">Searching...</div>
          </div>
        ) : (
          results.length > 0 && <SearchResults results={results} />
        )}
      </div>
    </div>
  );
};

export default SearchPage; 