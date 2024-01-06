<?php

namespace App\Services;

use App\Models\AcademicYear;
use Illuminate\Http\Request;
use App\Http\Resources\AcademicYear\AcademicYearResource;
use App\Http\Resources\AcademicYear\AcademicYearCollection;
use App\Http\Requests\AcademicYear\StoreAcademicYearRequest;

/**
 * Class AcademicYearService.
 */
class AcademicYearService
{
    public function all(Request $request)
    {
        $users= AcademicYear::query()->orderBy('id', 'desc')->paginate();
        return new AcademicYearCollection($users);
    }
    /**
     * Display the specified resource.
     * @param \App\Models\AcademicYear $academicYear
     * @return \Illuminate\Http\Response
     */

    public function single(AcademicYear $academicYear)
    {
        return new AcademicYearResource($academicYear);
    }

    public function create(StoreAcademicYearRequest $request){
        $data = $request->validated();
        $academicYear = AcademicYear::create($data);
        return response(new AcademicYearResource($academicYear), 201);
    }

    public function update(StoreAcademicYearRequest $request,AcademicYear $academicYear)
    {
        $data = $request->validated();
        $academicYear->update(array_filter($data));
        return response(new AcademicYearResource($academicYear), 201);
    }
    public function delete(AcademicYear $academicYear)
    {

            $academicYear->delete();
            return response()->json(['message'=>'AcademicYear Deleted'],200);
    }

}
