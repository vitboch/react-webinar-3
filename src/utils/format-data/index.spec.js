import formatDate from './index.js';

describe('formatData', () => {

  test('empty exclude', () => {
    expect(formatDate('2023-06-08T18:13:52.392Z')).toEqual('09 июня 2023 в 01:13');
  });
});
