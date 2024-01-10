<?php

namespace App\Http\Resources\Users;

use App\Http\Resources\Address\AddressCollection;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

use App\Http\Resources\Admin\AdminResource;
use App\Http\Resources\Student\StudentResource;
use App\Http\Resources\Teacher\TeacherResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Guardian\GuardianResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */


     /**
 * @OA\Schema(
 *     schema="UserResource",
 *     title="User Data",
 *     description="Schema for user-related data",
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="User ID"
 *     ),
 *     @OA\Property(
 *         property="username",
 *         type="string",
 *         description="User's username"
 *     ),
 *     @OA\Property(
 *         property="user_type",
 *         type="string",
 *         description="Type of user"
 *     ),
 *     @OA\Property(
 *         property="addresses",
 *         type="array",
 *         nullable=true,
 *         description="User's addresses",
 *         @OA\Items(
 *             ref="#/components/schemas/AddressResource"
 *         )
 *     ),
 *     @OA\Property(
 *         property="details",
 *         type="object",
 *         nullable=true,
 *         description="User's details"
 *     ),
 * )
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
            $details = new GuardianResource($this->guardian);
        }
        $data=[
            'id' => $this->id,
            'username' => $this->username,
            'user_type' => $this->user_type,
            'addresses'=> $this->addresses? new AddressCollection($this->addresses):null,
            'details' => $details ?? null,
        ];
       $detailsArray=json_decode(json_encode($data['details']),true) ;
       unset($detailsArray['id']);
       unset($data['details']);
        $mergeData=array_merge($data, $detailsArray );
       // ksort($mergeData);



        return $mergeData;
    }
}
