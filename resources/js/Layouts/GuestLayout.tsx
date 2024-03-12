import ApplicationLogo from '@/Components/Logo/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import bgImage from '@/assets/images/registration-bg-image.png';

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div
      className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100"
      style={{
        backgroundImage: 'url(' + bgImage + ')'
      }}
    >
      <div>
        <Link href="/">
          <ApplicationLogo logoClassName="w-[250px] h-auto fill-current text-gray-500" />
        </Link>
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
