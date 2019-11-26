const weight = require('./weight');

test('Returns string', () => {
    expect(weight("text")).toBe("text");
});