<?php

namespace App\Http\Requests\User;

use App\Enums\UserTypeEnum;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'user_type'=> ['required',Rule::in(UserTypeEnum::cases())],
            'username'=>'sometimes|string|max:10|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required', 'confirmed', Password::min(8)->letters()->symbols(),
        ];
    }
}
