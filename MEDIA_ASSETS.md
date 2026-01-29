# Hantering av mediaresurser

Detta dokument förklarar hur stora mediaresurser hanteras i projektet.

## Git-strategi

### Vad som ÄR i git
- ✅ Källkod (alla `.tsx`, `.ts`, `.css` filer)
- ✅ Konfigurationsfiler (`package.json`, `remotion.config.ts`, etc.)
- ✅ Små assets som logotyper och ikoner (< 1 MB)
- ✅ README och dokumentation
- ✅ Kompilerade typsnittsfiler (`.ttf`, `.woff`)

### Vad som INTE är i git
- ❌ Renderingsoutput (färdiga videor i `output/`)
- ❌ Stora audio-filer (voiceovers, bakgrundsmusik)
- ❌ Stora bilder och PSD-filer
- ❌ Temporära filer och cache
- ❌ node_modules

## Strategier för stora mediaresurser

### Alternativ 1: Git LFS (Rekommenderat för mindre teams)

Git Large File Storage låter dig versionhantera stora filer utan att ladda ner dem varje gång.

**Installation:**
```bash
# Installera Git LFS
brew install git-lfs  # macOS
# eller: apt-get install git-lfs  # Linux

# Aktivera i ditt repo
git lfs install

# Konfigurera vilka filer som ska användas med LFS
git lfs track "public/audio/*.mp3"
git lfs track "public/audio/*.wav"
git lfs track "public/images/**/*.png"
git lfs track "public/images/**/*.jpg"

# Committa .gitattributes (skapas automatiskt)
git add .gitattributes
git commit -m "Add Git LFS tracking"
```

**Fördelar:**
- Mediaresurser är versionshanterade
- Teammedlemmar kan klona projektet och få alla assets
- Fungerar med GitHub/GitLab/Bitbucket

**Nackdelar:**
- Kostar pengar för stora mängder data (GitHub LFS: 1GB gratis, sedan $5/50GB/månad)
- Kan bli dyrt för många stora videofiler

### Alternativ 2: Extern lagring (Rekommenderat för stora projekt)

Förvara stora assets utanför git i molnlagring.

**Setup:**
```bash
# Skapa en mapp för externa assets
# Exempel: Dropbox, Google Drive, iCloud Drive

# Skapa en länkfil som pekar till var assets finns
echo "/Users/dittnamn/Dropbox/musikteori-assets" > .media-location
```

**I projektet:**
- Skapa en `public/audio/README.md` som förklarar var filerna finns
- Använd symboliska länkar eller kopiera filer lokalt när du behöver dem
- Dokumentera filnamn och struktur i git

**Fördelar:**
- Ingen kostnad (om du redan har molnlagring)
- Enkelt att dela stora filer
- Inget begränsat quota

**Nackdelar:**
- Inga versionshanterade mediaresurser
- Teammedlemmar måste manuellt synka assets

### Alternativ 3: Hybrid-approach (Bäst för soloprojekt)

**För små/viktiga assets:**
- Committa direkt i git (t.ex. intro-musik, logotyper)

**För stora/temporära assets:**
- Ignorera i git
- Förvara lokalt eller i molnet
- Dokumentera var de finns

## Rekommenderad struktur

```
musikteori-videos/
│
├── public/
│   ├── audio/
│   │   ├── README.md          # Förklaring: "Voiceovers finns i Dropbox..."
│   │   ├── intro-music.mp3    # Liten fil, OK att committa
│   │   └── .gitkeep           # Behåll mappen tom i git
│   │
│   ├── images/
│   │   ├── logo.png           # Liten fil, OK att committa
│   │   ├── icons/             # Små ikoner, OK att committa
│   │   └── README.md          # Förklaring var stora bilder finns
│   │
│   └── fonts/
│       └── *.ttf              # Typsnitt är OK att committa
│
└── output/                    # Ignoreras i git
    ├── 01-introduction.mp4
    └── 02-scales.mp4
```

## Workflow

### När du lägger till en ny video

1. **Källkod**: Committa alltid `.tsx` filer i `src/videos/`
2. **Audio**:
   - Om < 10 MB och nödvändig: Committa eller använd Git LFS
   - Om > 10 MB: Förvara externt och dokumentera
3. **Bilder**:
   - Små ikoner/logotyper: Committa direkt
   - Stora bilder: Använd Git LFS eller extern lagring
4. **Renderingsoutput**: Ladda upp till YouTube/Vimeo, arkivera lokalt

### När du delar projektet

**Med Git LFS:**
```bash
git clone <repo-url>
git lfs pull  # Hämta alla LFS-filer
npm install
```

**Med extern lagring:**
```bash
git clone <repo-url>
npm install
# Ladda ner assets från Dropbox/Drive enligt instruktioner i README
```

## Tips

### Reducera filstorlekar

**Audio:**
- Använd MP3 istället för WAV (10x mindre)
- Komprimera med 128-192 kbps för voiceovers (tillräckligt bra kvalitet)
- Bakgrundsmusik kan vara 96 kbps

**Bilder:**
- Optimera PNG-filer med `pngquant` eller `imageoptim`
- Använd JPEG för foton (kvalitet 80-85%)
- Spara arbets-PSD-filer externt, exportera PNG/JPG för projektet

**Videor:**
- Rendera i optimerade format (H.264/H.265)
- Använd rimlig bitrate (8-12 Mbps för 1080p är ofta tillräckligt)

### Backup-strategi

Oavsett vilken strategi du använder, se till att ha backup:
- Git-repon pushas till GitHub/GitLab
- Mediaresurser i molnet (Dropbox, Drive, Backblaze)
- Färdiga videor arkiveras på extern disk eller molnet

## Snabbguide för soloprojekt

För ett enklare soloprojekt utan team:

```bash
# 1. Initiera git (om inte redan gjort)
git init
git add .
git commit -m "Initial commit"

# 2. Pusha till GitHub
git remote add origin <din-repo-url>
git push -u origin main

# 3. Förvara stora assets lokalt
# - public/audio/ - Bara lokalt, inte i git
# - output/ - Bara lokalt, inte i git

# 4. Backup färdiga videor
# - Ladda upp till YouTube som private/unlisted
# - Eller kopiera till extern disk/molnet
```

Det är allt! Håll källkoden i git, allt annat lokalt eller i molnet.
