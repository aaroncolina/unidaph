<?php

namespace App\Providers;

use App\Http\Middleware\TrimStrings;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        TrimStrings::skipWhen(function (Request $request) {
            return $request->is('members');
        });
    }
}
