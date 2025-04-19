import axios from 'axios';
import sharepointConfig from '../config/sharepoint.config';

class SharePointService {
  constructor() {
    this.baseUrl = sharepointConfig.endpoints.graph;
    this.authUrl = sharepointConfig.endpoints.auth;
    this.redirectUri = sharepointConfig.oauth.redirectUri;
    this.accessToken = null;
  }

  // Authentication methods
  getAuthUrl(clientId, tenantId) {
    const scopes = encodeURIComponent(sharepointConfig.oauth.scopes.join(' '));
    return `${this.authUrl}/${tenantId}/oauth2/v2.0/authorize?` +
      `client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(this.redirectUri)}` +
      `&response_mode=query` +
      `&scope=${scopes}` +
      `&state=12345`;
  }

  async handleCallback(code, clientId, clientSecret, tenantId) {
    try {
      const tokenUrl = `${this.authUrl}/${tenantId}/oauth2/v2.0/token`;
      const response = await axios.post(tokenUrl, new URLSearchParams({
        client_id: clientId,
        scope: sharepointConfig.oauth.scopes.join(' '),
        code: code,
        redirect_uri: this.redirectUri,
        grant_type: 'authorization_code',
        client_secret: clientSecret
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      this.accessToken = response.data.access_token;
      return true;
    } catch (error) {
      console.error('Authentication callback failed:', error);
      return false;
    }
  }

  // CRUD Operations
  async createDocument(siteId, folderPath, fileName, content) {
    try {
      const url = `${this.baseUrl}/sites/${siteId}/drive/root:/${folderPath}/${fileName}:/content`;
      const response = await axios.put(url, content, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/octet-stream'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create document failed:', error);
      throw error;
    }
  }

  async getDocument(siteId, itemId) {
    try {
      const url = `${this.baseUrl}/sites/${siteId}/drive/items/${itemId}`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Get document failed:', error);
      throw error;
    }
  }

  async getDocumentByPath(siteId, folderPath, fileName) {
    try {
      const url = `${this.baseUrl}/sites/${siteId}/drive/root:/${folderPath}/${fileName}`;
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Get document by path failed:', error);
      throw error;
    }
  }

  async updateDocumentMetadata(siteId, listId, itemId, metadata) {
    try {
      const url = `${this.baseUrl}/sites/${siteId}/lists/${listId}/items/${itemId}/fields`;
      const response = await axios.patch(url, metadata, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Update document metadata failed:', error);
      throw error;
    }
  }

  async updateDocument(siteId, itemId, content) {
    try {
      const url = `${this.baseUrl}/sites/${siteId}/drive/items/${itemId}/content`;
      const response = await axios.put(url, content, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/octet-stream'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Update document failed:', error);
      throw error;
    }
  }

  async deleteDocument(siteId, itemId) {
    try {
      const url = `${this.baseUrl}/sites/${siteId}/drive/items/${itemId}`;
      await axios.delete(url, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
      return true;
    } catch (error) {
      console.error('Delete document failed:', error);
      throw error;
    }
  }

  // Search functionality
  async searchDocuments(query, maxResults = 10) {
    try {
      const url = `${this.baseUrl}/search/query`;
      const response = await axios.post(url, {
        requests: [{
          entityTypes: ["driveItem"],
          query: {
            queryString: query
          },
          from: 0,
          size: maxResults
        }]
      }, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.value[0].hitsContainers[0].hits;
    } catch (error) {
      console.error('Search documents failed:', error);
      throw error;
    }
  }

  // Error handling with retry
  async retryOperation(operation, maxRetries = 3) {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        if (error.response?.status === 429) { // Rate limiting
          const retryAfter = error.response.headers['retry-after'] || Math.pow(2, i);
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          continue;
        }
        throw error;
      }
    }
    throw lastError;
  }

  // Department-specific operations
  async getDepartmentDocuments(siteId, department) {
    try {
      const searchResults = await this.searchDocuments(`department:${department}`);
      return searchResults.map(hit => ({
        id: hit.resource.id,
        name: hit.resource.name,
        createdDateTime: hit.resource.createdDateTime,
        lastModifiedDateTime: hit.resource.lastModifiedDateTime,
        size: hit.resource.size,
        webUrl: hit.resource.webUrl
      }));
    } catch (error) {
      console.error('Get department documents failed:', error);
      throw error;
    }
  }

  async getDepartmentStats(siteId) {
    try {
      const departments = ['Marketing', 'Sales', 'Support', 'HR', 'Engineering'];
      const stats = await Promise.all(
        departments.map(async (dept) => {
          const docs = await this.getDepartmentDocuments(siteId, dept);
          return {
            department: dept,
            count: docs.length,
            totalSize: docs.reduce((sum, doc) => sum + doc.size, 0),
            lastModified: docs.length > 0 ? 
              Math.max(...docs.map(doc => new Date(doc.lastModifiedDateTime))) : 
              null
          };
        })
      );
      return stats;
    } catch (error) {
      console.error('Get department stats failed:', error);
      throw error;
    }
  }
}

export default new SharePointService(); 