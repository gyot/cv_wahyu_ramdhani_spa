<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
header('X-Accel-Buffering: no');

$apiKey = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$apiBase = 'https://9router.gdoank.my.id/v1';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $apiBase . '/chat/completions',
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $input,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: ' . $apiKey,
    ],
    CURLOPT_RETURNTRANSFER => false,
    CURLOPT_HEADER => false,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 120,
    CURLOPT_WRITEFUNCTION => function($ch, $chunk) {
        echo $chunk;
        flush();
        if (ob_get_level() > 0) ob_flush();
        return strlen($chunk);
    },
]);

curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if (curl_error($ch)) {
    echo "data: " . json_encode(['error' => curl_error($ch)]) . "\n\n";
}
curl_close($ch);