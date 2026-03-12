const config = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['./src/styles/custom-media.css']
    },
    'postcss-custom-media': {}
  }
};

export default config;
