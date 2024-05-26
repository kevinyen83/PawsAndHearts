module.exports = {
  Map: jest.fn(() => ({
    on: jest.fn(),
    remove: jest.fn(),
  })),
};
