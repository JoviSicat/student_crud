import React from 'react';
import { Users, BookOpen, Layers, Award } from 'lucide-react';

export default function StatsCards({ students }) {
  const totalStudents = students.length;
  
  // Calculate unique courses and sections
  const courses = [...new Set(students.map((s) => s.course).filter(Boolean))];
  const sections = [...new Set(students.map((s) => s.section).filter(Boolean))];

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-100',
    },
    {
      title: 'Active Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Total Sections',
      value: sections.length,
      icon: Layers,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {stat.value}
              </h3>
            </div>
            <div className={`p-3 rounded-xl border ${stat.bg} ${stat.color}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
