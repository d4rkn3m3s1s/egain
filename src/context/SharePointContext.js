import React, { createContext, useState, useContext, useEffect } from 'react';
import SharePointService from '../services/SharePointService';

const SharePointContext = createContext();

export const SharePointProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [siteId, setSiteId] = useState(null);

  const initiateAuth = (clientId, tenantId) => {
    const authUrl = SharePointService.getAuthUrl(clientId, tenantId);
    window.location.href = authUrl;
  };

  const handleAuthCallback = async (code, clientId, clientSecret, tenantId) => {
    setIsLoading(true);
    setError(null);
    try {
      const success = await SharePointService.handleCallback(code, clientId, clientSecret, tenantId);
      setIsAuthenticated(success);
      if (success) {
        sessionStorage.setItem('sharepoint_site_id', siteId);
      }
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDepartmentStats = async () => {
    if (!isAuthenticated || !siteId) return;
    
    setIsLoading(true);
    try {
      const stats = await SharePointService.getDepartmentStats(siteId);
      setDepartmentStats(stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createDocument = async (folderPath, fileName, content) => {
    if (!isAuthenticated || !siteId) throw new Error('Not authenticated');
    setIsLoading(true);
    try {
      return await SharePointService.retryOperation(() =>
        SharePointService.createDocument(siteId, folderPath, fileName, content)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getDocument = async (itemId) => {
    if (!isAuthenticated || !siteId) throw new Error('Not authenticated');
    setIsLoading(true);
    try {
      return await SharePointService.retryOperation(() =>
        SharePointService.getDocument(siteId, itemId)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getDocumentByPath = async (folderPath, fileName) => {
    if (!isAuthenticated || !siteId) throw new Error('Not authenticated');
    setIsLoading(true);
    try {
      return await SharePointService.retryOperation(() =>
        SharePointService.getDocumentByPath(siteId, folderPath, fileName)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateDocumentMetadata = async (listId, itemId, metadata) => {
    if (!isAuthenticated || !siteId) throw new Error('Not authenticated');
    setIsLoading(true);
    try {
      return await SharePointService.retryOperation(() =>
        SharePointService.updateDocumentMetadata(siteId, listId, itemId, metadata)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const updateDocument = async (itemId, content) => {
    if (!isAuthenticated || !siteId) throw new Error('Not authenticated');
    setIsLoading(true);
    try {
      return await SharePointService.retryOperation(() =>
        SharePointService.updateDocument(siteId, itemId, content)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocument = async (itemId) => {
    if (!isAuthenticated || !siteId) throw new Error('Not authenticated');
    setIsLoading(true);
    try {
      return await SharePointService.retryOperation(() =>
        SharePointService.deleteDocument(siteId, itemId)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const searchDocuments = async (query, maxResults = 10) => {
    if (!isAuthenticated || !siteId) throw new Error('Not authenticated');
    setIsLoading(true);
    try {
      return await SharePointService.retryOperation(() =>
        SharePointService.searchDocuments(query, maxResults)
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Load department stats periodically when authenticated
  useEffect(() => {
    if (isAuthenticated && siteId) {
      loadDepartmentStats();
      const interval = setInterval(loadDepartmentStats, 300000); // Refresh every 5 minutes
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, siteId]);

  // Restore site ID from storage on mount
  useEffect(() => {
    const storedSiteId = sessionStorage.getItem('sharepoint_site_id');
    if (storedSiteId) {
      setSiteId(storedSiteId);
    }
  }, []);

  const value = {
    isAuthenticated,
    isLoading,
    error,
    departmentStats,
    siteId,
    setSiteId,
    initiateAuth,
    handleAuthCallback,
    createDocument,
    getDocument,
    getDocumentByPath,
    updateDocument,
    updateDocumentMetadata,
    deleteDocument,
    searchDocuments,
    loadDepartmentStats
  };

  return (
    <SharePointContext.Provider value={value}>
      {children}
    </SharePointContext.Provider>
  );
};

export const useSharePoint = () => {
  const context = useContext(SharePointContext);
  if (context === undefined) {
    throw new Error('useSharePoint must be used within a SharePointProvider');
  }
  return context;
};

export default SharePointContext; 