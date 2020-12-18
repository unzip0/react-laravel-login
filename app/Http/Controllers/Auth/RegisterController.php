<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Sentinel;
use Activation;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
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
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
    }

    public function store(Request $request){
        $validator = $this->validator($request->all());
        
        if ($validator->fails()){
            return response()->json([
                'status' => 'failed',
                'message'=> 'validation_error',
                'data' => null,
                'errors' => $validator->errors()
            ]);
        }
        $user = Sentinel::create([
            'first_name' => $request->name,
            'last_name' => $request->last_name,
            'username' =>  $request->username,
            'email' => $request->email,
            'password' => $request->password
        ]);
        $act = Activation::create($user);
        
        Activation::complete($user, $act->code);

        return response()->json([
            'status' => 'success',
            'message'=> 'register success',
            'data' => [ 'id' => $user->id ],
            'errors' => null
        ]); 
        
    }
}
