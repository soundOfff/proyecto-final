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

        if ($googleUser->getEmail() !== $email) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if (! $staff) {
            $staff = Staff::create([
                'role_id' => 1,
                'email' => $email,
                'first_name' => $googleUser->user['given_name'],
                'last_name' => $googleUser->user['family_name'],
                'profile_image' => $googleUser->getAvatar(),
                'last_login' => now(),
                'last_ip' => $request->ip(),
            ]);
        } else {
            $staff->update([
                'last_login' => now(),
                'last_ip' => $request->ip(),
            ]);
        }

        $staff->token = $staff->createToken('api')->plainTextToken;

        Auth::login($staff);

        return new StaffResource($staff);
    }
}
