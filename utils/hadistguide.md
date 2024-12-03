## base api = [text](https://api.myquran.com/v2/hadits)
## Available Collections

### 1. Arbain Nawawi (42 Hadiths)
| Endpoint | Description |
|----------|-------------|
| `/arbain/{number}` | Get hadith by number (1-42) |
| `/arbain/acak` | Get random hadith |
| `/arbain/semua` | Get all hadiths |

### 2. Bulughul Maram (1,597 Hadiths)
| Endpoint | Description |
|----------|-------------|
| `/bm/{number}` | Get hadith by number (1-1597) |
| `/bm/acak` | Get random hadith |

### 3. Nine Major Hadith Collections
| Collection | Total Hadiths | Slug |
|------------|---------------|------|
| Abu Dawud | 4,419 | abu-dawud |
| Ahmad | 4,305 | ahmad |
| Bukhari | 6,638 | bukhari |
| Darimi | 2,949 | darimi |
| Ibnu Majah | 4,285 | ibnu-majah |
| Malik | 1,587 | malik |
| Muslim | 4,930 | muslim |
| Nasai | 5,364 | nasai |
| Tirmidzi | 3,625 | tirmidzi |

#### Endpoints
| Endpoint | Description |
|----------|-------------|
| `/perawi` | Get list of all perawi |
| `/{slug}/{number}` | Get specific hadith by perawi |
| `/perawi/acak` | Get random hadith from any collection |

## Response Format

### App stucture
app/
├── (tabs)/
│   ├── index.tsx         # Keep home
│   ├── arbain.tsx        # Keep Arbain list
│   ├── bulughul.tsx      # Keep Bulughul list
│   ├── perawi.tsx        # Keep Perawi list
│   └── settings.tsx      # Keep settings
├── detail-hadist/
│   └── [id].tsx          # Shared detail view for Arbain & Bulughul
├── detail-hadist-perawi/
│   └── [slug]/
│       └── [id].tsx      # Perawi specific detail view
└── _layout.tsx

### Success Response
```json
{
  "status": true,
  "request": {
    "path": "/hadits/arbain/1"
  },
  "data": {
    "arab": "String - Arabic text",
    "indo": "String - Indonesian translation",
    "judul": "String - Title",
    "no": "String/Number - Hadith number"
  }
}

