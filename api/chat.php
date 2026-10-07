<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
header('X-Accel-Buffering: no');

$apiBase = 'https://9router.gdoank.my.id/v1';
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $apiBase . '/chat/completions',
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 120,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "data: " . json_encode(['error' => 'cURL: ' . $error]) . "\n\n";
    flush();
    exit;
}

if ($httpCode !== 200) {
    echo "data: " . json_encode(['error' => 'HTTP ' . $httpCode . ': ' . $response]) . "\n\n";
    flush();
    exit;
}

$json = json_decode($response, true);

if (isset($json['error'])) {
    echo "data: " . json_encode(['error' => is_string($json['error']) ? $json['error'] : ($json['error']['message'] ?? json_encode($json['error']))]) . "\n\n";
    flush();
    exit;
}

$content = $json['choices'][0]['message']['content'] ?? '';
if ($content) {
    echo "data: " . json_encode(['content' => $content]) . "\n\n";
} else {
    echo "data: " . json_encode(['content' => 'Respons kosong dari server. Response: ' . substr($response, 0, 300)]) . "\n\n";
}
echo "data: [DONE]\n\n";
flush();