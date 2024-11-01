FROM node:18.14.0 as builds

# argument for copy sitemaps
ARG env

# Labels
LABEL Name="cb-web-discovery" \
    Version="1.0"

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-engines --network-timeout 600000

COPY . .
# RUN npm install
ENV NODE_ENV=production
RUN yarn build

### RUnning copy sitemaps ####
RUN echo $env
RUN if [ "$env" = "production" ]; then echo "#### Copy sitemap PROD ###" && cp /usr/src/app/sitemap-base.xml /usr/src/app/public/sitemap.xml && ls /usr/src/app/public/sitemap.xml; else echo "#### sitemap UAT ###"; fi

# FROM node:18.14.0

# WORKDIR /usr/src/app

# COPY --from=builds /app/package*.json ./
# COPY --from=builds /app/.next ./.next
# COPY --from=builds /app/public ./public
# COPY --from=builds /app/node_modules ./node_modules
# ENV NODE_ENV=production

# use alpine for last container
FROM node:18.14.0-alpine

WORKDIR /usr/src/app

## update apk and install ca-certificates for S3 upload
RUN apk add -U --no-cache ca-certificates tzdata

####### COPYING to DOCKER CONTAINER #######
### COPY timezone
ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ >/etc/timezone

#RUN apk add --no-cache nodejs

COPY --from=builds /usr/src/app .

# Service and Management ports
#EXPOSE 81/tcp 82/tcp

EXPOSE 3000
CMD [ "yarn", "run", "start" ]