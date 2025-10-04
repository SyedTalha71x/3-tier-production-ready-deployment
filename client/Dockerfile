# --- Build Stage ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile
COPY . .

ARG VITE_API_BASE_URL
ARG VITE_STRIPE_PUBLIC_KEY
ARG VITE_PRODUCTION_API_URL
ARG VITE_NODE_ENV
RUN VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY \
    VITE_PRODUCTION_API_URL=$VITE_PRODUCTION_API_URL \
    VITE_NODE_ENV=$VITE_NODE_ENV \
    npm run build

# --- Production Stage ---
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
