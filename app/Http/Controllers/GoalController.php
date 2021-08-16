<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use App\Http\Resources\Post as PostResource;
use App\Models\Goal as Goal;
use App\Http\Resources\GoalsResource;
use Illuminate\Support\Carbon;

class GoalController extends Controller
{
    /**
     * Display a listing of the GoalsResource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GoalsResource::collection(Goal::orderBy('id', 'DESC')->get());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $goal = new GoalsResource(Goal::find($id));
        $date = Carbon::createFromFormat('Y-m-d', $goal->due_date)->format(
            'Y, m, d'
        );
        $goal->due_date = $date;
        return $goal;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'priority' => 'required',
        ]);

        $due_date = Carbon::parse($request->correctDate)->toDateString();

        // Build a new Post model and pass the $request data as array
        $goal = new Goal([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->goalStatus,
            'priority' => $request->priority,
            'due_date' => $due_date,
        ]);

        // Save data to Database (Post model extends from Model which has a save method which saves data to db)
        $goal->save();

        // Return json response
        return response()->json([
            'data' => [
                'message' => 'Post Created!',
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Validate incoming request
        $request->validate([
            'title' => 'required',
            'description' => 'required',
        ]);

        $due_date = Carbon::parse($request->correctDate)->toDateString();

        // Build a post model with its corresponding data from db
        $goal = Goal::findOrFail($id);

        // Update data on model
        $goal->title = $request->title;
        $goal->description = $request->description;
        $goal->status = $request->status;
        $goal->priority = $request->priority;
        $goal->due_date = $due_date;

        // Save data to Database (Post model extends from Model which has a save method which saves data to db)
        $goal->save();

        // Return json response
        return response()->json([
            'data' => [
                'message' => 'Goal Updated!',
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
        $goal = Goal::findOrFail($id);

        // Update data on model
        $goal->status = $status;

        // Save data to Database (Post model extends from Model which has a save method which saves data to db)
        $goal->save();

        // Return json response
        return response()->json([
            'data' => [
                'message' => 'Status Updated!',
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
        // Find post
        $goal = Goal::findOrFail($id);

        // Delete it
        $goal->delete();

        // Return http code and message
        return response()->json([
            'data' => [
                'code' => '204',
                'message' => 'Goal deleted!',
            ],
        ]);
    }
}
