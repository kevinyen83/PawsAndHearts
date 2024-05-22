import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '3gqqwm',
  e2e: {
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000/#/',
  },
});
