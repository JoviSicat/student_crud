import React, { useState } from 'react';
import { Edit2, Trash2, Check, X, AlertTriangle, UserX } from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  onEdit,
  onDelete,
  editingStudentId,
  deletingId,
}) {
  // Inline confirmation state: tracks which student ID is currently prompting for delete
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const getCourseBadgeColor = (course) => {
    if (!course) return 'bg-slate-100 text-slate-700 border-slate-200';
    const c = course.toUpperCase();
    if (c.includes('CS') || c.includes('COMP'))
      return 'bg-blue-50 text-blue-700 border-blue-200';
    if (c.includes('IT'))
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (c.includes('IS'))
      return 'bg-purple-50 text-purple-700 border-purple-200';
    if (c.includes('ENG'))
      return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-indigo-50 text-indigo-700 border-indigo-200';
  };

  const handleStartDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    setConfirmDeleteId(null);
    await onDelete(id);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-8 text-center">
        <div className="inline-block w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-medium text-slate-500">Loading student records...</p>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-12 text-center">
        <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserX className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No Students Found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          No student records match your query or the database is currently empty.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">ID</th>
              <th className="py-3.5 px-4 sm:px-6">Student Name</th>
              <th className="py-3.5 px-4 sm:px-6">Course</th>
              <th className="py-3.5 px-4 sm:px-6">Section</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students.map((student) => {
              const isEditing = editingStudentId === student.id;
              const isConfirming = confirmDeleteId === student.id;
              const isDeletingThis = deletingId === student.id;

              return (
                <tr
                  key={student.id}
                  className={`transition-colors ${
                    isEditing
                      ? 'bg-amber-50/70 font-medium'
                      : isConfirming
                      ? 'bg-rose-50/60'
                      : 'hover:bg-slate-50/60'
                  }`}
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-xs text-slate-500">
                    #{student.id}
                  </td>

                  {/* Name */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="font-semibold text-slate-900">
                      {student.firstname} {student.lastname}
                    </div>
                  </td>

                  {/* Course */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCourseBadgeColor(
                        student.course
                      )}`}
                    >
                      {student.course}
                    </span>
                  </td>

                  {/* Section */}
                  <td className="py-3.5 px-4 sm:px-6 text-slate-600 font-medium">
                    {student.section}
                  </td>

                  {/* Actions (Inline confirmation, No modal!) */}
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    {isConfirming ? (
                      <div className="inline-flex items-center gap-1.5 justify-end">
                        <span className="text-xs font-semibold text-rose-700 flex items-center gap-1 mr-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          Delete?
                        </span>
                        <button
                          type="button"
                          onClick={() => handleConfirmDelete(student.id)}
                          className="px-2.5 py-1 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-md transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelDelete}
                          className="px-2.5 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <X className="w-3.5 h-3.5" />
                          No
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1 justify-end">
                        <button
                          type="button"
                          onClick={() => onEdit(student)}
                          disabled={isDeletingThis}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            isEditing
                              ? 'bg-amber-200 text-amber-900'
                              : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'
                          }`}
                          title="Edit student"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStartDelete(student.id)}
                          disabled={isDeletingThis}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer disabled:opacity-50"
                          title="Delete student"
                        >
                          {isDeletingThis ? (
                            <span className="inline-block w-4 h-4 border-2 border-rose-600 border-t-transparent rounded-full animate-spin"></span>
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-4 sm:px-6 py-3 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-500 flex justify-between items-center">
        <span>
          Showing <span className="font-semibold text-slate-700">{students.length}</span> {students.length === 1 ? 'student' : 'students'}
        </span>
        <span className="text-slate-400">Inline Actions Active</span>
      </div>
    </div>
  );
}
