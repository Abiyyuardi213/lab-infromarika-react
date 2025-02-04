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
        Schema::create('register_praktikums', function (Blueprint $table) {
            $table->id();
            $table->foreignId('praktikum_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('status', 50);
            $table->string('nilai', 50)->nullable();
            $table->text('catatan')->nullable();
            $table->string('file', 255)->nullable();
            $table->string('status_pembayaran', 50);
            $table->string('bukti_pembayaran', 255)->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('register_praktikums');
    }
};
