<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\MacroController;
use App\Http\Controllers\MicroController;

// use App\Http\Resources\GoalsResource;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**Using API resource */
// Route::resource('posts', PostController::class);

/** Goals */
Route::get('goals', [GoalController::class, 'index']);
Route::get('goals/{id}', [GoalController::class, 'show']);
Route::post('goals', [GoalController::class, 'store']);
Route::put('goals/{id}', [GoalController::class, 'update']);
Route::delete('goals/{id}', [GoalController::class, 'destroy']);
Route::put('goals/{id}/{status}', [GoalController::class, 'setStatus']);

//** Macros */
Route::get('macros/{id}', [MacroController::class, 'index']);
Route::get('macro/{id}', [MacroController::class, 'show']);
Route::post('macros/{goalId}', [MacroController::class, 'store']);
Route::put('macros/{id}', [MacroController::class, 'update']);
Route::delete('macros/{id}', [MacroController::class, 'destroy']);

// Route::get('micros/{Mid}', [MacroController::class, 'show']);
Route::post('micros/{macroId}', [MicroController::class, 'store']);
// Route::put('micros/{id}', [MacroController::class, 'update']);
Route::delete('micros/{id}', [MicroController::class, 'destroy']);

// Show all micros that belong to macro
Route::get('micros/{macroId}', [MicroController::class, 'index']);

// Change status of microgoal
Route::put('micros/{id}/{status}', [MicroController::class, 'setStatus']);
