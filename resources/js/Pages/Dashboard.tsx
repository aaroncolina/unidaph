import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
  return (
    <AuthenticatedLayout user={auth.user} headerName="Dashboard">
      <div className="p-6 text-gray-900 bg-white rounded-lg">You&apos;re logged in!</div>
    </AuthenticatedLayout>
  );
}
