<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * Menampilkan daftar role.
     */
    public function index()
    {
        return Inertia::render('Role/RoleList', [
            'roles' => Role::all(),
        ]);
    }

    /**
     * Menampilkan form untuk membuat role baru.
     */
    public function create()
    {
        return Inertia::render('Role/RoleCreate');
    }

    /**
     * Menyimpan role baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles',
            'status' => 'required|boolean',
        ]);

        Role::create($request->all());

        return redirect()->route('roles.index');
    }

    /**
     * Menampilkan detail role tertentu.
     */
    public function show(Role $role)
    {
        return Inertia::render('Role/RoleDetail', [
            'role' => $role,
        ]);
    }

    /**
     * Menampilkan form untuk mengedit role.
     */
    public function edit(Role $role)
    {
        return Inertia::render('Role/RoleUpdate', [
            'role' => $role,
        ]);
    }

    /**
     * Memperbarui role di database.
     */
    public function update(Request $request, Role $role)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'status' => 'required|boolean',
        ]);

        $role->update($request->all());

        return redirect()->route('roles.index');
    }

    /**
     * Menghapus role dari database.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('roles.index');
    }
}
