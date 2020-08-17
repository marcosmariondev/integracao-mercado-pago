<?php

namespace App\Http\Controllers;

use App\Services\SaleService;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\SaleCollection;

class SaleController extends ApiController
{

    /**
     * @var SaleService
     */
    private $service;


    public function __construct(SaleService $saleService)
    {
        $this->service = $saleService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {

        try {

            $limit = (int)(request('limit') ?? 20);
            $data = $this->service->paginate($limit);

            return $this->sendPaginate(new SaleCollection($data));

        } catch (\Exception $exception) {

            return $this->sendError('Server Error.', $exception);

        }
    }


}
