# darija-mods 🇲🇦

Claude Code mods that speak **Moroccan Darija**, edged like a **zrabi** (Berber rug).

> Claude kaykhddem, w nta katchrb atay. 🫖

```
◇─◆─◇─◆─◇─◆─◇─◆─◇─◆─◇─◆─◇─◆─◇─◆─◇─◆─◇
  🫖 4:32  l-brrad kaytbokh... 🫖
  Atay wjed? Khwi lik kas tani, ana mazal khddam
◆─◇─◆─◇─◆─◇─◆─◇─◆─◇─◆─◇─◆─◇─◆ [Khbbi]
```

## Install

```bash
claude plugin marketplace add Mohamedballouch/darija-mods
claude plugin install darija-narrator@darija-mods
claude plugin install zlafa@darija-mods
claude plugin install hajib@darija-mods
claude plugin install brrad@darija-mods
```

Install all four, or only the ones you like.

## The mods

| Mod | What it does | Example |
|---|---|---|
| **darija-narrator** | Narrates every step Claude takes, live above the prompt | `🔍 Khllini nchouf ach kayn f app.ts` |
| **zlafa** (الزلافة) | A bowl that fills as the context window fills; warns at 80% and 95% | `🥣 [██████████░░] 82%  L-zlafa 9rbat t3mer, fkker f /compact` |
| **hajib** (الحاجب) | Blocks catastrophic commands (wiping `/`, formatting a disk…) and asks before risky ones (`git push --force`, `sudo`, `curl \| sh`, editing `.env`…) | `🛑 Force push! Ghadi ybddel l-historique li f remote. N-khllih ydouz?` |
| **brrad** (البراد) | When a task runs long, tells you to step away for tea; calls you back when it's done and counts your cups for the day | `Hadchi ghadi ytwl chwiya... khud lik pause w chi brrad d atay 🫖` |

Hajib only ever makes approvals *stricter*: it never auto-approves anything.

### Brrad settings

In the plugin config menu:

- **First tea nudge (seconds)**: default `90`; later nudges (4 min, 8 min, 15 min) scale from it
- **Quiet mode**: only the "come back, it's done" toast

## Spelling

Darija is written in Latin letters with the usual Arabizi numbers:
`3` = ع · `7` = ح · `9` = ق · `gh` = غ · `kh` = خ · `ch` = ش

## Look

Every band sits between two rows of rug fringe (`◇─◆─◇`) in terracotta `#B5452A`. The text keeps your terminal's own colours, so it reads the same on light and dark themes; only warnings turn red.

## Develop

Each mod is a folder with `.claude-plugin/plugin.json` and a hooks module under `hooks/`.

```bash
claude plugin validate ./brrad
claude plugin test ./brrad
claude --plugin-dir ./brrad
```

Better Darija wording is very welcome: the phrases live in `darija-narrator/hooks/darija.ts`, `zlafa/hooks/zlafa.ts`, `hajib/hooks/hajib.ts` and `brrad/hooks/brrad.ts`.

## License

MIT
