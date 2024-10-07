# Overview

This repository contains the backend code for ASP.NET Core app and code for a React frontend in the ```./frontend``` directory.

## Development

**Setup React app**

Requires:
- Node.js version 18.18.2
- NPM version 9.8.1

1. Navigate to ```./frontend``` directory
2. Copy the ```.env.example``` file and rename to ```.env```. Use the **http** URL of the backend service (instructions below).
3. Run ```npm i ```
4. Run ```npm run dev ```

React app is now served from the dev server.

**Setup ASP.NET Core**

Requires:
- .NET 8.0 SDK

1. Navigate to the root directory
2. Run ```dotnet watch```. This starts the backend app with hot reload feature (useful for development).

## Testing the production version

**Build React app**

1. Navigate to ```./frontend``` directory
2. Production app will be served from the backend, and the relative URL .env file is included in the project.
3. Run ```npm i ```
4. Run ```npm run build```

**Setup ASP.NET Core**

1. Navigate to the root directory
2. Run ```dotnet run --launch-profile https```

React app is now served from the root URL of the running backend service.
