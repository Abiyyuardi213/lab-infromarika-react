<?php

namespace App\Http\Controllers;

use App\Models\Praktikum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PraktikumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Praktikum::query();

        // Handle pencarian (search)
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Handle sorting (pengurutan)
        $sortField = $request->input('sort', 'name');
        $sortDirection = $request->input('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        // Handle pagination
        $perPage = $request->input('perPage', 10);
        $praktikums = $query->paginate($perPage);

        return Inertia::render('Praktikum/PraktikumList', [
            'praktikums' => $praktikums,
            'filters' => [
                'search' => $request->search,
                'page' => $praktikums->currentPage(),
                'perPage' => $perPage,
                'sort' => $sortField,
                'direction' => $sortDirection,
            ],
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Praktikum/PraktikumCreate');
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:praktikums',
            'periode' => 'required|string|max:255',
            'tahun' => 'required|integer|min:1900|max:' . date('Y'),
            'kelas' => 'required|string|max:50',
            'status' => 'required|boolean',
        ]);

        Praktikum::create($request->all());

        return redirect()->route('praktikum.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Praktikum $praktikum)
    {
        return Inertia::render('Praktikum/PraktikumDetail', [
            'praktikum' => $praktikum,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Praktikum $praktikum)
    {
        return Inertia::render('Praktikum/PraktikumUpdate', [
            'praktikum' => $praktikum,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Praktikum $praktikum)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:praktikums,name,' . $praktikum->id,
            'periode' => 'required|string|max:255',
            'tahun' => 'required|integer|min:1900|max:' . date('Y'),
            'kelas' => 'required|string|max:50',
            'status' => 'required|boolean',
        ]);

        $praktikum->update($request->all());

        return redirect()->route('praktikum.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Praktikum $praktikum)
    {
        $praktikum->delete();
        return redirect()->route('praktikum.index');
    }
}