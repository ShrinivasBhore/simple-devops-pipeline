# System Architecture

## Overview
The DevOps CI/CD Web Application follows a microservices-lite architecture, containerized with Docker and orchestrated via Docker Compose.

## Components
1. **Frontend**: Static HTML/CSS/JS served via Nginx.
2. **Backend**: Node.js/Express API handling business logic.
3. **Database**: MongoDB for persistent storage.
4. **CI/CD**: GitHub Actions for automated testing and deployment.

## Data Flow
User -> Frontend -> Backend API -> MongoDB
