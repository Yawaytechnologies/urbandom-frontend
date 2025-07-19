import React from "react";
import { UserCheck, FileSearch, Users } from "lucide-react";
export default function PGOverview() {
  return (
    <section className="py-14 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-12">
          Benefits of our <span className="text-blue-600">PG/Co-Living</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Card 1 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/stressFreeSearch.803f8c7e.webp"
              alt="Stress free search"
              className="w-40 h-40 mb-4 object-contain"
            />
            <h3 className="font-semibold text-gray-800 text-lg mb-2">
              Stress free search
            </h3>
            <p className="text-gray-600 text-sm">
              Real property photos<br />and Transparent pricing
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/findYourMatch.8b4c0fa5.webp"
              alt="Find your Match"
              className="w-40 h-40 mb-4 object-contain"
            />
            <h3 className="font-semibold text-gray-800 text-lg mb-2">
              Find your Match
            </h3>
            <p className="text-gray-600 text-sm">
              Lots of options to choose from<br />
              (private, twin & multi-sharing)
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/bonAppetite.c1028fc9.webp"
              alt="Bon appetite"
              className="w-40 h-40 mb-4 object-contain"
            />
            <h3 className="font-semibold text-gray-800 text-lg mb-2">
              Bon appetite
            </h3>
            <p className="text-gray-600 text-sm">
              Info on meal type and<br />
              offerings to know what’s cooking
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center text-center">
            <img
              src="/yourLife.d015d745.webp"
              alt="Your Life, Your Rules"
              className="w-40 h-40 mb-4 object-contain"
            />
            <h3 className="font-semibold text-gray-800 text-lg mb-2">
              Your Life, Your Rules
            </h3>
            <p className="text-gray-600 text-sm">
              Advance info on house<br />
              rules to live like you do
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
