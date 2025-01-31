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
            Schema::create('praktikums', function (Blueprint $table) {
                $table->id();
                $table->string('name')->unique(); // Nama praktikum unik
                $table->string('periode')->index(); // Tambahkan index untuk pencarian cepat
                $table->integer('tahun'); // Ubah jadi integer
                $table->string('kelas'); // Tambahkan kolom kelas tanpa batasan nilai
                $table->tinyInteger('status');

                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('praktikums');
        }
    };