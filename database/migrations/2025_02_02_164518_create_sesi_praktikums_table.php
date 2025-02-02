<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sesi_praktikums', function (Blueprint $table) {
            $table->id();
            $table->foreignId('praktikum_id')->constrained('praktikums')->onDelete('cascade');
            $table->string('nama_sesi'); // Contoh: Kelas P1 Sesi 1, Kelas P Sesi 2
            $table->string('hari');      // Contoh: Jumat, Kamis
            $table->time('jam_mulai');
            $table->time('jam_selesai');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sesi_praktikums');
    }
};
