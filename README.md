# MR-Client - Medical Research Frontend

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)

This is the frontend application for the Medical Research platform, built with Angular. It connects to the [Medical Research Backend API](https://github.com/ByklinDev/medical-research.git) to provide a user interface for managing medical research data.

## Features

- User authentication and authorization
- Patient data management
- Research study tracking
- Data visualization
- Responsive design for various devices

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v22 or later recommended)
- npm (v11 or later) or yarn
- Angular CLI (v20 or later)
- Backend API server running (see [backend repository](https://github.com/ByklinDev/medical-research.git))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ByklinDev/MR-Client.git
cd MR-Client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Configuration

Create an environment file based on the template:
```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

Edit `src/environments/environment.ts` with your configuration:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // Your backend API URL
  // Add other environment-specific settings
};
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```bash
ng serve
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

```bash
ng build
```

For a production build:
```bash
ng build --configuration production
```

## Project Structure

```
src/
├── app/                     # Main application components
├── environments/            # Environment configurations

```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support or questions, please open an issue in the repository.

## Backend Repository

The backend API for this application can be found at:  
[https://github.com/ByklinDev/medical-research.git](https://github.com/ByklinDev/medical-research.git)
