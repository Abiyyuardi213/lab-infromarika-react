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
    public function index(Request $request)
    {
        $query = Role::query();

        // Handle search
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Handle sorting
        $sortField = $request->input('sort', 'name');
        $sortDirection = $request->input('direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        // Handle pagination
        $perPage = $request->input('perPage', 10);
        $roles = $query->paginate($perPage);

        return Inertia::render('Role/RoleList', [
            'roles' => $roles,
            'filters' => [
                'search' => $request->search,
                'page' => $roles->currentPage(),
                'perPage' => $perPage,
                'sort' => $sortField,
                'direction' => $sortDirection
            ]
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

        return redirect()->route('role.index');
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

        return redirect()->route('role.index');
    }

    /**
     * Menghapus role dari database.
     */
    public function destroy(Role $role)
    {
        $role->delete();
        return redirect()->route('role.index');
    }
}
