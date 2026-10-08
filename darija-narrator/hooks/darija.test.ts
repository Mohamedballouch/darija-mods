import { expect, test } from 'claude-code/testing'

import { done, failed, narrate, started } from './darija'

test('narrates a Read in Darija, naming the file', () => {
  const line = narrate('Read', { file_path: '/a/b/app.ts' })
  expect(line).toContain('app.ts')
  expect(line.startsWith('🔍')).toBe(true)
})

test('the same call always gets the same phrase', () => {
  expect(narrate('Bash', { command: 'npm test' })).toBe(narrate('Bash', { command: 'npm test' }))
})

test('truncates long Bash commands', () => {
  expect(narrate('Bash', { command: 'x'.repeat(200) }).length).toBeLessThan(90)
})

test('falls back for unknown tools, reports failure and completion', () => {
  expect(narrate('Foo', {})).toContain('Foo')
  expect(failed('Bash')).toContain('Bash')
  expect(done(5, 2)).toContain('5 tanya')
  expect(done(125, 9)).toContain('2 d9i9a')
})

test('the prompt greeting is one of the variants and stable per prompt', () => {
  const g = started('fix the login bug')
  expect(['Wakha, daba nchouf', 'Wakha sidi, daba n-chouf', 'Zid, ha ana m3ak'].some(v => g.startsWith(v))).toBe(true)
  expect(started('fix the login bug')).toBe(g)
})
