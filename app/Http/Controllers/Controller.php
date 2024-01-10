<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
/**
 * @OA\Info(
 *    title="Academia Rest API",
 *    version="1.0.0",
 * ),
 *   @OA\SecurityScheme(
 *       securityScheme="sanctum",
 *       in="header",
 *       name="bearerAuth",
 *       type="http",
 *       scheme="bearer",
 *       bearerFormat="cookie",
 *    ),
 */
class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}
