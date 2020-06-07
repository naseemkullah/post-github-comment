#! /usr/bin/env node

const fs = require("fs");
const https = require('https');

fs.readFile(process.stdin.fd, "utf8", (err, data) => {
  if (err) throw err;

  const postData = (JSON.stringify({ body: data }));

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: `/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues/${process.env.GITHUB_PULL_NUMBER}/comments`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length,
      'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      'User-Agent': `${process.env.GITHUB_OWNER}-post-github-comment`
    }
  };

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.write(postData);
  req.end();
})
