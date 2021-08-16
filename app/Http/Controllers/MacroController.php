<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;
use App\Models\Macro;
use App\Http\Resources\MacroResource;

class MacroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        // Show all MacroSteps for a specific goal
        // return 'Here should be macro goal data with id: ' . $id;
        // return Macro::where('goal_id', $id)->get();

        return MacroResource::collection(
            Macro::where('goal_id', $id)
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
    public function store($goalId, Request $request)
    {
        // Validate
        $request->validate([
            'macro' => 'required',
        ]);

        // Build a new Macro model and pass the $request data as array
        $macro = new Macro([
            'goal_id' => $goalId,
            'title' => $request->macro,
        ]);

        // Save data to Database (Post model extends from Model which has a save method which saves data to db)
        $macro->save();

        // Return json response
        return response()->json([
            'data' => [
                'message' => 'Macro Created!',
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
        // Find macro, make model
        $macro = Macro::findOrFail($id);

        // Delete it
        $macro->delete();

        // Return http code and message
        return response()->json([
            'data' => [
                'code' => '204',
                'message' => 'Macro deleted!',
            ],
        ]);
    }
}
