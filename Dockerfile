# syntax=docker/dockerfile:1
FROM node:18.12.1-alpine

# Copy application
RUN mkdir /app/
WORKDIR /app/
COPY . .

# Install dependencies
RUN yarn --production --frozen-lockfile

# Run build
RUN yarn build

# App binds to port 3000 so we'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Run actual app
CMD ["yarn", "start"]
