<?php

namespace App\Http\Resources\Document;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'user_id'=>$this->user_id,
            'document_type'=>$this->document_type,
            'path'=>env('APP_URL').'/storage/'.$this->path,
            'mime_type'=>$this->mime_type,
            'size'=>$this->size,
            'original_name'=>$this->original_name,

        ];
    }
}
