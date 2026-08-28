# AEGIS Next-Gen Architecture Blueprint & Interactive Sandbox - Deployment Guide

This document outlines the deployment strategy for the **AEGIS Next-Gen Cyber Threat Intelligence Platform**. The current iteration includes an interactive frontend Sandbox (CTI 2.0 Roadmap, STIX 2.1 Attack Graph, Multi-SIEM Transpiler, Dark Web Leaks, and EPSS Calculator). 

## 1. Local Development & Sandbox Evaluation

To run the Next-Gen Sandbox locally for demonstration and architectural review:

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Development Server**:
   ```bash
   npm run dev
   ```
3. **Access the Sandbox**:
   Navigate to `http://localhost:3000` in your browser. Click the **"Next-Gen Blueprint"** button in the header or on the Overview Dashboard to enter the interactive sandbox.

---

## 2. Production Deployment (Frontend Application)

The current Next-Gen Sandbox is a client-side React application powered by Vite. It can be deployed as a static site or containerized.

### Option A: Static Site Deployment (Vercel, Netlify, AWS S3)
1. **Build the Application**:
   ```bash
   npm run build
   ```
   This will generate optimized static files in the `/dist` directory.
2. **Deploy**:
   Upload the contents of the `/dist` directory to your preferred static hosting provider (e.g., AWS S3 + CloudFront, Vercel, Netlify, or Google Cloud Storage).

### Option B: Containerized Deployment (Docker / Google Cloud Run)
For enterprise environments, package the application using Docker and an Nginx server.

1. **Create a `Dockerfile`** (if not already present):
   ```dockerfile
   # Build Stage
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build

   # Production Stage
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   # Copy custom nginx.conf if routing (e.g., React Router) is needed
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```
2. **Build and Run**:
   ```bash
   docker build -t aegis-next-gen .
   docker run -p 8080:80 aegis-next-gen
   ```

---

## 3. Transitioning from Sandbox to Production Backend (Phase 2)

The current Next-Gen features (Graph Engine, SIEM Transpiler, Dark Web Feeds, EPSS) utilize *in-memory mock data* (`src/data/nextGenRecommendationsData.ts`) for architectural demonstration. To deploy the full production-grade system, the following backend infrastructure must be provisioned:

### A. STIX 2.1 Graph Engine
- **Database**: Provision a Graph Database (e.g., Neo4j, Amazon Neptune, or ArangoDB) to store STIX 2.1 Objects and Relationships.
- **API**: Implement a GraphQL or REST backend to query sub-graphs dynamically.

### B. Dark Web & Ransomware Leaks
- **Ingestion**: Deploy headless Tor crawlers or integrate with commercial threat intelligence APIs (e.g., Recorded Future, Flashpoint).
- **Storage**: Store structured leak data in PostgreSQL or MongoDB.

### C. Predictive EPSS & CVE Velocity
- **Feeds**: Setup daily cron jobs to ingest:
  - FIRST EPSS API: `https://api.first.org/data/v1/epss`
  - CISA KEV JSON feed.
  - NIST NVD API for CVSS base scores.

### D. Multi-SIEM Transpiler
- **Backend Service**: Deploy the [SigmaHQ/sigma](https://github.com/SigmaHQ/sigma) Python toolchain or `sigmac` as a microservice (e.g., via AWS Lambda or Cloud Run) to handle real-time rule transpilation requests from the UI.

## 4. Environment Variables

Once backend services are deployed, create a `.env.production` file:

```env
VITE_GRAPH_API_URL=https://api.aegis-intel.internal/graph
VITE_DARKWEB_API_URL=https://api.aegis-intel.internal/darkweb
VITE_SIGMA_TRANSPILER_URL=https://api.aegis-intel.internal/sigma
VITE_EPSS_SYNC_ENDPOINT=https://api.aegis-intel.internal/epss
```
