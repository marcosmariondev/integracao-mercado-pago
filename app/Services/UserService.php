<?php


namespace App\Services;


use App\Models\User;

class UserService
{

    public function store($data): User
    {

        try {

            $user = new User();
            $user->fill($data);
            $user->password = bcrypt(123456);
            $user->save();

            return $user;

        } catch (\GuzzleHttp\Exception\ClientException $e) {
            dd($e->getResponse());
        }
    }

}
