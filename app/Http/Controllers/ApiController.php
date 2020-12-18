<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ApiController extends Controller
{
    public function getUsers(){
        return response()->json([
            'action' => 'getUsers',
            'status'=> 200,
            'count' => User::count(), 
            'data' => User::all()
        ]);
    }

    public function getUserById(int $id){
       
        $user = User::find($id);

        if ($user){
            return response()->json([
                'action' => 'getUserById',
                'message' => 'User found',
                'status'=> 200,
                'count' => $user->count(),
                'data' => $user
            ]);
        }
        return response()->json([
            'action' => 'getUserById',
            'message' => 'User not found',
            'status'=> 200,
            'count' => 0,
            'data' => null
        ]);
    }

    public function getUserByUsername(string $username){
        
        $user = User::where('username', $username)->first();

        if ($user){
            return response()->json([
                'action' => 'getUserByUsername',
                'message' => 'User found',
                'status'=> 200,
                'count' => $user->count(),
                'data' => $user
            ]);
        }
        return response()->json([
            'action' => 'getUserByUsername',
            'message' => 'User not found',
            'status'=> 200,
            'count' => 0,
            'data' => null
        ]);
    }

}
