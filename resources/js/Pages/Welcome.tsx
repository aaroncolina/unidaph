import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ApplicationLogo from '@/Components/Logo/ApplicationLogo';
import githubLogo from '@/assets/images/github/github-mark.png';
import bgImage from '@/assets/images/registration-bg-image.png';
import { GetRoutes } from '@/const';

export default function Welcome({
  auth
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
  return (
    <>
      <Head title="Welcome" />
      <div
        className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white"
        style={{
          backgroundImage: 'url(' + bgImage + ')'
        }}
      >
        <div className="max-w-7xl w-full mx-auto p-6 lg:p-8">
          <div className="flex flex-col gap-y-4 justify-center">
            <ApplicationLogo logoClassName="w-[200px]" />
            <div className="flex flex-row gap-x-4 justify-center">
              {auth.user ? (
                <Link
                  href={route(GetRoutes.Dashboard)}
                  className="text-2xl font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                >
                  You have returned, {auth.user?.name}
                </Link>
              ) : (
                <>
                  <Link
                    href={route('login')}
                    className="text-2xl font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="fixed bottom-2 left-0 flex justify-between w-full px-6">
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 sm:text-start">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/aaroncolina"
                  target="_blank"
                  className="group inline-flex items-center hover:text-gray-700 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                  rel="noreferrer"
                >
                  <img src={githubLogo} className="w-5 h-5" />
                  &nbsp; @aaroncolina
                </a>
              </div>
            </div>

            <div className="ms-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0">
              Unida PH V.1
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
