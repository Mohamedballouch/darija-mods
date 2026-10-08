# Darija phrases

Every Darija phrase in the four mods, with the file and line it lives on.

## Before you edit

- Keep anything in `${…}` exactly as it is: it is filled in live.
  - `${f}` is a file name, `${c}` a command, `${p}` a search pattern, `${tool}` a tool name.
  - `${seconds}`, `${tools}` and `${cups}` are numbers.
- Emojis are optional.
- Where a row lists several phrases separated by `/`, the mod picks one of them each time. Add or remove options freely.
- Spelling: `3` = ع · `7` = ح · `9` = ق · `gh` = غ · `kh` = خ · `ch` = ش
- After editing, run the tests for that mod: some check for specific words (`tanya`, `d9i9a`, `/compact`, `brrad d atay`, `Rje3`, `mochkil`, `brd`, `kas`, `d l-kissan`, `bzzaf`, and the three greetings).

```bash
claude plugin test ./brrad
```

## darija-narrator

File: `darija-narrator/hooks/darija.ts`

| Lines | When | Phrases |
|---|---|---|
| 31–34 | Reading a file | `Kan9ra l-fichier ${f}` / `Khllini nchouf ach kayn f ${f}` / `Kandir chi tlla 3la ${f}` / `Kan-f7ess ${f}` |
| 44 | Editing a file | `Kanbddel chwiya f ${f}` / `Kanssle7 ${f}` / `Kanzid lmsa f ${f}` / `Kan-reggel ${f}` |
| 51 | Writing a new file | `Kanktb ${f}` / `Kansayb fichier jdid: ${f}` / `Kancriyi fichier jdid: ${f}` |
| 58–61 | Running a command | `Kandawer had l-commande: ${c}` / `Kan-lanci ${c}` / `Yallah n-jerreb: ${c}` / `Kan-khddem ${c}` |
| 71–73 | Searching in code | `Kan9elleb 3la "${p}" f l-code` / `Fin mkhbbi "${p}"? Kan9elleb...` / `Fin ghaber "${p}"? Kan-fttech...` |
| 81 | Finding files | `Kan9elleb 3la l-fichiyat: ${p}` / `Kan-fttech 3la l-fichiyat: ${p}` |
| 87 | Web search | `Kan9elleb f l-internet 3la: ${q}` / `Nsewlo Google: ${q}` / `Nchoufo Google ach kay9oul 3la: ${q}` |
| 94 | Opening a web page | `Kanjib had s-saf7a: ${u}` / `Kan-ft7 had s-saf7a: ${u}` |
| 100–102 | Starting a subagent | `Kan3eyyet 3la wa7ed l-agent y3awnni` / `Jbt m3aya wa7ed s-sa7eb y3awnni` / `Jbt l-renforts y3awnouni` |
| 107 | Updating the to-do list | `Kanrettb l-lista d l-khdma` / `Kan-reggel l-lista d l-khdma` |
| 109 | Any other tool | `Kankhddem ${tool}` / `Yallah, nkhddem ${tool}` |
| 116–118 | A tool failed | `Ouups! ${tool} ma-khdemch, ghadi nchouf achnou w9e3` / `Tra chi mochkil f ${tool}, mat9l9ch` / `Wili! ${tool} ma-khdemch, ghadi n-reggel l-9diyya` |
| 127–128 | Done, under a minute | `Safi, salina! F ${seconds} tanya, w dert ${tools} d l-khdmat` / `Safi, salina f ramchat 3eyn! F ${seconds} tanya, w dert ${tools} d l-khdmat` |
| 132 | Done, over a minute | `Hamdoulillah, kmmlna! … d9i9a w ${tools} d l-khdmat` |
| 136 | You sent a prompt | `Wakha, daba nchouf...` / `Wakha sidi, daba n-chouf...` / `Zid, ha ana m3ak...` |

`${q}` is a search query and `${u}` a web address.

## zlafa

File: `zlafa/hooks/zlafa.ts`

| Line | Context window | Phrase |
|---|---|---|
| 14 | Under 50% | `Zlafa mazal khawya, khddem 3la khatrek` |
| 15 | 50–79% | `Zlafa bdat kat3mer, walakin kolchi mazal mzyan` |
| 16 | 80–94% | `Zlafa 9rbat t3mer, red l-bal w fkker f /compact` |
| 17 | 95% and up | `Safi, ghadi tfid! Dir /compact daba serbi` |

## hajib

### Blocked outright

File: `hajib/hooks/hajib.ts`

| Line | Command | Phrase |
|---|---|---|
| 4 | `rm -rf` on `/` or `~` | `Wqef 3ndek! Had l-commande ghadi tmse7 kolchi f l-machine` |
| 5 | `mkfs` | `Wqef 3ndek! Had l-commande ghadi tformati l-disque` |
| 6 | `dd` to a disk | `Wqef 3ndek! Had l-commande ghadi tktb fo9 l-disque kaml` |
| 7 | Fork bomb | `Wqef 3ndek! Hadi fork bomb, ghadi t7bs l-machine` |

### Asks you first

File: `hajib/hooks/hajib.ts`

| Line | Command | Phrase |
|---|---|---|
| 11 | `rm -r` | `Had l-commande ghadi tmse7 dossiers kamlin. N-khllih ydouz?` |
| 12 | `git push --force` | `Force push! Ghadi ybddel l-historique li f remote. N-khllih ydouz?` |
| 13 | `git reset --hard` | `git reset --hard ghadi ydiyye3 ga3 l-ta3dilat li ma-tcommitawch. N-khllih ydouz?` |
| 14 | `git clean -f` | `git clean ghadi yms7 l-fichiyat li ma-m-trackyinch. N-khllih ydouz?` |
| 15 | `sudo` | `Claude bgha ykhddem sudo b sla7iyat l-admin. N-khllih ydouz?` |
| 16 | `curl … \| sh` | `Script jay mn l-internet w ghadi ytlan9 direct. N-khllih ydouz?` |
| 17 | `DROP TABLE` | `DROP: ghadi ytms7ou tables wla base de données kamla. N-khllih ydouz?` |
| 18 | `chmod 777` | `chmod 777 kay3ti l-ga3 l-7e9 ybddlou l-fichiyat. N-khllih ydouz?` |
| 19 | `npm publish` | `Ghadi ytnchr l-package l-l-3alam kaml. N-khllih ydouz?` |
| 47 | Editing `.env` or other secrets | `Had l-fichier fih l-asrar (secrets). N-khllih ybddel fih?` |

### Toasts

File: `hajib/hooks/register.ts`

| Line | When | Phrase |
|---|---|---|
| 14 | It blocks a command | `L-Hajib: l-bab msdoud, ma-kaynch douz 🛑` |
| 25 | It asks you first | `L-Hajib: tsenna chwiya, khassni rayek ✋` |

## brrad

File: `brrad/hooks/brrad.ts`

| Line | When | Phrase |
|---|---|---|
| 7 | After 1.5 min | `Hadchi ghadi ytwl chwiya... khud lik pause w chi brrad d atay` |
| 8 | After 4 min | `Atay wjed? Khwi lik kas tani, ana mazal khddam` |
| 9 | After 8 min | `Rah hadi khdma kbira, sir tmchcha chwiya w rje3` |
| 10 | After 15 min | `Ila kan 3ndek chi msemmen wla 7rcha, daba howa l-weqt` |
| 33 | Slow command starts | `Bda l-khdma t9ila... hada weqt atay, ma-tb9ach tsenna` |
| 34 | 2+ subagents start | `Jbt l-jma3a ykhdmou m3aya, ghadi ytwlo chwiya. Sir sawb atay` |
| 45 | The band itself | `l-brrad kaytbokh... 🫖` |
| 49 | Finished with an error | `Rje3, kayn chi mochkil khassni rayek fih` |
| 51 | Finished after 10+ min | `Salina! Atay brd? Machi mochkil, l-khdma t9adat` |
| 52 | Finished | `Rje3 a sa7bi! Salina, w l-brrad mazal skhoun` |
| 56 | 5+ teas today | `Lyoum chrbti ${cups} d l-kissan d atay 😅 bzzaf 3la l-9lb` |
| 57 | 1–4 teas today | `Lyoum chrbti ${cups} kas` (one) / `Lyoum chrbti ${cups} d l-kissan d atay` (more) |

## The hide button

`Khbbi`, in all three bands:

- `darija-narrator/hooks/register.tsx:77`
- `zlafa/hooks/register.tsx:63`
- `brrad/hooks/register.tsx:108`
