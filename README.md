# Musikteori Videos

Ett Remotion-projekt för att skapa en konsekvent videoserie om musikteori. Alla videor delar gemensamma komponenter och visuell stil för en professionell och enhetlig upplevelse.

## Projektets syfte

Detta projekt är byggt för att producera en serie utbildningsvideor om musikteori med:
- **Konsekvent visuell identitet** - Samma intro, outro, typografi och färgschema i alla videor
- **Återanvändbara komponenter** - Pianotangenter, notsystem, animationer etc. som kan användas i flera videor
- **Skalbar struktur** - Lätt att lägga till nya videor utan att duplicera kod
- **Professionell produktion** - Programmatisk kontroll över timing, animationer och övergångar

## Mappstruktur

```
musikteori-videos/
│
├── src/
│   ├── videos/              # Individuella videor
│   │   ├── 01-VideoNamn/    # Varje video i sin egen mapp
│   │   │   └── index.tsx    # Videokomposition
│   │   ├── 02-VideoNamn/
│   │   └── ...
│   │
│   ├── components/          # Återanvändbara komponenter
│   │   ├── Intro.tsx        # Standardintro för alla videor
│   │   ├── Outro.tsx        # Standardoutro med credits
│   │   ├── PianoKeys.tsx    # Animerade pianotangenter
│   │   ├── StaffNotation.tsx # Notsystem för att visa noter
│   │   ├── TextAnimation.tsx # Textanimationer (fade, slide, etc.)
│   │   └── ...
│   │
│   ├── Root.tsx             # Remotion root (registrerar alla videos)
│   ├── Composition.tsx      # Första exempel-kompositionen
│   └── index.ts             # Entry point
│
├── public/
│   ├── audio/               # Voiceover och musikfiler
│   │   ├── 01-intro.mp3
│   │   ├── 02-main-content.mp3
│   │   └── background-music.mp3
│   │
│   ├── images/              # Grafik och bilder
│   │   ├── logo.png
│   │   ├── notes/           # Notsymboler
│   │   └── diagrams/        # Diagram och illustrationer
│   │
│   └── fonts/               # Custom typsnitt
│       ├── Heading-Font.ttf
│       └── Body-Font.ttf
│
├── remotion.config.ts       # Remotion konfiguration
├── package.json
└── README.md
```

### Varför denna struktur?

**`src/videos/` - Numrerade undermappar**
- Varje video får sin egen mapp med tydlig numrering (01-, 02-, etc.)
- Gör det enkelt att hitta och organisera videor i serien
- Underlättar versionskontroll och samarbete

**`src/components/` - Återanvändbara komponenter**
- Delade visuella element undviker kod-duplicering
- Ändringar i en komponent påverkar alla videor automatiskt
- Skapar konsekvent utseende genom hela serien

**`public/` - Mediaresurser**
- Separata mappar för olika typer av assets
- Enkelt att hantera och organisera stora filer
- Tydlig struktur för voiceovers, musik, grafik och typsnitt

## Workflow: Lägga till en ny video

### Steg 1: Skapa video-mappen

```bash
mkdir src/videos/03-DinaNya VideoTitel
```

Använd alltid numrering (01-, 02-, 03-) för att hålla ordning på videoserien.

### Steg 2: Skapa videokomponenten

Skapa `src/videos/03-DinaNyaVideoTitel/index.tsx`:

```tsx
import { AbsoluteFill, Audio, Sequence } from 'remotion';
import { Intro } from '../../components/Intro';
import { Outro } from '../../components/Outro';

export const DinaNyaVideoTitel: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Intro (0-3 sekunder) */}
      <Sequence from={0} durationInFrames={90}>
        <Intro title="Din Nya Video Titel" />
      </Sequence>

      {/* Huvudinnehåll (3-27 sekunder) */}
      <Sequence from={90} durationInFrames={720}>
        <AbsoluteFill className="bg-white items-center justify-center">
          {/* Ditt innehåll här */}
        </AbsoluteFill>
      </Sequence>

      {/* Outro (27-30 sekunder) */}
      <Sequence from={810} durationInFrames={90}>
        <Outro />
      </Sequence>

      {/* Audio */}
      <Audio src="/audio/03-din-nya-video.mp3" />
    </AbsoluteFill>
  );
};
```

### Steg 3: Registrera i Root.tsx

Lägg till din nya video i [Root.tsx](src/Root.tsx):

```tsx
import { DinaNyaVideoTitel } from './videos/03-DinaNyaVideoTitel';

// ...

<Composition
  id="03-DinaNyaVideoTitel"
  component={DinaNyaVideoTitel}
  durationInFrames={900} // 30 sekunder @ 30fps
  fps={30}
  width={1920}
  height={1080}
/>
```

### Steg 4: Testa i preview

```bash
npm run dev
```

Öppna Remotion Studio i din webbläsare och välj din nya video från listan.

### Steg 5: Rendera videon

```bash
npx remotion render 03-DinaNyaVideoTitel output/03-din-nya-video.mp4
```

## Återanvända komponenter

### Intro och Outro

Alla videor bör börja och sluta med standardkomponenter för en konsekvent upplevelse:

```tsx
import { Intro } from '../../components/Intro';
import { Outro } from '../../components/Outro';

<Sequence from={0} durationInFrames={90}>
  <Intro title="Min Video Titel" subtitle="Del 5 av Musikteori-serien" />
</Sequence>

<Sequence from={810} durationInFrames={90}>
  <Outro />
</Sequence>
```

### Pianotangenter

För att visa ackord och skalor:

```tsx
import { PianoKeys } from '../../components/PianoKeys';

<PianoKeys
  highlightedKeys={['C', 'E', 'G']} // C-dur ackord
  startKey="C3"
  endKey="C5"
  frame={frame}
/>
```

### Notsystem

För att visa noter på ett notsystem:

```tsx
import { StaffNotation } from '../../components/StaffNotation';

<StaffNotation
  notes={[
    { pitch: 'C4', duration: 'quarter' },
    { pitch: 'E4', duration: 'quarter' },
    { pitch: 'G4', duration: 'half' },
  ]}
  clef="treble"
/>
```

### Textanimationer

För animerad text med olika effekter:

```tsx
import { TextAnimation } from '../../components/TextAnimation';

<TextAnimation
  text="Detta är en viktig punkt!"
  animation="fadeIn" // eller "slideIn", "scale", etc.
  delay={30}
  duration={60}
/>
```

## Remotion-kommandon

**Installera dependencies**

```bash
npm install
```

**Starta preview**

```bash
npm run dev
```

**Rendera en specifik video**

```bash
npx remotion render <composition-id> <output-path>
```

Exempel:
```bash
npx remotion render 01-Introduction output/01-introduction.mp4
```

**Rendera alla videor**

```bash
npx remotion render --sequence
```

**Uppgradera Remotion**

```bash
npm run upgrade
```

## Tips och best practices

### Timing och frames

- **30 FPS** är standard för de flesta videor
- 1 sekund = 30 frames
- 3 sekunder = 90 frames
- Använd alltid `Sequence` för att kontrollera timing

### Audio-synkning

- Placera voiceover-filer i [public/audio/](public/audio/)
- Namnge dem enligt video-nummer: `01-introduction.mp3`, `02-scales.mp3`
- Använd `<Audio src="/audio/XX-video.mp3" />` i kompositionen
- Testa synkning noggrant i preview

### Konsekvent styling

- Använd Tailwind CSS för styling (redan konfigurerat)
- Definiera färgschema i en central fil/config
- Återanvänd typografi-stilar från komponenter

### Performance

- Optimera stora bilder innan du lägger dem i [public/images/](public/images/)
- Använd komprimerade ljudfiler (MP3 istället för WAV)
- Testa rendering-hastighet regelbundet

### Versionskontroll

- Committa nya videor när de är klara
- Använd tydliga commit-meddelanden: "Add video 03: Scales and modes"
- Tagga releases när en video publiceras

## Resurser

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion Discord](https://discord.gg/6VzzNDwUwV)
- [React Documentation](https://react.dev)

## Licens

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
