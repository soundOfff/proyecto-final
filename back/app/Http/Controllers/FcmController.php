<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use App\Models\StaffDevice;
use App\Services\FcmService;
use Illuminate\Http\Request;

class FcmController extends Controller
{
    public function __construct(protected FcmService $fcmService)
    {
    }

    public function sendNotification(Request $request)
    {
        try {
            $request->validate([
                'device_token' => 'required|string',
                'title' => 'required|string',
                'body' => 'required|string',
                'staff_id' => 'required|exists:staff,id',
            ]);

            $this->fcmService->sendNotification($request->device_token, $request->title, $request->body, $request->staff_id);

            return response()->json(null, 204);
        } catch (\Exception $e) {
            dd($e);

            return response()->json($e->getMessage(), 500);
        }
    }

    public function storeToken(Request $request)
    {
        $newTokenDevice = $request->validate([
            'staff_id' => 'required|exists:staff,id',
            'device_token' => 'required|string',
        ]);

        $tokenExists = StaffDevice::where('staff_id', $newTokenDevice['staff_id'])
            ->where('device_token', $newTokenDevice['device_token'])
            ->exists();

        if (!$tokenExists) {
            StaffDevice::create($newTokenDevice);
        }

        return response()->json(null, 201);
    }
}
