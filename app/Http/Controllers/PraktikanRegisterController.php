<?php

namespace App\Http\Controllers;

use App\Models\Praktikan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PraktikanRegisterController extends Controller
{
    public function showRegistrationForm()
    {
        return Inertia::render('Auth/RegisterAccount');
    }

    public function register(Request $request)
    {
        // Validasi input
        $request->validate([
            'nama' => 'required|string|max:255',
            'npm' => 'required|string|unique:praktikans,npm',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'telepon' => 'nullable|string',
        ]);

        try {
            // Memulai transaksi database
            DB::beginTransaction();

            // Membuat user baru
            $user = User::create([
                'name' => $request->nama,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => 3,
            ]);

            // Memastikan user berhasil dibuat
            if (!$user || !$user->id) {
                throw new \Exception('Gagal membuat user baru');
            }

            // Membuat data praktikan
            $praktikan = Praktikan::create([
                'user_id' => $user->id,
                'nama_praktikan' => $request->nama,
                'npm' => $request->npm,
                'no_hp' => $request->telepon,
            ]);

            // Commit transaksi jika semua berhasil
            DB::commit();
            return redirect()->route('/')->with('success', 'Registrasi berhasil!');

        } catch (\Exception $e) {
            // Rollback transaksi jika terjadi kesalahan
            DB::rollBack();
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan saat registrasi. Silakan coba lagi.']);
        }
    }
}
