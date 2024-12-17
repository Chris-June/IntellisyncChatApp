# Dashboard Data Layer Documentation

## Overview
This data layer is designed to facilitate the transition from mock data to real API data for the Dashboard components. The structure maintains existing mock data while providing a clear path for future API integration.

## Directory Structure
```
src/data/
├── services/          # API service layer
│   └── dashboardService.js
├── config/            # Configuration files
│   └── endpoints.js
├── types/             # Type definitions
│   └── dashboard.types.js
├── adapters/          # Data transformation layer
│   └── dashboardAdapter.js
└── hooks/             # React custom hooks
    └── useDashboardData.js
```

## Components Description

### 1. Services (`/services/dashboardService.js`)
- Purpose: Handles all API calls and data fetching logic
- Key Features:
  - Separate methods for student, teacher, and parent data
  - Error handling and logging
  - Promise-based async operations
- Usage Example:
```javascript
const studentData = await DashboardService.fetchStudentProgress(studentId);
```

### 2. Config (`/config/endpoints.js`)
- Purpose: Centralizes API endpoint configurations
- Features:
  - Environment-aware base URL
  - Organized endpoints by user type
  - Easy to modify for different environments
- Structure:
  - Student endpoints
  - Teacher endpoints
  - Parent endpoints
  - Common dashboard endpoints

### 3. Types (`/types/dashboard.types.js`)
- Purpose: Defines data structure types
- Categories:
  - StudentDataTypes
  - TeacherDataTypes
  - ParentDataTypes
  - DashboardDataTypes
- Helps maintain consistency across the application

### 4. Adapters (`/adapters/dashboardAdapter.js`)
- Purpose: Transforms API data to match current mock data structure
- Key Functions:
  - transformStudentData()
  - transformTeacherData()
  - transformParentData()
- Ensures smooth transition from mock to real data

### 5. Hooks (`/hooks/useDashboardData.js`)
- Purpose: Custom React hook for data fetching
- Features:
  - Loading state management
  - Error handling
  - Automatic data transformation
- Usage Example:
```javascript
const { data, loading, error } = useDashboardData('student', studentId);
```

## Integration Guide

### Current State
- Mock data is being used in:
  - Dashboard.jsx
  - StudentView.jsx
  - TeacherView.jsx
  - ParentView.jsx

### Future Integration Steps
1. Implement actual API endpoints
2. Update endpoint configurations
3. Complete adapter transformations
4. Replace mock data imports with useDashboardData hook

### Example Integration
```javascript
// Current implementation (using mock data)
const mockData = {...};

// Future implementation (using data layer)
const { data, loading, error } = useDashboardData(userType, userId);
```

## Error Handling
- Service layer catches and logs API errors
- Hook provides error state to components
- Adapters handle data transformation errors

## Type Safety
- Types are defined for all data structures
- Helps catch potential issues early
- Makes refactoring easier

## Performance Considerations
- Data fetching is optimized through hooks
- Caching can be implemented in service layer
- Transformations happen only when needed

## Security Notes
- API endpoints should be secured
- Environment variables used for sensitive data
- No credentials in code

## Testing
Future test files should be added:
- `__tests__/services/dashboardService.test.js`
- `__tests__/adapters/dashboardAdapter.test.js`
- `__tests__/hooks/useDashboardData.test.js`

## Contributing Guidelines
1. Don't modify existing mock data
2. Add new endpoints in endpoints.js
3. Update types when adding new data structures
4. Document all transformations in adapters
5. Add error handling for new features

## Next Steps
1. Implement actual API endpoints
2. Create database schema matching current data structure
3. Complete adapter transformations
4. Add comprehensive testing
5. Implement caching strategy
6. Add authentication/authorization
7. Create migration plan from mock to real data
