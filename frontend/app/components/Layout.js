'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Layout({ children }) {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('todoId');

  return (
    <div className="min-h-screen bg-white">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 w-72 h-full border-r border-gray-200">
        {/* Header */}
        <div className="p-4 flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="font-medium">TODO</span>
        </div>

        {/* Todo List */}
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <div className="p-4">
            <Link 
              href="/"
              className="block"
            >
              <div className="mb-2">
                <h3 className="text-blue-600 hover:underline">New Additions</h3>
                <p className="text-sm text-gray-600">
                  To stay representative of framework & new example apps.
                </p>
              </div>
              <div className="text-sm text-gray-500">4/2/2025</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72">
        {children}
      </div>
    </div>
  );
} 