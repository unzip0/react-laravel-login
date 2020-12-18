<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use Sentinel;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

        /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, 
        [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
    }

    public function login(Request $request){
        $validator = $this->validator($request->all());
        
        if ($validator->fails()){
            return response()->json([
                'status' => 200,
                'message'=> 'validation_error',
                'data' => null,
                'errors' => $validator->errors()
            ]);
        }

        $credentials = [
            'email'    => trim($request->email),
            'password' => trim($request->password),
          ];
        $user = Sentinel::authenticate($credentials);

        if (empty($user)){
            return response()->json([
                'status' => 200,
                'message'=> 'User not found',
                'data' => null,
                'errors' => array('response' => [ 'Invalid credentials'])
            ]);
        }

        return response()->json([
            'status' => 200,
            'message'=> 'login success',
            'data' => [ 
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'username' => $user->username
            ],
            'errors' => null
        ]); 
        
    }
}
