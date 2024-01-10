<?php

namespace App\Http\Requests\EducationBoard;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEducationBoard extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>['sometimes','string','max:255','unique:education_boards,name,'. $this->id],
            'code' => ['sometimes','string','max:20','unique:education_boards,code,'. $this->id],
        ];
    }
}
