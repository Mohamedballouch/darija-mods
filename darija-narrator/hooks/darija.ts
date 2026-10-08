// Darija b l-7rouf latiniya: 3 = ع, 7 = ح, 9 = ق, gh = غ, kh = خ, ch = ش

const short = (value: unknown, max = 50): string => {
  const s = String(value ?? '').replace(/\s+/g, ' ').trim()

  return s.length > max ? `${s.slice(0, max - 1)}…` : s
}

const base = (path: unknown): string => short(String(path ?? '').split('/').pop(), 40)

// The same call always gets the same phrase; different calls rotate through the variants.
const pick = (variants: readonly string[], seed: string): string => {
  let h = 0

  for (const c of seed) {
    h = (h * 31 + c.charCodeAt(0)) >>> 0
  }

  return variants[h % variants.length]!
}

export const narrate = (tool: string, input: Record<string, unknown>): string => {
  const seed = tool + JSON.stringify(input)

  switch (tool) {
    case 'Read': {
      const f = base(input.file_path)

      return pick(
        [
          `🔍 Kan9ra l-fichier ${f}`,
          `🔍 Khllini nchouf ach kayn f ${f}`,
          `🔍 Kandir chi tlla 3la ${f}`,
          `🔍 Kan-f7ess ${f}`,
        ],
        seed,
      )
    }
    case 'Edit':
    case 'MultiEdit': {
      const f = base(input.file_path)

      return pick(
        [`✏️ Kanbddel chwiya f ${f}`, `✏️ Kanssle7 ${f}`, `✏️ Kanzid lmsa f ${f}`, `✏️ Kan-reggel ${f}`],
        seed,
      )
    }
    case 'Write': {
      const f = base(input.file_path)

      return pick([`📝 Kanktb ${f}`, `📝 Kansayb fichier jdid: ${f}`, `📝 Kancriyi fichier jdid: ${f}`], seed)
    }
    case 'Bash': {
      const c = short(input.command)

      return pick(
        [
          `⚙️ Kandawer had l-commande: ${c}`,
          `⚙️ Kan-lanci ${c}`,
          `⚙️ Yallah n-jerreb: ${c}`,
          `⚙️ Kan-khddem ${c}`,
        ],
        seed,
      )
    }
    case 'Grep': {
      const p = short(input.pattern, 30)

      return pick(
        [
          `🕵️ Kan9elleb 3la "${p}" f l-code`,
          `🕵️ Fin mkhbbi "${p}"? Kan9elleb...`,
          `🕵️ Fin ghaber "${p}"? Kan-fttech...`,
        ],
        seed,
      )
    }
    case 'Glob': {
      const p = short(input.pattern, 30)

      return pick([`📂 Kan9elleb 3la l-fichiyat: ${p}`, `📂 Kan-fttech 3la l-fichiyat: ${p}`], seed)
    }
    case 'WebSearch': {
      const q = short(input.query)

      return pick(
        [`🌐 Kan9elleb f l-internet 3la: ${q}`, `🌐 Nsewlo Google: ${q}`, `🌐 Nchoufo Google ach kay9oul 3la: ${q}`],
        seed,
      )
    }
    case 'WebFetch': {
      const u = short(input.url)

      return pick([`🌐 Kanjib had s-saf7a: ${u}`, `🌐 Kan-ft7 had s-saf7a: ${u}`], seed)
    }
    case 'Task':
    case 'Agent':
      return pick(
        [
          `🤝 Kan3eyyet 3la wa7ed l-agent y3awnni`,
          `🤝 Jbt m3aya wa7ed s-sa7eb y3awnni`,
          `🤝 Jbt l-renforts y3awnouni`,
        ],
        seed,
      )
    case 'TodoWrite':
      return pick([`📋 Kanrettb l-lista d l-khdma`, `📋 Kan-reggel l-lista d l-khdma`], seed)
    default:
      return pick([`🛠️ Kankhddem ${tool}`, `🛠️ Yallah, nkhddem ${tool}`], seed)
  }
}

export const failed = (tool: string): string =>
  pick(
    [
      `❌ Ouups! ${tool} ma-khdemch, ghadi nchouf achnou w9e3`,
      `❌ Tra chi mochkil f ${tool}, mat9l9ch`,
      `❌ Wili! ${tool} ma-khdemch, ghadi n-reggel l-9diyya`,
    ],
    tool + Date.now(),
  )

export const done = (seconds: number, tools: number): string =>
  seconds < 60
    ? pick(
        [
          `✅ Safi, salina! F ${seconds} tanya, w dert ${tools} d l-khdmat`,
          `✅ Safi, salina f ramchat 3eyn! F ${seconds} tanya, w dert ${tools} d l-khdmat`,
        ],
        `${seconds}:${tools}`,
      )
    : `✅ Hamdoulillah, kmmlna! ${Math.round(seconds / 60)} d9i9a w ${tools} d l-khdmat`

// Picked by the prompt's text, so each prompt gets its own greeting.
export const started = (prompt: string): string =>
  pick(['Wakha, daba nchouf... 🤔', 'Wakha sidi, daba n-chouf... 🤔', 'Zid, ha ana m3ak... 🤔'], prompt)
