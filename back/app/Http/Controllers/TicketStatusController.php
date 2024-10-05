<?php

namespace App\Http\Controllers;

use App\Http\Resources\TicketStatusResourceCollection;
use App\Models\TicketStatus;
use Illuminate\Http\Request;

class TicketStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $status = TicketStatus::all();
        return new TicketStatusResourceCollection($status);
    }
}
