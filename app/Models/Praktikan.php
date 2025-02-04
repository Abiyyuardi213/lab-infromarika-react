<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Praktikan extends Model
{
    use HasFactory;
    protected $table = 'praktikans';

    protected $fillable = ['user_id', 'nama_praktikan', 'npm', 'no_hp'];

    public function praktikum()
    {
        return $this->belongsTo(Praktikum::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
