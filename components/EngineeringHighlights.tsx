
import React from 'react';

interface EngineeringHighlightsProps {
  highlights: string[];
}

// Engineering highlights section 工程亮点部分
const EngineeringHighlights: React.FC<EngineeringHighlightsProps> = ({ highlights }) => {
  return (
    <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 lg:p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
        <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Engineering Highlights
      </h3>
      <ul className="space-y-4">
        {highlights.map((highlight, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 text-green-500 mt-1">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="ml-3 text-slate-700 leading-relaxed">{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EngineeringHighlights;
