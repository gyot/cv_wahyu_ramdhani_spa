<?php
header('Content-Type: application/json');

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
    echo json_encode(['error' => true, 'message' => 'cURL Error: ' . $error]);
    exit;
}

$json = json_decode($response, true);

if ($httpCode !== 200) {
    echo json_encode(['error' => true, 'message' => 'HTTP ' . $httpCode . ': ' . ($json['error']['message'] ?? $response)]);
    exit;
}

if (isset($json['error'])) {
    echo json_encode(['error' => true, 'message' => is_string($json['error']) ? $json['error'] : ($json['error']['message'] ?? json_encode($json['error']))]);
    exit;
}

$content = $json['choices'][0]['message']['content'] ?? '';
echo json_encode(['error' => false, 'message' => $content ?: 'Respons kosong. Raw: ' . substr($response, 0, 500)]);