const string = require('./string');

test('Returns string', () => {
    expect(string("text")).toBe("text");
});