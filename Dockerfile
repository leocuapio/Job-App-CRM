# Give my worker a Linux env with Node.js 20 installed
FROM node:20

#Inide the container make /app the folder where our project will live and can run cmds
WORKDIR /app

#Copies package.json and package-lock.json into /app
COPY package*.json ./

#Insde the container install all packages (same as npm install) 
RUN npm ci

#Take everything in my project and coput it into /app inside the container
COPY . .

#Needs generated prisma client
RUN npx prisma generate

CMD ["npx", "tsx", "workers/resume-worker.ts"]