import LogOut from "@/components/auth/LogOut";

export default function Home() {
  return (
    <>
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-white text-xl font-semibold">Space 1</h2>
            <p className="text-gray-400 mt-2">Description 1.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-white text-xl font-semibold">Space 2</h2>
            <p className="text-gray-400 mt-2">Description 2.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-white text-xl font-semibold">Space 3</h2>
            <p className="text-gray-400 mt-2">Description 3.</p>
          </div>
        </div>
        <div className="mt-8">
          <LogOut />
        </div>
      </div>
    </>
  );
}
