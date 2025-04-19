const sharepointConfig = {
  // Azure AD / SharePoint App Registration bilgileri
  clientId: process.env.REACT_APP_SHAREPOINT_CLIENT_ID || '',
  clientSecret: process.env.REACT_APP_SHAREPOINT_CLIENT_SECRET || '',
  tenantId: process.env.REACT_APP_SHAREPOINT_TENANT_ID || '',
  
  // SharePoint site bilgileri
  siteId: process.env.REACT_APP_SHAREPOINT_SITE_ID || '',
  
  // API endpoint'leri
  endpoints: {
    auth: 'https://login.microsoftonline.com',
    graph: 'https://graph.microsoft.com/v1.0',
  },

  // OAuth yapılandırması
  oauth: {
    redirectUri: 'https://localhost:3000/auth/callback',
    scopes: ['Sites.Read.All', 'Sites.ReadWrite.All', 'Files.ReadWrite.All'],
  }
};

export default sharepointConfig; 