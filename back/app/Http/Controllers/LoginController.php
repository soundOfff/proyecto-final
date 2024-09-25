<?php

namespace App\Http\Controllers;

use App\Http\Resources\StaffResource;
use App\Models\Session;
use App\Models\SlackWorkspace;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
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

        $staff->update([
            $googleUser->user['given_name'],
            $googleUser->user['family_name'],
            'last_login' => now(),
            'last_ip' => $request->ip(),
            'google_token' => $token,
            'token' => $staff->createToken('api')->plainTextToken,
        ]);

        Auth::login($staff, true);

        return new StaffResource($staff);
    }

    public function slackBotLogin(Request $request)
    {
        $code = $request->get('code');

        $data = Http::asForm()->post('https://slack.com/api/oauth.v2.access', [
            'code' => $code,
            'client_id' => config('services.slack.client_id'),
            'client_secret' => config('services.slack.client_secret'),
            'redirect_uri' => env('SLACK_BOT_REDIRECT_URI'),
        ]);

        $accessToken = $data['access_token'];
        $teamId = $data['team']['id'];
        $teamName = $data['team']['name'];

        $workspace = SlackWorkspace::where('slack_workspace_id', $teamId)->first();

        if (! $workspace) {
            $workspace = SlackWorkspace::create([
                'slack_workspace_id' => $teamId,
                'name' => $teamName,
                'bot_token' => $accessToken,
            ]);
        }
    }

    public function slackLogin()
    {
        $slackUser = Socialite::driver('slack')->stateless()->user();

        $staff = Staff::where('email', $slackUser->email);

        if (! $staff) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $staff->update([
            'slack_channel' => $slackUser->id,
            'slack_token' => $slackUser->token,
            'slack_workspace_id' => $slackUser->user['team']['id'],
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json(['message' => 'Successfully logged out'], 200);
    }
}
