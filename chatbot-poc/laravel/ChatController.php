<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ChatController extends Controller
{
    private string $apiKey;
    private string $baseUrl;
    private string $model;
    private string $systemPrompt;

    public function __construct()
    {
        $this->apiKey = config('mimo.openrouter.api_key');
        $this->baseUrl = config('mimo.openrouter.base_url');
        $this->model = config('mimo.openrouter.model');
        $this->systemPrompt = config('mimo.openrouter.system_prompt');
    }

    public function send(Request $request): JsonResponse
    {
        $request->validate([
            'messages' => 'required|array|min:1',
            'messages.*.role' => 'required|in:user,assistant',
            'messages.*.content' => 'required|string|max:4000',
        ]);

        $messages = array_merge(
            [['role' => 'system', 'content' => $this->systemPrompt]],
            $request->input('messages')
        );

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$this->apiKey}",
                'Content-Type' => 'application/json',
                'HTTP-Referer' => url('/'),
                'X-Title' => 'MiMo Chatbot',
            ])->timeout(60)->post("{$this->baseUrl}/chat/completions", [
                'model' => $this->model,
                'messages' => $messages,
                'temperature' => 0.7,
                'max_tokens' => 2048,
            ]);

            if ($response->failed()) {
                Log::error('MiMo API Error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);

                return response()->json([
                    'error' => true,
                    'message' => 'Gagal mendapatkan respons dari AI. Silakan coba lagi.',
                ], $response->status());
            }

            $data = $response->json();

            return response()->json([
                'error' => false,
                'message' => $data['choices'][0]['message']['content'] ?? 'Tidak ada respons.',
                'usage' => $data['usage'] ?? null,
            ]);

        } catch (\Exception $e) {
            Log::error('MiMo API Exception', ['message' => $e->getMessage()]);

            return response()->json([
                'error' => true,
                'message' => 'Terjadi kesalahan server. Silakan coba lagi.',
            ], 500);
        }
    }

    public function stream(Request $request): StreamedResponse
    {
        $request->validate([
            'messages' => 'required|array|min:1',
            'messages.*.role' => 'required|in:user,assistant',
            'messages.*.content' => 'required|string|max:4000',
        ]);

        $messages = array_merge(
            [['role' => 'system', 'content' => $this->systemPrompt]],
            $request->input('messages')
        );

        return response()->stream(function () use ($messages) {
            try {
                $response = Http::withHeaders([
                    'Authorization' => "Bearer {$this->apiKey}",
                    'Content-Type' => 'application/json',
                    'HTTP-Referer' => url('/'),
                    'X-Title' => 'MiMo Chatbot',
                ])->timeout(120)->post("{$this->baseUrl}/chat/completions", [
                    'model' => $this->model,
                    'messages' => $messages,
                    'temperature' => 0.7,
                    'max_tokens' => 2048,
                    'stream' => true,
                ]);

                $body = $response->body();
                $lines = explode("\n", $body);

                foreach ($lines as $line) {
                    $line = trim($line);
                    if (empty($line) || !str_starts_with($line, 'data: ')) {
                        continue;
                    }

                    $data = substr($line, 6);
                    if ($data === '[DONE]') {
                        echo "data: [DONE]\n\n";
                        break;
                    }

                    $json = json_decode($data, true);
                    $content = $json['choices'][0]['delta']['content'] ?? '';

                    if (!empty($content)) {
                        echo "data: " . json_encode(['content' => $content]) . "\n\n";
                        if (ob_get_level() > 0) {
                            ob_flush();
                        }
                        flush();
                    }
                }
            } catch (\Exception $e) {
                Log::error('MiMo Stream Error', ['message' => $e->getMessage()]);
                echo "data: " . json_encode(['error' => 'Stream error']) . "\n\n";
                if (ob_get_level() > 0) {
                    ob_flush();
                }
                flush();
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no',
        ]);
    }
}