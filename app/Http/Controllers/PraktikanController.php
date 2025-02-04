<?php

namespace App\Http\Controllers;

use App\Models\Praktikan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PraktikanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Praktikan/PraktikanList', [
            'praktikans' => Praktikan::with('user')->get(), // Menggunakan relasi ke user sesuai foreign key
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Praktikan/PraktikanCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id', // Tambahkan validasi user_id
            'nama_praktikan' => 'required|string|max:255',
            'npm' => 'required|string|max:20|unique:praktikans',
            'no_hp' => 'nullable|string|max:15',
        ]);

        Praktikan::create($request->only(['user_id', 'nama_praktikan', 'npm', 'no_hp']));

        return redirect()->route('praktikan.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Praktikan $praktikan)
    {
        return response()->json([
            'praktikan' => $praktikan->load('user')
        ]);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Praktikan $praktikan)
    {
        return Inertia::render('Praktikan/PraktikanUpdate', [
            'praktikan' => $praktikan
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Praktikan $praktikan)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'nama_praktikan' => 'required|string|max:255',
            'npm' => 'required|string|max:20|unique:praktikans,npm,' . $praktikan->id,
            'no_hp' => 'nullable|string|max:15',
        ]);

        $praktikan->update($request->only(['user_id', 'nama_praktikan', 'npm', 'no_hp']));

        return redirect()->route('praktikan.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Praktikan $praktikan)
    {
        $praktikan->delete();
        return redirect()->route('praktikan.index');
    }
}
