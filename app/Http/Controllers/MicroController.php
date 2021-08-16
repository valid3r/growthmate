<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Micro;
use App\Http\Resources\MicroResource;

class MicroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($macroId)
    {
        return MicroResource::collection(
            Micro::where('macro_id', $macroId)
                ->orderBy('id', 'DESC')
                ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($macroId, Request $request)
    {
        // Validate
        $request->validate([
            'micro' => 'required',
        ]);

        // Build a new Macro model and pass the $request data as array
        $micro = new Micro([
            'macro_id' => $macroId,
            'title' => $request->micro,
        ]);

        // Save data to Database (Post model extends from Model which has a save method which saves data to db)
        $micro->save();

        // Return json response
        return response()->json([
            'data' => [
                'message' => 'Micro Created!',
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Find micro
        $micro = Micro::findOrFail($id);

        // Delete it
        $micro->delete();

        // Return http code and message
        return response()->json([
            'data' => [
                'code' => '204',
                'message' => 'Micro deleted!',
            ],
        ]);
    }

    /**
     * Set the status specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function setStatus($id, $status)
    {
        // Build a post model with its corresponding data from db
        $micro = micro::findOrFail($id);

        // Update data on model
        $micro->completed = $status;

        // Save data to Database (Post model extends from Model which has a save method which saves data to db)
        $micro->save();

        // Return json response
        return response()->json([
            'data' => [
                'message' => 'Status Updated!',
            ],
        ]);
    }
}
