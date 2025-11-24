import { Users, ChevronRight } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border-2 border-gray-900 p-8 text-center">
        {/* Icon + Title */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="p-4 bg-[#003058] text-white rounded-full">
            <Users size={40} />
          </div>

          <h1 className="text-3xl font-extrabold tracking-wide">
            Welcome to Grouping Hub
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-gray-700 text-base leading-relaxed mb-8">
          Our system automatically groups students into balanced teams —
          <span className="font-semibold"> 2 Techpreneurs</span>,
          <span className="font-semibold"> 2 Entrepreneurs</span>, and
          <span className="font-semibold"> 2 Intrapreneurs</span> — based on
          their personality type.
        </p>

        {/* CTA */}
        <a
          href="/register"
          className="w-full flex items-center justify-center gap-2 bg-[#003058] text-white py-3 font-semibold text-lg"
        >
          Get Started <ChevronRight size={22} />
        </a>

        {/* Optional small login link */}
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="login" className="underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Welcome;
