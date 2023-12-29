<?php

namespace App\Http\Resources\Users;


use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Resources\Users\AdminResource;
use App\Http\Resources\Users\GurdianResource;
use App\Http\Resources\Users\StudentResource;
use App\Http\Resources\Users\TeacherResource;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if ($this->user_type->value === 'super_admin' && $this->super_admin) {
            $details = new AdminResource($this->super_admin);
        }
        elseif ($this->user_type->value === 'admin' && $this->admin) {
            $details = new AdminResource($this->admin);
        }
        elseif ($this->user_type->value === 'developer' && $this->developer) {
            $details = new AdminResource($this->developer);
        }
        elseif ($this->user_type->value === 'teacher' && $this->teacher) {
            $details = new TeacherResource($this->teacher);
        } elseif ($this->user_type->value  === 'student' && $this->student) {
            $details = new StudentResource($this->student);
        } elseif ($this->user_type->value  === 'guardian' && $this->guardian) {
            $details = new GurdianResource($this->guardian);
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'user_type' => $this->user_type,
            'email' => $this->email,
            // 'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'details' => $details ?? null,

        ];
    }
}
