<?php

namespace App\Http\Controllers;

use App\Models\Praktikan;
use App\Models\Praktikum;
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
            'praktikans' => Praktikan::with('praktikum')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Praktikan/PraktikanCreate', [
            'praktikums' => Praktikum::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'npm' => 'required|string|max:20|unique:praktikans',
            'jurusan' => 'required|string|max:255',
            'angkatan' => 'required|integer|min:2000|max:' . date('Y'),
            'praktikum_id' => 'required|exists:praktikums,id',
            'status' => 'required|boolean',
        ]);

        Praktikan::create($request->all());

        return redirect()->route('praktikan.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Praktikan $praktikan)
    {
        return Inertia::render('Praktikan/PraktikanDetail', [
            'praktikan' => $praktikan->load('praktikum'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Praktikan $praktikan)
    {
        return Inertia::render('Praktikan/PraktikanUpdate', [
            'praktikan' => $praktikan,
            'praktikums' => Praktikum::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Praktikan $praktikan)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'npm' => 'required|string|max:20|unique:praktikans,npm,' . $praktikan->id,
            'jurusan' => 'required|string|max:255',
            'angkatan' => 'required|integer|min:2000|max:' . date('Y'),
            'praktikum_id' => 'required|exists:praktikums,id',
            'status' => 'required|boolean',
        ]);

        $praktikan->update($request->all());

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