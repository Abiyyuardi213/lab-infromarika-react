<?php

use App\Http\Controllers\JenisPraktikumController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PraktikumController;
use App\Http\Controllers\PraktikanController;

Route::get('/', function () {
    return Inertia::render('Home');
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->name('dashboard');

Route::get('/tables', function () {
    return Inertia::render('Dashboard/Tables');
})->name('tables');

Route::get('/profile', function () {
    return Inertia::render('Dashboard/Profile');
})->name('profile');

Route::resource('/post', PostController::class);

Route::resource('/role', RoleController::class);
//praktikum route
Route::resource('/praktikum', PraktikumController::class);
Route::resource('/kategori-praktikum', JenisPraktikumController::class);
Route::resource('/praktikan', PraktikanController::class);
