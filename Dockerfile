FROM node:lts-slim

COPY post-github-comment.js .

ENTRYPOINT [ "./post-github-comment.js" ]
