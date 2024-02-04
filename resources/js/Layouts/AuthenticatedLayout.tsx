import { useState, PropsWithChildren } from 'react';
import ApplicationLogo, { LogoOrientation } from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Head, Link } from '@inertiajs/react';
import { Member } from '@/types';
import bgImage from '@/assets/images/registration-bg-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faChevronLeft, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { navItems } from '@/const';

export default function Authenticated({
  user,
  headerName = 'Home',
  leftActions,
  rightActions,
  showBackLink = false,
  children
}: PropsWithChildren<{
  user: Member;
  headerName?: string;
  titleName?: string;
  showBackLink?: boolean;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}>) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div
      className="min-h-screen bg-gray-100"
      style={{
        backgroundImage: 'url(' + bgImage + ')'
      }}
    >
      <Head title={headerName} />
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <ApplicationLogo
                    orientation={LogoOrientation.Horizontal}
                    logoClassName="block h-9 w-auto fill-current text-gray-800"
                  />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                {navItems?.map((link, index) => {
                  return (
                    <NavLink
                      key={index}
                      href={route(link.route)}
                      active={route().current(link.route)}
                      className="flex flex-row gap-x-2"
                    >
                      <FontAwesomeIcon icon={link.icon} />
                      {link.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button
                        type="button"
                        className="inline-flex gap-x-2.5 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                      >
                        <FontAwesomeIcon icon={faUser} />
                        {user.first_name} {user.last_name}
                        <svg
                          className="ms-2 -me-0.5 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route('profile.edit')}>
                      <FontAwesomeIcon icon={faUserCircle} /> &nbsp; Profile
                    </Dropdown.Link>
                    <Dropdown.Link href={route('logout')} method="post" as="button">
                      <FontAwesomeIcon icon={faSignOut} /> &nbsp; Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button
                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
          <div className="pt-2 pb-3 space-y-1">
            {navItems?.map((link, index) => {
              return (
                <ResponsiveNavLink
                  key={index}
                  href={route(link.route)}
                  active={route().current(link.route)}
                  className="flex flex-row gap-x-2"
                >
                  <FontAwesomeIcon icon={link.icon} />
                  {link.name}
                </ResponsiveNavLink>
              );
            })}
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800">{user.name}</div>
              <div className="font-medium text-sm text-gray-500">{user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route('logout')} as="button">
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-white shadow">
        <div className="flex flex-row gap-x-4 justify-between h-[75px] items-center max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-x-4 items-center">
            {showBackLink && (
              <FontAwesomeIcon
                className="cursor-pointer"
                icon={faChevronLeft}
                onClick={() => window.history.back()}
              />
            )}
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">{headerName}</h2>
            {leftActions}
          </div>
          <div className="flex flex-row justify-between gap-x-4">{rightActions}</div>
        </div>
      </header>

      {children && (
        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-y-2 py-4 drop-shadow">
          {children}
        </main>
      )}
    </div>
  );
}
