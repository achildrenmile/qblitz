# QBlitz

[![Featured on oeradio.at](https://img.shields.io/badge/Featured_on-oeradio.at-2563eb?style=flat-square)](https://oeradio.at/werkzeuge/) [![Live Demo](https://img.shields.io/badge/Live_Demo-qblitz.oeradio.at-16a34a?style=flat-square)](https://qblitz.oeradio.at) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> 🎙️ **Part of the [oeradio.at](https://oeradio.at/werkzeuge/) open source ham radio tool collection.**
> Browse all tools → [**oeradio.at/werkzeuge**](https://oeradio.at/werkzeuge/)

Q-Gruppen Schnelltrainer - A German-language web app for learning amateur radio Q-codes.

Part of the [OERadio](https://oeradio.at) open source toolset.

## Features

- **Multiple Training Modes**: Learn Q-codes through various interactive methods
- **Spaced Repetition**: Intelligent learning algorithm adapts to your progress
- **Gamification**: Points, streaks, combos, and achievements to keep you motivated
- **Offline Support**: Full PWA with service worker for offline use
- **Dark/Light Mode**: Toggle between themes for comfortable studying
- **Mobile-First Design**: Responsive UI optimized for phones and tablets
- **No External Dependencies**: System fonts, no tracking, privacy-friendly

## Training Modes

### Lernen (Learning)
Flashcard-style learning with spaced repetition. Cards are scheduled based on your performance:
- Level 0-5 progression system
- Intervals: immediate, 1 day, 3 days, 7 days, 14 days, 30 days
- Wrong answers reduce level by 2 and schedule immediate review

### Quiz
Multiple-choice questions with immediate feedback. Choose from different question types:
- Code to meaning (QTH → "Standort")
- Meaning to code ("Standort" → QTH)
- Question to code ("Was ist Ihr Standort?" → QTH)

### Blitz
Fast-paced timed training against the clock:
- Configurable time limits (30s, 60s, 90s, 120s)
- Combo multiplier for consecutive correct answers
- Highscore tracking

### Prüfung (Exam)
Exam simulation mode:
- Only exam-relevant Q-codes
- No hints or mnemonics
- 70% pass threshold
- Tracks passed exams

### Gegensätze (Opposites)
Train opposite Q-code pairs:
- QRM ↔ QRN (interference types)
- QRO ↔ QRP (power levels)
- QRS ↔ QRQ (speed requests)

### Nachschlagewerk (Reference)
Browse and search all Q-codes:
- Filter by category
- Filter by exam relevance
- View detailed information, examples, and mnemonics

## Q-Codes Database

Includes 40+ Q-codes across 8 categories:
- **Standort & Richtung**: QTH, QRA, QRB, QTE
- **Frequenz & Betrieb**: QRG, QRV, QRX, QRZ, QSO, QSY, QRT, QRL
- **Signalqualität**: QRK, QRS, QRQ, QSA, QSB
- **Störungen**: QRM, QRN
- **Technisch**: QRO, QRP, QRR
- **Nachrichten**: QSL, QSP, QTC, QRU
- **Zeit**: QTR
- **Verschiedenes**: Additional codes

Each Q-code includes:
- Question form ("Was ist Ihr Standort?")
- Answer form ("Mein Standort ist...")
- Short meaning
- Category classification
- Exam relevance flag
- Optional mnemonic (Eselsbrücke)
- Optional example
- Optional opposite code

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build**: Vite
- **PWA**: vite-plugin-pwa with Workbox
- **State**: LocalStorage persistence
- **Fonts**: System font stack (no external fonts)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker

### Basic Usage

```bash
# Build image
docker build -t qblitz .

# Run container
docker run -p 3000:80 qblitz
```

Then open http://localhost:3000

### Runtime Configuration

The app supports runtime configuration via environment variables for white-labeling:

```bash
docker run -p 3000:80 \
  -e PARENT_SITE_URL="https://example.com" \
  -e PARENT_SITE_LOGO="https://example.com/logo.png" \
  -e PARENT_SITE_NAME="Example" \
  qblitz
```

| Variable | Description |
|----------|-------------|
| `PARENT_SITE_URL` | Link target for logo and footer attribution |
| `PARENT_SITE_LOGO` | Logo image URL (displayed in header) |
| `PARENT_SITE_NAME` | Display name in footer ("Teil von {name} Tools") |

If no environment variables are set, the default `config.json` is used.

### Docker Compose

```yaml
version: '3.8'
services:
  qblitz:
    build: .
    ports:
      - "3000:80"
    environment:
      - PARENT_SITE_URL=https://oeradio.at
      - PARENT_SITE_LOGO=https://oeradio.at/logo.png
      - PARENT_SITE_NAME=OERadio
    restart: unless-stopped
```

## Project Structure

```
qblitz/
├── public/
│   ├── config.json          # Runtime configuration (can be overridden)
│   ├── manifest.json        # PWA manifest
│   └── icons/               # App icons
├── src/
│   ├── components/
│   │   ├── common/          # Shared UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Timer.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   ├── LevelIndicator.tsx
│   │   │   └── LegalModal.tsx
│   │   ├── blitz/           # Blitz mode components
│   │   ├── lern/            # Learning mode components
│   │   ├── quiz/            # Quiz mode components
│   │   ├── pruefung/        # Exam mode components
│   │   ├── gegensaetze/     # Opposites trainer
│   │   ├── nachschlagewerk/ # Reference browser
│   │   ├── statistik/       # Statistics & achievements
│   │   ├── StartBildschirm.tsx
│   │   └── Einstellungen.tsx
│   ├── data/
│   │   ├── qgruppen.ts      # Q-codes database
│   │   ├── erfolge.ts       # Achievements definitions
│   │   └── texte.ts         # German UI texts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── useLernfortschritt.ts  # Spaced repetition logic
│   │   ├── useSpielstand.ts       # Game state & achievements
│   │   ├── useTimer.ts
│   │   ├── useEinstellungen.ts    # User settings
│   │   └── useConfig.ts           # Runtime configuration
│   ├── utils/
│   │   ├── spacedRepetition.ts
│   │   └── punkte.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── Dockerfile
├── docker-compose.yml
├── docker-entrypoint.sh     # Runtime config generation
├── nginx.conf
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Spaced Repetition Algorithm

The learning mode uses a modified SM-2 algorithm:

| Level | Interval | Description |
|-------|----------|-------------|
| 0 | Immediate | New card |
| 1 | 1 day | First review |
| 2 | 3 days | Beginning retention |
| 3 | 7 days | Short-term memory |
| 4 | 14 days | Medium-term memory |
| 5 | 30 days | Long-term memory (mastered) |

**On correct answer**: Level increases by 1 (max 5)
**On wrong answer**: Level decreases by 2 (min 0), card scheduled for immediate review

## Achievements

27 achievements across categories:
- **Beginner**: First steps (first correct answer, first quiz, etc.)
- **Progress**: Learning milestones (10, 50, 100 Q-codes learned)
- **Streaks**: Consecutive day streaks (3, 7, 30 days)
- **Performance**: Accuracy and speed achievements
- **Mastery**: Completing all Q-codes, perfect scores
- **Rare**: Special achievements (night owl, early bird)

## Privacy

- **No tracking**: No analytics, no cookies, no external requests
- **Local storage only**: All data stays in your browser
- **System fonts**: No external font loading
- **Offline capable**: Works without internet after first load

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome for Android)

## License

MIT

## Contributing

Issues and pull requests welcome at [GitHub](https://github.com/achildrenmile/qblitz).

## Credits

Created for the amateur radio community by OE8YML.

73!
