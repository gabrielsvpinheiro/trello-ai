'use client';

import LogOut from "@/components/auth/LogOut";
import { TaskBoard } from "@/components/layout/TaskBoard";

export default function Home() {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <TaskBoard />
        <div className="mt-8">
          <LogOut />
        </div>
      </div>
    </>
  );
}