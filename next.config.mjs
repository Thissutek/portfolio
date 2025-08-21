/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable specific rules during build
    rules: {
      'react/no-unescaped-entities': 'off'
    }
  }
};

export default nextConfig;
