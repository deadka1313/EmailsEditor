module.exports = {
    roots: ['<rootDir>/'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.ts',
        '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    },
};
