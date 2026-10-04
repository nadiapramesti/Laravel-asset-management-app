<?php

use App\Http\Controllers\AssetController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::resource('assets', AssetController::class)->except(['show']);
