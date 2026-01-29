import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function ContentRemoved() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black px-4">
            <div className="max-w-md w-full text-center bg-zinc-900/80 backdrop-blur rounded-2xl p-8 shadow-2xl border border-zinc-800">

                <div className="flex justify-center mb-4">
                    <div className="bg-pink-600/20 text-pink-500 p-4 rounded-full">
                        <AlertTriangle size={36} />
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Content Has Been Removed
                </h1>

                <p className="text-zinc-400 text-sm sm:text-base mb-6">
                    This album is no longer available.
                    It may have been removed due to policy or user request.
                </p>

                <Link
                    href="/"
                    className="inline-block w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition shadow-lg"
                >
                    Go Back to Homepage
                </Link>

            </div>
        </div>
    );
}
