import { expect, test } from 'claude-code/testing'

import { bar, level, line } from './zlafa'

test('bar fills proportionally and clamps', () => {
  expect(bar(50, 10)).toBe('█████░░░░░')
  expect(bar(150, 4)).toBe('████')
  expect(bar(-5, 4)).toBe('░░░░')
})

test('levels cross at 50, 80, 95', () => {
  expect([0, 49, 50, 79, 80, 94, 95, 100].map(level)).toEqual([0, 0, 1, 1, 2, 2, 3, 3])
})

test('line warns near the limit', () => {
  expect(line(96)).toContain('/compact')
})
