FROM node

WORKDIR /app

COPY . /app

#RUN npm install

ARG NODE_ENV
RUN if [ "${NODE_ENV}" = "development" ]; \
then npm install; \
else npm install --only=production; \
fi

#EXPOSE 3000
ENV PORT 3000
EXPOSE ${PORT}

CMD ["node", "index.js"]
#CMD ["nodemon", "index.js"]
#CMD ["npm", "start"]