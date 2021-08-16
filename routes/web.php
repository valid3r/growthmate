<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Catch all routes (serve index view) where the path does not start with api
// Thereby also getting rid of the 404 on reload

Route::get('/{any?}', function () {
    return view('index');
})->where('any', '^(?!api).*$');

// Route::get('/login', function () {
//     echo 'somethign';
// });

// Route::get('/', function () {
//     return view('index');
// });
