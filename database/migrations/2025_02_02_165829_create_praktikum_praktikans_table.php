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
        Schema::create('praktikum_praktikans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('praktikum_id')->constrained('praktikums')->onDelete('cascade');
            $table->foreignId('praktikan_id')->constrained('praktikans')->onDelete('cascade');
            $table->foreignId('aslab_id')->constrained('asisten_labs')->onDelete('cascade');
            $table->foreignId('sesi_praktikum_id')->constrained('sesi_praktikums')->onDelete('cascade');
            $table->timestamps();

            // Prevent duplicate registrations for the same practicum
            $table->unique(['praktikum_id', 'praktikan_id']);

            // Index for faster query performance
            $table->index(['praktikum_id', 'sesi_praktikum_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('praktikum_praktikans');
    }
};
