'use client';

import LogOut from "@/components/auth/LogOut";
import { Block } from "@/components/layout/Block";

export default function Home() {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <Block
            title="Backlog"
            description="..."
          />
          <Block
            title="In Progress"
            description="..."
          />
          <Block
            title="Done"
            description="..."
          />
        </div>
        <div className="mt-8">
          <LogOut />
        </div>
      </div>
    </>
  );
}
