"use client";

import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const handleStart = () => {
    // store flag in localStorage so onboarding is only shown once
    localStorage.setItem("seenOnboarding", "true");
    router.push("/jobs"); // redirect to Jobs board
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6">
      <div className="max-w-3xl text-center">
        <div className="p-6 bg-gray-800 rounded-xl shadow-md">
          <h1 className="text-4xl font-bold mb-2">TalentFlow</h1>
          <p className="text-gray-300 mb-6">
            A mini hiring platform to simplify job management, candidate tracking, and assessments.
          </p>
        </div>

        <p className="mt-8 text-gray-400">
          TalentFlow helps HR teams streamline the hiring process. Create and manage jobs, track
          candidates across stages, and design assessments — all in one place, without external dependencies.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-lg">📝 Jobs</h3>
            <p className="text-sm text-gray-400 mt-2">
              Post jobs, edit details, reorder via drag-and-drop, and archive/unarchive.
            </p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-lg">👩‍💼 Candidates</h3>
            <p className="text-sm text-gray-400 mt-2">
              Manage applications, move candidates across stages, view their profile timeline, and add notes.
            </p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <h3 className="font-semibold text-lg">📑 Assessments</h3>
            <p className="text-sm text-gray-400 mt-2">
              Build custom quizzes/forms with live preview, validations, and conditional questions.
            </p>
          </div>
        </div>

        {/* Flow */}
        <div className="mt-10">
          <h2 className="font-bold text-xl mb-4">How It Works</h2>
          <div className="flex items-center justify-center space-x-4">
            <span className="px-3 py-1 bg-blue-600 rounded-full">1</span>
            <span>Create a Job</span>
            <span>→</span>
            <span className="px-3 py-1 bg-blue-600 rounded-full">2</span>
            <span>Candidates Apply</span>
            <span>→</span>
            <span className="px-3 py-1 bg-blue-600 rounded-full">3</span>
            <span>Assessments Evaluate</span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          className="mt-10 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
        >
          Start Hiring →
        </button>
      </div>
    </div>
  );
}
