import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { CardLink } from '@/Components/CardLink';

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
    >
      <Head title="Dashboard" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-y-2 py-2">
        <div className="p-6 text-gray-900 bg-white rounded">You&apos;re logged in!</div>
        <div className="overflow-hidden shadow-sm sm:rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <CardLink href="https://laravel.com/docs">
              <div>
                <div className="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="w-7 h-7 stroke-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                </div>

                <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  Documentation
                </h2>

                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Laravel has wonderful documentation covering every aspect of the framework.
                  Whether you are a newcomer or have prior experience with Laravel, we recommend
                  reading our documentation from beginning to end.
                </p>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </CardLink>

            <CardLink href="https://laracasts.com">
              <div>
                <div className="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="w-7 h-7 stroke-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>

                <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  Laracasts
                </h2>

                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Laracasts offers thousands of video tutorials on Laravel, PHP, and JavaScript
                  development. Check them out, see for yourself, and massively level up your
                  development skills in the process.
                </p>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </CardLink>

            <CardLink href="https://laravel-news.com">
              <div>
                <div className="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="w-7 h-7 stroke-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
                    />
                  </svg>
                </div>

                <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  Laravel News
                </h2>

                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Laravel News is a community driven portal and newsletter aggregating all of the
                  latest and most important news in the Laravel ecosystem, including new package
                  releases and tutorials.
                </p>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="self-center shrink-0 stroke-red-500 w-6 h-6 mx-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </CardLink>

            <CardLink>
              <div>
                <div className="h-16 w-16 bg-red-50 dark:bg-red-800/20 flex items-center justify-center rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    className="w-7 h-7 stroke-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                    />
                  </svg>
                </div>

                <h2 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  Vibrant Ecosystem
                </h2>

                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  Laravel&nbsp;s robust library of first-party tools and libraries, such as{' '}
                  <a
                    href="https://forge.laravel.com"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Forge
                  </a>
                  ,{' '}
                  <a
                    href="https://vapor.laravel.com"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Vapor
                  </a>
                  ,{' '}
                  <a
                    href="https://nova.laravel.com"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Nova
                  </a>
                  , and{' '}
                  <a
                    href="https://envoyer.io"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Envoyer
                  </a>{' '}
                  help you take your projects to the next level. Pair them with powerful open source
                  libraries like{' '}
                  <a
                    href="https://laravel.com/docs/billing"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Cashier
                  </a>
                  ,{' '}
                  <a
                    href="https://laravel.com/docs/dusk"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Dusk
                  </a>
                  ,{' '}
                  <a
                    href="https://laravel.com/docs/broadcasting"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Echo
                  </a>
                  ,{' '}
                  <a
                    href="https://laravel.com/docs/horizon"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Horizon
                  </a>
                  ,{' '}
                  <a
                    href="https://laravel.com/docs/sanctum"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Sanctum
                  </a>
                  ,{' '}
                  <a
                    href="https://laravel.com/docs/telescope"
                    className="underline hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Telescope
                  </a>
                  , and more.
                </p>
              </div>
            </CardLink>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
