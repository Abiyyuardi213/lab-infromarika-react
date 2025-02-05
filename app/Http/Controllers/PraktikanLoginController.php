<?php

namespace App\Http\Controllers;

use App\Models\Praktikan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class PraktikanLoginController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'npm' => 'required|string',
            'password' => 'required|string',
        ]);

        $praktikan = Praktikan::where('npm', $credentials['npm'])->first();

        if ($praktikan && Auth::attempt(['email' => $praktikan->user->email, 'password' => $request->password])) {
            // return response()->json(['message' => 'Login berhasil!']);
            return redirect()->intended('/dashboard');
        } else {
            return response()->json(['error' => 'NPM atau Password salah.'], 401);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
