# post-github-comment

A lightweight script that reads from stdin and posts a GitHub comment.

## How it works

`post-github-comment` does not import any dependencies, as such, it runs easily in CI/CD systems using a [node docker image](https://hub.docker.com/_/node/).

The following environment variables are required:

- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_PULL_NUMBER`
- `GITHUB_TOKEN`

For more info, please refer to [GitHub's documentation](https://developer.github.com/v3/issues/comments/#create-an-issue-comment).
 

## Example Usage

The following snippet shows how `post-github-comment` can be used to post the contents of a previously generated file called `diff.yaml` in [Google Cloud Build pull request checks](https://cloud.google.com/cloud-build/docs/automating-builds/create-github-app-triggers).

Please bare in mind, `post-github-comment` can be used to post anything piped to it's stdin and in any CI/CD system that can run a step as a node container.


```yaml
  - name: "node:lts"
    id: "post-github-comment"
    entrypoint: "bash"
    args:
      - "-c"
      - |
        cat \
          <(echo Contents of diff:) \
          <(echo \`\`\`diff) \
          diff.yaml \
          <(echo \`\`\`) |
          ./post-github-comment.js
```
