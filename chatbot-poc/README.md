# MiMo AI Chatbot — Proof of Concept

Chatbot berbasis web menggunakan **Xiaomi MiMo-V2.5-Pro** melalui OpenRouter API.

## Arsitektur

```
User → Vue.js Chat → POST /api/chat/stream → Laravel 11 → OpenRouter API → MiMo V2.5 Pro → SSE → Vue.js
```

## Setup Laravel 11

### 1. Tambahkan environment

Tambahkan ke `.env`:

```env
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here
OPENROUTER_MODEL=xiaomi/mimo-v2.5-pro
MIMO_SYSTEM_PROMPT=Anda adalah asisten AI yang membantu menjawab pertanyaan dengan ramah dan informatif. Jawab dalam Bahasa Indonesia.
```

### 2. Publish config

Simpan `config/mimo.php` ke `app/config/mimo.php`.

### 3. Copy Controller

Salin `ChatController.php` ke `app/Http/Controllers/ChatController.php`.

### 4. Register Routes

Tambahkan ke `routes/api.php`:

```php
use App\Http\Controllers\ChatController;

Route::post('/api/chat', [ChatController::class, 'send']);
Route::post('/api/chat/stream', [ChatController::class, 'stream']);
```

### 5. CORS (jika frontend terpisah)

Di `config/cors.php`, tambahkan domain frontend Anda ke `allowed_origins`.

## Setup Vue.js

### 1. Copy component

Salin `ChatWidget.vue` ke direktori components Vue.js Anda.

### 2. Gunakan component

```vue
<template>
  <ChatWidget />
</template>

<script setup>
import ChatWidget from './components/ChatWidget.vue'
</script>
```

## API Endpoints

### POST /api/chat (non-streaming)

Request:
```json
{
  "messages": [
    { "role": "user", "content": "Apa itu Laravel?" }
  ]
}
```

Response:
```json
{
  "error": false,
  "message": "Laravel adalah framework PHP...",
  "usage": { "prompt_tokens": 12, "completion_tokens": 24, "total_tokens": 36 }
}
```

### POST /api/chat/stream (streaming SSE)

Request sama seperti di atas.

Response: Server-Sent Events stream:
```
data: {"content":"Laravel"}
data: {"content":" adalah"}
data: {"content":" framework"}
data: [DONE]
```

## Model MiMo yang Tersedia

| Model | Deskripsi |
|---|---|
| `xiaomi/mimo-v2.5-pro` | Pro model, kualitas tinggi |
| `xiaomi/mimo-v2.5` | Standar |
| `xiaomi/mimo-v2.6-pro` | Latest pro |
| `xiaomi/mimo-v2.6-flash` | Cepat, biaya rendah |
| `xiaomi/mimo-v2-flash` | Flash model |
| `xiaomi/mimo-v2-omni` | Multimodal |

## Dokumentasi API

- OpenRouter: https://openrouter.ai/docs
- MiMo V2.5 Pro: https://openrouter.ai/xiaomi/mimo-v2.5-pro/llms.txt
- API Key: https://openrouter.ai/settings/keys