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

// Root route (login) that returns the authentication page.
Route::view('/', 'auth.login')->name('login');

// Routes Auth.
Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');

// Crud routes protected by auth middleware
Route::middleware(['auth'])->group(function() {

    // Returns all inserted records
    Route::get('/funcionarios/list', 'CrudController@index');
    // Returns the record for the specified name
    Route::get('/funcionarios/show/{name}', 'CrudController@show');
    // Create a new employee record
    Route::post('/funcionarios/create', 'CrudController@store');
    // Updates the record according to the post data regarding the id
    Route::post('/funcionarios/update/{id}', 'CrudController@update');
    // Excluí o registro referente ao id especificado no post
    Route::post('/funcionarios/destroy/{id}', 'CrudController@delete');

});
