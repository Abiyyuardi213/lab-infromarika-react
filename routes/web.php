<?php

use App\Http\Controllers\JenisPraktikumController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PraktikumController;
use App\Http\Controllers\PraktikanController;
use App\Http\Controllers\PraktikanLoginController;
use App\Http\Controllers\PraktikanRegisterController;
Route::get('/', function () {
    return Inertia::render('Home');
});
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->name('dashboard');
Route::resource('/post', PostController::class);

Route::resource('/role', RoleController::class);


//praktikum route
Route::resource('/praktikum', PraktikumController::class);
Route::resource('/kategori-praktikum', JenisPraktikumController::class);
Route::resource('/praktikan', PraktikanController::class);



Route::middleware('guest')->group(function () {
    Route::get('/register/praktikan', [PraktikanRegisterController::class, 'showRegistrationForm'])->name('praktikan.register');
    Route::post('/register/praktikan', [PraktikanRegisterController::class, 'register']);
});
Route::post('/login', [PraktikanLoginController::class, 'login'])->name('login');
Route::post('/logout', [PraktikanLoginController::class, 'logout'])->name('logout');
