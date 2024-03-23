# Pull latest official node image
FROM node:latest

# Set working directory
WORKDIR /var/www/app

# Add React app to working directory
ADD . .

# Install packages
RUN npm install react-scripts -g
RUN npm ci

# Start the React app
CMD ["npm", "start"]
