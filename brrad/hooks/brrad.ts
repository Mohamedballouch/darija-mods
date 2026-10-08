// Darija b l-7rouf latiniya: 3 = ع, 7 = ح, 9 = ق, gh = غ, kh = خ, ch = ش

// Nudge points as multiples of the first one: 90s → 90s, 4m, 8m, 15m.
const STEPS = [1, 2.67, 5.33, 10] as const

const NUDGES = [
  'Hadchi ghadi ytwl chwiya... khud lik pause w chi brrad d atay 🫖',
  'Atay wjed? Khwi lik kas tani, ana mazal khddam',
  'Rah hadi khdma kbira, sir tmchcha chwiya w rje3',
  'Ila kan 3ndek chi msemmen wla 7rcha, daba howa l-weqt 🥞',
] as const

// The nudge index due at `seconds`, given the first threshold; -1 before the first.
export const stepAt = (seconds: number, first: number): number => {
  let step = -1

  STEPS.forEach((k, i) => {
    if (seconds >= first * k) {
      step = i
    }
  })

  return step
}

export const nudge = (step: number): string => NUDGES[Math.min(step, NUDGES.length - 1)]!

const SLOW = /\b(npm|pnpm|yarn|bun)\s+(install|i|ci|run\s+build)\b|\bdocker\s+(build|compose\s+up)\b|\bcargo\s+(build|test)\b|\bgradlew?\s+build\b|\bmvn\s+(install|package)\b|\bpytest\b|\bgo\s+test\s+\.\/\.\.\.|\bpip\s+install\s+-r\b|\bmake\b(\s+-j\d*)?\s*$/

export const isSlow = (command: string): boolean => SLOW.test(command.trim())

export const heads = {
  build: 'Bda l-khdma t9ila... hada weqt atay, ma-tb9ach tsenna 🫖',
  agents: 'Jbt l-jma3a ykhdmou m3aya, ghadi ytwlo chwiya. Sir sawb atay 🫖',
} as const

export const teapot = (seconds: number): string => (seconds < 240 ? '🫖' : seconds < 600 ? '♨️' : '☕')

export const clock = (seconds: number): string => {
  const s = Math.max(0, Math.floor(seconds))

  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export const band = (seconds: number): string => `${teapot(seconds)} ${clock(seconds)}  l-brrad kaytbokh... 🫖`

export const back = (seconds: number, isError: boolean): string =>
  isError
    ? 'Rje3, kayn chi mochkil khassni rayek fih ⚠️'
    : seconds >= 600
      ? 'Salina! Atay brd? Machi mochkil, l-khdma t9adat ✅'
      : 'Rje3 a sa7bi! Salina, w l-brrad mazal skhoun ☕'

export const tally = (cups: number): string =>
  cups >= 5
    ? `Lyoum chrbti ${cups} d l-kissan d atay 😅 bzzaf 3la l-9lb`
    : `Lyoum chrbti ${cups} ${cups === 1 ? 'kas' : 'd l-kissan'} d atay`
