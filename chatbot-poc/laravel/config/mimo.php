<?php

return [

    'openrouter' => [
        'api_key' => env('OPENROUTER_API_KEY'),
        'base_url' => 'https://openrouter.ai/api/v1',
        'model' => env('OPENROUTER_MODEL', 'xiaomi/mimo-v2.5-pro'),
        'system_prompt' => env('MIMO_SYSTEM_PROMPT', 'Anda adalah asisten AI yang membantu menjawab pertanyaan dengan ramah dan informatif.'),
    ],

];