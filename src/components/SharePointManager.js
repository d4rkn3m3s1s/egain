import React, { useState, useEffect } from 'react';
import { useSharePoint } from '../context/SharePointContext';
import '../styles/SharePointManager.css';

const SharePointManager = () => {
  const {
    isAuthenticated,
    isLoading,
    error,
    departmentStats,
    initiateAuth,
    handleAuthCallback,
    createDocument,
    searchDocuments
  } = useSharePoint();

  const [authForm, setAuthForm] = useState({
    clientId: '',
    clientSecret: '',
    tenantId: '',
    siteId: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [uploadForm, setUploadForm] = useState({
    folderPath: '',
    fileName: '',
    content: ''
  });

  useEffect(() => {
    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const storedAuth = sessionStorage.getItem('auth_params');

    if (code && storedAuth) {
      const { clientId, clientSecret, tenantId } = JSON.parse(storedAuth);
      handleAuthCallback(code, clientId, clientSecret, tenantId);
      sessionStorage.removeItem('auth_params');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [handleAuthCallback]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    // Store auth params for callback
    sessionStorage.setItem('auth_params', JSON.stringify({
      clientId: authForm.clientId,
      clientSecret: authForm.clientSecret,
      tenantId: authForm.tenantId
    }));
    initiateAuth(authForm.clientId, authForm.tenantId);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchDocuments(searchQuery, 10);
      setSearchResults(results);
    } catch (err) {
      console.error('Search failed:', err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      await createDocument(
        uploadForm.folderPath,
        uploadForm.fileName,
        uploadForm.content
      );
      setUploadForm({ folderPath: '', fileName: '', content: '' });
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="sharepoint-manager">
      {!isAuthenticated ? (
        <div className="auth-section">
          <h2>SharePoint Authentication</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleAuthSubmit} className="auth-form">
            <input
              type="text"
              placeholder="Client ID"
              value={authForm.clientId}
              onChange={(e) =>
                setAuthForm({ ...authForm, clientId: e.target.value })
              }
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Client Secret"
              value={authForm.clientSecret}
              onChange={(e) =>
                setAuthForm({ ...authForm, clientSecret: e.target.value })
              }
              className="auth-input"
            />
            <input
              type="text"
              placeholder="Tenant ID"
              value={authForm.tenantId}
              onChange={(e) =>
                setAuthForm({ ...authForm, tenantId: e.target.value })
              }
              className="auth-input"
            />
            <input
              type="text"
              placeholder="Site ID"
              value={authForm.siteId}
              onChange={(e) =>
                setAuthForm({ ...authForm, siteId: e.target.value })
              }
              className="auth-input"
            />
            <button type="submit" className="auth-button">
              Connect to SharePoint
            </button>
          </form>
        </div>
      ) : (
        <div className="content-section">
          <h2>SharePoint Document Management</h2>
          
          {/* Search Section */}
          <div className="search-section">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
            
            <div className="search-results">
              {searchResults.map((doc) => (
                <div key={doc.id} className="search-result-item">
                  <span className="doc-name">{doc.name}</span>
                  <span className="doc-modified">{doc.lastModified}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Section */}
          <div className="upload-section">
            <h3>Upload Document</h3>
            <form onSubmit={handleUpload} className="upload-form">
              <input
                type="text"
                placeholder="Folder Path"
                value={uploadForm.folderPath}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, folderPath: e.target.value })
                }
                className="upload-input"
              />
              <input
                type="text"
                placeholder="File Name"
                value={uploadForm.fileName}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, fileName: e.target.value })
                }
                className="upload-input"
              />
              <textarea
                placeholder="Document Content"
                value={uploadForm.content}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, content: e.target.value })
                }
                className="upload-textarea"
              />
              <button type="submit" className="upload-button">
                Upload Document
              </button>
            </form>
          </div>

          {/* Department Stats Section */}
          <div className="stats-section">
            <h3>Department Statistics</h3>
            <div className="stats-grid">
              {departmentStats.map((stat) => (
                <div key={stat.department} className="stat-card">
                  <h4>{stat.department}</h4>
                  <p>Documents: {stat.documentCount}</p>
                  <p>Total Size: {stat.totalSize}</p>
                  <p>Last Modified: {stat.lastModified}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePointManager; 