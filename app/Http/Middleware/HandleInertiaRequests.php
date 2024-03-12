<?php

namespace App\Http\Middleware;

use App\Enums\ChurchCategory;
use App\Http\Transformer\ChurchTransformer;
use App\Http\Transformer\TagTransformer;
use App\Http\Transformer\UserTransformer;
use App\Repositories\ChurchRepository;
use App\Repositories\TagRepository;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    public function __construct(
        private TagRepository $tagRepository,
        private ChurchRepository $churchRepository,
    ) {
    }

    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if ($user) {
            $user->load(['church', 'church.parentChurch']);
        }

        return [
            ...parent::share($request),
            'flash' => [
                'toast' => fn () => $request->session()->get('toast'),
            ],
            'auth' => [
                'user' => $user != null ? new UserTransformer($request->user()) : null,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'occupations' => TagTransformer::collection($this->tagRepository->getOccupations()),
            'church_positions' => TagTransformer::collection($this->tagRepository->getChurchPositions()),
            'church_ministries' => TagTransformer::collection($this->tagRepository->getChurchMinistries()),
            'local_church' => ChurchTransformer::collection($this->churchRepository->getChurchByCategory(ChurchCategory::LOCAL)),
        ];
    }
}
