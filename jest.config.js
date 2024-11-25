export default {
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: {
                  VITE_API_BASE_URL: "http://localhost:5000/api",
                },
              },
            },
          ],
        },
      },
    ],
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
};
