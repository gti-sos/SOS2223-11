module.exports = {
    coverageReporters: ['json-summary', 'text', 'lcov', 'clover', 'cobertura', 'html'],
    transform: {
      "^.+\\.js$": "babel-jest"
    }
  };