<?php

use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Route;

Route::post('/api/chat', [ChatController::class, 'send']);
Route::post('/api/chat/stream', [ChatController::class, 'stream']);