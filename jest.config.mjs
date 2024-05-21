export default {
    transform: {
        '^.+\\.svelte$': 'svelte-jester',
        '^.+\\.ts$': ['ts-jest', { 
            tsconfig: 'tsconfig.json',
            useESM: true 
        }],
        '^.+\\.js$': 'babel-jest'
    },
    extensionsToTreatAsEsm: ['.ts', '.svelte'],
    moduleFileExtensions: ['js', 'ts', 'svelte'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [
        '/node_modules/(?!svelte|@testing-library/svelte|svelte-local-storage-store)'
    ],
    moduleNameMapper: {
        '^svelte$': 'svelte/internal'
    }
};
