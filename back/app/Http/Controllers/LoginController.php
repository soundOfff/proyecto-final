<?php

namespace App\Http\Controllers;

use App\Http\Resources\StaffResource;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->get('email');
        $token = $request->get('token');

        $googleUser = Socialite::driver('google')->userFromToken($token);

        $staff = Staff::where('email', $email)->first();

        if (! $staff) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($staff) {
            $staff->update([
                $googleUser->user['given_name'],
                $googleUser->user['family_name'],
                'last_login' => now(),
                'last_ip' => $request->ip(),
            ]);
        }

        $staff->token = $staff->createToken('api')->plainTextToken;

        Auth::login($staff);

        return new StaffResource($staff);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
