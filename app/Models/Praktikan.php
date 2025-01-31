<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Praktikan extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'npm', 'jurusan', 'angkatan', 'praktikum_id', 'status'];

    public function praktikum()
    {
        return $this->belongsTo(Praktikum::class);
    }
}