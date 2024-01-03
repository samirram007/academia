<?php
namespace App\Services;

use App\Models\User;

use App\Models\Document;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;
use App\Http\Resources\Users\UserResource;
use App\Http\Resources\Document\DocumentResource;
use App\Http\Resources\Document\DocumentCollection;
use App\Http\Requests\Document\StoreDocumentRequest;

class DocumentService{

    public function store(StoreDocumentRequest $request){
        $validatedData = $request->validatedWithFiles();
       // dd($validatedData,$request);
        $file = $validatedData['file'];

        $mimeToTypeMap = [
            'image/jpeg' => 'image',
            'image/png' => 'image',
            'image/avif' => 'image',
            'image/gif' => 'image',
            'application/pdf' => 'pdf',
            // Add more mime types and their respective document types as needed
        ];

        $mime_type = $file->getMimeType();
        $document_type = $mimeToTypeMap[$mime_type] ?? 'doc';



        if (Auth::check()) {
            $userId = Auth::user()->id;
            // Use $userId within the context where Auth::user() is valid

             //$path =  'documents/'.$userId.'/'.$file->getClientOriginalExtension();


            //store  the file physically

            $uuid = (string) Str::uuid();
            $name=$uuid.'.'.$file->getClientOriginalExtension();
            $path = $file->storeAs('documents/'.$userId.'/'.$file->getClientOriginalExtension(),$name, 'public');
           // dd($path);
           // $file->storeAs($path, $name, 'public');

            $document = new Document([
                'user_id' => $userId,
                'document_type' => $document_type,
                'path' => $path,
                'name' => $name,
                'original_name' => $file->getClientOriginalName(),
                'extension'=> $file->getClientOriginalExtension(),
                'mime_type' => $mime_type,
                'size' => $file->getSize(),
                // Other fields
            ]);

            $document->save();
            return response()->json([$document]);
            // Additional logic
        } else {
            // Handle the case where there's no authenticated user
        }
    }

    public function getFile($id){
        $document = Document::find($id);
        $path = $document->path;
        $name = $document->name;
        $mime_type = $document->mime_type;
        $size = $document->size;
        $original_name = $document->original_name;
        $extension = $document->extension;
        $document_type = $document->document_type;
        $content = Storage::get('public/'. $path);
        $response = Response::make($content, 200);
        $response->header("Content-Type", $mime_type);
        $response->header("Content-Disposition", "attachment; filename=$original_name");
        return $response;
    }
    public function show($id){
        $document = Document::find($id);
        return new DocumentResource($document);
    }
    public function userDocuments(Request $request){
        if ($request->has('type')){
            $type=$request->type;
            $documents = Document::where('user_id',Auth::user()->id)->where('document_type',$type)->get();
            return new DocumentCollection($documents);
        }

        if ($request->has('type') && $request->has('tags')){
            $type=$request->type;
            $tags=$request->tags;
            //use likes for tags
            $documents = Document::where('user_id',Auth::user()->id)->where('document_type',$type)
            ->where('tags', $tags)->get();
            return new DocumentCollection($documents);
        }

        $documents = Document::where('user_id',Auth::user()->id)->get();
        return new DocumentCollection($documents);
    }
}
