<?php

namespace App\Http\Controllers;

use App\Http\Resources\StaffResource;
use App\Models\Session;
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

        if (!$staff) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        if ($staff) {
            $staff->update([
                $googleUser->user['given_name'],
                $googleUser->user['family_name'],
                'last_login' => now(),
                'last_ip' => $request->ip(),
            ]);

            $ltsSession = $this->latestSession($staff->id);
            if (!$ltsSession) {
                Session::create([
                    'staff_id' => $staff->id,
                    'ip_address' => $request->ip(),
                    'last_login' => now(),
                ]);
            }
        }

        $staff->token = $staff->createToken('api')->plainTextToken;

        Auth::login($staff);

        return new StaffResource($staff);
    }

    public function logout(Request $request)
    {
        $staffId = Auth::user()->id; // TODO: Need to get the correct staffId this returns null
        $ltsSession = $this->latestSession($staffId);
        if ($ltsSession) {
            $ltsSession->update([
                'last_logout' => now(),
            ]);
        } else {
            Session::create([
                'staff_id' => $staffId,
                'ip_address' => $request->ip(),
                'last_logout' => now(),
            ]);
        }

        Auth::logout();

        return response()->json(['message' => 'Successfully logged out'], 204);
    }

    private function latestSession($staffId)
    {
        return Session::where('staff_id', $staffId)
            ->where('created_at', '>=', now()->subMinutes(5))
            ->latest()
            ->first();
    }
}
