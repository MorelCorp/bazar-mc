module.exports = {
    transform: {
        '^.+\\.svelte$': 'svelte-jester',
        '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions: ['js', 'ts', 'svelte'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.cjs'],
    testEnvironment: 'jest-environment-jsdom'
};
