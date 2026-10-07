<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$apiBase = 'http://localhost:20128/v1';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$apiKey = $data['api_key'] ?? '';
unset($data['api_key']);

$headers = ['Content-Type: application/json'];
if ($apiKey) {
    $headers[] = 'Authorization: Bearer ' . $apiKey;
}

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => $apiBase . '/chat/completions',
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($data),
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 120,
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
    echo json_encode(['error' => true, 'message' => 'HTTP ' . $httpCode . ': ' . ($json['error']['message'] ?? substr($response, 0, 500))]);
    exit;
}

if (isset($json['error'])) {
    echo json_encode(['error' => true, 'message' => is_string($json['error']) ? $json['error'] : ($json['error']['message'] ?? json_encode($json['error']))]);
    exit;
}

$content = $json['choices'][0]['message']['content'] ?? '';
echo json_encode(['error' => false, 'message' => $content ?: 'Respons kosong. Raw: ' . substr($response, 0, 500)]);