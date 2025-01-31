<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('praktikans', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('npm')->unique(); // Mengubah nim menjadi npm
            $table->string('jurusan');
            $table->integer('angkatan');
            $table->unsignedBigInteger('praktikum_id'); // Foreign key ke tabel praktikum
            $table->foreign('praktikum_id')->references('id')->on('praktikums')->onDelete('cascade');
            $table->tinyInteger('status');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('praktikans');
    }
};