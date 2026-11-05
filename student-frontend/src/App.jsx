import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import Toast from './components/Toast';
import { studentService } from './services/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Fetch all students
  const fetchStudents = async (showLoadingState = false) => {
    if (showLoadingState) setIsLoading(true);
    setIsRefreshing(true);
    try {
      const data = await studentService.getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      showToast(
        err.message || 'Could not connect to the Student API backend.',
        'error'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudents(true);
  }, []);

  // Create or Update handler
  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // Update existing student
        const updated = await studentService.updateStudent(
          editingStudent.id,
          formData
        );
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showToast(
          `Student "${updated.firstname} ${updated.lastname}" updated successfully!`
        );
        setEditingStudent(null);
      } else {
        // Create new student
        const created = await studentService.createStudent(formData);
        setStudents((prev) => [created, ...prev]);
        showToast(
          `Student "${created.firstname} ${created.lastname}" registered successfully!`
        );
      }
    } catch (err) {
      console.error('Error saving student:', err);
      showToast(err.message || 'Failed to save student record.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Inline delete handler
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await studentService.deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showToast(`Student #${id} was deleted successfully.`);
    } catch (err) {
      console.error('Error deleting student:', err);
      showToast(err.message || `Failed to delete student #${id}.`, 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditSelect = (student) => {
    setEditingStudent(student);
    // Smooth scroll to form if on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Unique courses for filter dropdown
  const availableCourses = useMemo(() => {
    const set = new Set(students.map((s) => s.course).filter(Boolean));
    return Array.from(set).sort();
  }, [students]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (student.firstname && student.firstname.toLowerCase().includes(q)) ||
        (student.lastname && student.lastname.toLowerCase().includes(q)) ||
        String(student.id).includes(q) ||
        (student.section && student.section.toLowerCase().includes(q));

      const matchesCourse =
        !selectedCourse ||
        (student.course &&
          student.course.toLowerCase() === selectedCourse.toLowerCase());

      return matchesSearch && matchesCourse;
    });
  }, [students, searchQuery, selectedCourse]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar
        onRefresh={() => fetchStudents(false)}
        isRefreshing={isRefreshing}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Stats */}
        <StatsCards students={students} />

        {/* Responsive Grid Layout (Form on Left/Top, Table on Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (Non-modal) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <StudentForm
              onSubmit={handleFormSubmit}
              editingStudent={editingStudent}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Directory / Table Area */}
          <div className="lg:col-span-8 space-y-4">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              availableCourses={availableCourses}
            />

            <StudentTable
              students={filteredStudents}
              isLoading={isLoading}
              onEdit={handleEditSelect}
              onDelete={handleDelete}
              editingStudentId={editingStudent ? editingStudent.id : null}
              deletingId={deletingId}
            />
          </div>
        </div>
      </main>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
