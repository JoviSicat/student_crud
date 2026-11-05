/**
 * Service for communicating with the Student REST API.
 * Uses Vite proxy configured to forward `/sicat` to http://localhost:8080.
 */

// Base API URL supports:
// 1. Local development (empty -> uses Vite dev proxy /sicat)
// 2. Production URL with scheme (e.g. https://student-backend.onrender.com)
// 3. Raw hostname from Render property:host (e.g. student-backend.onrender.com -> automatically prepends https://)
let rawApiUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
if (rawApiUrl && !rawApiUrl.startsWith('http://') && !rawApiUrl.startsWith('https://')) {
  rawApiUrl = `https://${rawApiUrl}`;
}
const API_BASE_URL = rawApiUrl.replace(/\/$/, '');
const BASE_URL = `${API_BASE_URL}/sicat/students`;

export const studentService = {
  /**
   * Fetch all students
   * @returns {Promise<Array>} List of students
   */
  async getAllStudents() {
    const response = await fetch(BASE_URL, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch students (HTTP ${response.status})`);
    }
    return response.json();
  },

  /**
   * Fetch a single student by ID
   * @param {number|string} id 
   * @returns {Promise<Object>} Student object
   */
  async getStudentById(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch student #${id} (HTTP ${response.status})`);
    }
    return response.json();
  },

  /**
   * Create a new student
   * @param {Object} student - { firstname, lastname, course, section }
   * @returns {Promise<Object>} Created student
   */
  async createStudent(student) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || `Failed to create student (HTTP ${response.status})`);
    }
    return response.json();
  },

  /**
   * Update an existing student
   * @param {number|string} id 
   * @param {Object} student - { firstname, lastname, course, section }
   * @returns {Promise<Object>} Updated student
   */
  async updateStudent(id, student) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(student),
    });
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || `Failed to update student #${id} (HTTP ${response.status})`);
    }
    return response.json();
  },

  /**
   * Delete a student by ID
   * @param {number|string} id 
   * @returns {Promise<string>} Response message
   */
  async deleteStudent(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorMsg = await response.text();
      throw new Error(errorMsg || `Failed to delete student #${id} (HTTP ${response.status})`);
    }
    return response.text();
  },
};
