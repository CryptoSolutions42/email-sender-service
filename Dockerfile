FROM node:18-alpine as build
# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json .

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:18

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/build ./build

EXPOSE 3004
CMD [ "npm", "run", "start:prod" ]