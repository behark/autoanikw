// This script creates a .nojekyll file to prevent GitHub Pages from ignoring files
// that begin with underscore (_) and fixes other common GitHub Pages issues
const fs = require('fs');
const path = require('path');

// Directory where the static export is generated
const outDir = path.join(__dirname, '..', 'out');

// Create .nojekyll file to prevent GitHub Pages from ignoring files that begin with underscore
const nojekyllPath = path.join(outDir, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  console.log('Creating .nojekyll file...');
  fs.writeFileSync(nojekyllPath, '');
  console.log('.nojekyll file created successfully');
} else {
  console.log('.nojekyll file already exists');
}

// Create a basic 404.html page
const notFoundPath = path.join(outDir, '404.html');
if (!fs.existsSync(notFoundPath)) {
  console.log('Creating 404.html file...');
  const notFoundContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Not Found | AutoAni</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      padding: 20px;
      text-align: center;
      color: #333;
      background-color: #f8f9fa;
    }
    .container {
      max-width: 600px;
      padding: 40px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
      color: #666;
    }
    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
  <script>
    // Redirect to home page with correct basePath if needed
    window.onload = function() {
      // Check if we need to redirect to the correct base path
      const path = window.location.pathname;
      if (!path.startsWith('/autoaniw')) {
        window.location.href = '/autoaniw' + (path === '/' ? '' : path);
      }
    }
  </script>
</head>
<body>
  <div class="container">
    <h1>Page Not Found</h1>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <a href="/autoaniw">Return to HomePage</a>
  </div>
</body>
</html>
  `;
  fs.writeFileSync(notFoundPath, notFoundContent);
  console.log('404.html file created successfully');
} else {
  console.log('404.html file already exists');
}

console.log('GitHub Pages fixes applied successfully!');
