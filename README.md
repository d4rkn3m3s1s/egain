# eGain SharePoint Integration

A modern UI interface for the eGain-SharePoint integration that allows users to authenticate, search, and interact with SharePoint content through eGain's system while respecting access permissions.

## Features

- **Authentication Portal**: Secure access with personal or organization-level permissions
- **Search Interface**: Intuitive search experience with real-time results
- **Admin Configuration Panel**: Complete control over indexing, permissions, and synchronization
- **Clean, Modern UI**: Designed with accessibility and usability in mind

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/egain-sharepoint-integration.git
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

The application will be available at `http://localhost:3000`.

## UI Components

### Authentication Portal

The authentication portal provides two options:
- **Authorize for myself** (Delegated access) - For individual user access
- **Authorize for my organization** (App-level access) - For administrators

### Search Interface

A clean, user-friendly search experience with:
- Prominent search bar with voice input option
- Real-time results with document previews
- Permission-aware content access

### Admin Configuration Panel

Comprehensive administration tools:
- Indexing settings and controls
- Permission mapping
- Sync scheduling
- Usage analytics

## Design Principles

- **Whitespace-oriented**: Generous spacing between elements for improved readability
- **Typography-focused**: Clear hierarchy with limited font sizes
- **Accessibility**: WCAG 2.1 AA compliant
- **Mobile-responsive**: Optimized for all device sizes

## Technologies Used

- React.js
- React Router
- TailwindCSS
- Axios for API calls

## License

This project is licensed under the MIT License. 