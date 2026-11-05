import React, { useState, useEffect } from 'react';
import { UserPlus, UserCheck, XCircle, AlertCircle } from 'lucide-react';

export default function StudentForm({
  onSubmit,
  editingStudent,
  onCancelEdit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setErrors({});
    }
  }, [editingStudent]);

  const validate = () => {
    const errs = {};
    if (!formData.firstname.trim()) errs.firstname = 'First name is required';
    if (!formData.lastname.trim()) errs.lastname = 'Last name is required';
    if (!formData.course.trim()) errs.course = 'Course is required';
    if (!formData.section.trim()) errs.section = 'Section is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      course: formData.course.trim(),
      section: formData.section.trim(),
    });
  };

  const isEditMode = Boolean(editingStudent);

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs ${
        isEditMode
          ? 'border-indigo-400 ring-2 ring-indigo-500/10'
          : 'border-slate-200'
      } p-5 lg:p-6`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center space-x-2.5">
          <div
            className={`p-2 rounded-lg ${
              isEditMode
                ? 'bg-amber-100 text-amber-700'
                : 'bg-indigo-50 text-indigo-600'
            }`}
          >
            {isEditMode ? (
              <UserCheck className="w-5 h-5" />
            ) : (
              <UserPlus className="w-5 h-5" />
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditMode
                ? `Edit Student #${editingStudent.id}`
                : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditMode
                ? 'Update student information below'
                : 'Enter student details to register'}
            </p>
          </div>
        </div>

        {isEditMode && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1"
          >
            <XCircle className="w-3.5 h-3.5" />
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="e.g. Maria"
            className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.firstname
                ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
            }`}
          />
          {errors.firstname && (
            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.firstname}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="e.g. Santos"
            className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.lastname
                ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
            }`}
          />
          {errors.lastname && (
            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.lastname}
            </p>
          )}
        </div>

        {/* Course */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Course / Program <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="e.g. BSCS or BSIT"
            className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.course
                ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
            }`}
          />
          {errors.course && (
            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.course}
            </p>
          )}
        </div>

        {/* Section */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Section <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="section"
            value={formData.section}
            onChange={handleChange}
            placeholder="e.g. 3A or 4B"
            className={`w-full px-3.5 py-2 text-sm bg-slate-50 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
              errors.section
                ? 'border-rose-300 focus:ring-rose-500/20 focus:border-rose-500'
                : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600'
            }`}
          />
          {errors.section && (
            <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.section}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 ${
              isEditMode
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {isSubmitting ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : isEditMode ? (
              <>
                <UserCheck className="w-4 h-4" />
                Update Student
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Register Student
              </>
            )}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="py-2.5 px-3.5 text-sm font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
