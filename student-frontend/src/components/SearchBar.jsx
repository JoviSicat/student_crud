import React from 'react';
import { Search, X, Filter } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  onSearchChange,
  selectedCourse,
  onCourseChange,
  availableCourses,
}) {
  const hasFilter = searchQuery.trim() !== '' || selectedCourse !== '';

  const handleClear = () => {
    onSearchChange('');
    onCourseChange('');
  };

  return (
    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs mb-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by first name, last name, or ID..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative w-full sm:w-48">
          <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={selectedCourse}
            onChange={(e) => onCourseChange(e.target.value)}
            className="w-full pl-8 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-colors appearance-none cursor-pointer text-slate-700"
          >
            <option value="">All Courses</option>
            {availableCourses.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {hasFilter && (
          <button
            onClick={handleClear}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Clear filters"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
