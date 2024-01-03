<?php

namespace App\Http\Controllers\Api;



use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\DocumentService;
use App\Http\Requests\Document\StoreDocumentRequest;


class DocumentController extends Controller
{
    protected $documentService;
    function __construct(DocumentService $documentService)
    {
        $this->documentService=$documentService;
    }

    public function store(StoreDocumentRequest  $request){

        return $this->documentService->store($request);

    }
    public function getFile($id){
        return $this->documentService->getFile($id);

    }
    public function show($id){
        return $this->documentService->getFile($id);

    }
    public function userDocuments(Request $request){
        return $this->documentService->userDocuments($request);

    }
}
