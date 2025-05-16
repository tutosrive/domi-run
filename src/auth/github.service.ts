const GITHUB_CLIENT_ID = 'Ov23ctSjxOhL6EWTQbCb';
const REDIRECT_URI = 'http://localhost:5173/oauth/callback';

export function redirectToGitHubOAuth() {
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=read:user user:email`;
  window.location.href = url;
}
