<?php

namespace App\Http\Controllers;

use App\Models\JenisPraktikum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JenisPraktikumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('JenisPraktikum/JenisPraktikumList', [
            'jenisPraktikums' => JenisPraktikum::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Simpan data baru
        JenisPraktikum::create($validated);

        // Redirect kembali ke halaman sebelumnya dengan pesan sukses
        return redirect()->back()->with('success', 'Jenis Praktikum berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenisPraktikum $jenisPraktikum)
    {
        // Validasi input
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Update data
        $jenisPraktikum->update($validated);

        return redirect()->back()->with('success', 'Jenis Praktikum berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenisPraktikum $jenisPraktikum)
    {
        $jenisPraktikum->delete();

        return redirect()->back()->with('success', 'Jenis Praktikum berhasil dihapus.');
    }
}
