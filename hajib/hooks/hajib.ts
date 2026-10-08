export type Verdict = { verdict: 'ask' | 'deny'; reason: string }

const DENY: [RegExp, string][] = [
  [/\brm\s+(-\w+\s+)+(\/|\/\*|~|\$HOME)(\s|$)/, 'Wqef 3ndek! Had l-commande ghadi tmse7 kolchi f l-machine'],
  [/\bmkfs(\.\w+)?\b/, 'Wqef 3ndek! Had l-commande ghadi tformati l-disque'],
  [/\bdd\b[^|;]*\bof=\/dev\//, 'Wqef 3ndek! Had l-commande ghadi tktb fo9 l-disque kaml'],
  [/:\(\)\s*\{\s*:\|:&\s*\};:/, 'Wqef 3ndek! Hadi fork bomb, ghadi t7bs l-machine'],
]

const ASK: [RegExp, string][] = [
  [/\brm\s+(-\w+\s+)*-\w*[rR]/, 'Had l-commande ghadi tmse7 dossiers kamlin. N-khllih ydouz?'],
  [/\bgit\s+push\b[^|;]*(--force\b|--force-with-lease\b|\s-f\b)/, 'Force push! Ghadi ybddel l-historique li f remote. N-khllih ydouz?'],
  [/\bgit\s+reset\s+--hard\b/, 'git reset --hard ghadi ydiyye3 ga3 l-ta3dilat li ma-tcommitawch. N-khllih ydouz?'],
  [/\bgit\s+clean\s+-\w*f/, 'git clean ghadi yms7 l-fichiyat li ma-m-trackyinch. N-khllih ydouz?'],
  [/\bsudo\b/, 'Claude bgha ykhddem sudo b sla7iyat l-admin. N-khllih ydouz?'],
  [/(curl|wget)\b[^|;]*\|\s*(sudo\s+)?(ba|z)?sh\b/, 'Script jay mn l-internet w ghadi ytlan9 direct. N-khllih ydouz?'],
  [/\bdrop\s+(table|database)\b/i, 'DROP: ghadi ytms7ou tables wla base de données kamla. N-khllih ydouz?'],
  [/\bchmod\s+(-\w+\s+)*777\b/, 'chmod 777 kay3ti l-ga3 l-7e9 ybddlou l-fichiyat. N-khllih ydouz?'],
  [/\b(npm|pnpm|yarn)\s+publish\b/, 'Ghadi ytnchr l-package l-l-3alam kaml. N-khllih ydouz?'],
]

const SECRET = /(^|\/)(\.env(\.[\w.]+)?|id_rsa|id_ed25519|credentials|\.npmrc)$|\/\.ssh\//

export const classify = (tool: string, input: unknown): Verdict | null => {
  const args = (input ?? {}) as Record<string, unknown>

  if (tool === 'Bash') {
    const command = String(args.command ?? '')

    for (const [re, reason] of DENY) {
      if (re.test(command)) {
        return { verdict: 'deny', reason: `🚫 ${reason}` }
      }
    }

    for (const [re, reason] of ASK) {
      if (re.test(command)) {
        return { verdict: 'ask', reason: `🛑 ${reason}` }
      }
    }

    return null
  }

  if (tool === 'Edit' || tool === 'Write' || tool === 'MultiEdit') {
    return SECRET.test(String(args.file_path ?? ''))
      ? { verdict: 'ask', reason: '🔐 Had l-fichier fih l-asrar (secrets). N-khllih ybddel fih?' }
      : null
  }

  return null
}
