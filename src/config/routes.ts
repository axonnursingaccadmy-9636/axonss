export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "pmgautamjaipur@gmail.com";

export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  COURSES: "/courses",
  COURSE_DETAILS: "/courses/:batchId",

  // Student Learning
  LEARN: "/learn/:batchId",
  LEARN_SUBJECT: "/learn/:batchId/subject/:subjectId",
  LEARN_CHAPTER: "/learn/:batchId/subject/:subjectId/chapter/:chapterId",
  LEARN_CLASS: "/learn/:batchId/class/:classId",
  LEARN_CLASS_MCQ: "/learn/:batchId/class/:classId/mcq",
  LEARN_CLASS_MCQ_RESULT: "/learn/:batchId/class/:classId/mcq/result/:attemptId",
  LEARN_WEEKLY_WARRIOR: "/learn/:batchId/weekly-warrior",
  LEARN_WW_PLAYER: "/learn/:batchId/weekly-warrior/:testId",
  LEARN_WW_RESULT: "/learn/:batchId/weekly-warrior/:testId/result/:attemptId",

  // Student Portal
  STUDENT: "/student",
  STUDENT_COURSES: "/student/courses",
  STUDENT_ALL_COURSES: "/student/all-courses",
  STUDENT_PROFILE: "/student/profile",
  STUDENT_CHATS: "/student/chats",
  STUDENT_NOTIFICATIONS: "/student/notifications",
  STUDENT_PROGRESS: "/student/progress",
  STUDENT_LEADERBOARD: "/student/leaderboard",

  // Admin
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_STUDENTS: "/admin/students",
  ADMIN_BATCHES: "/admin/batches",
  ADMIN_SUBJECTS: "/admin/subjects",
  ADMIN_CHAPTERS: "/admin/chapters",
  ADMIN_CLASSES: "/admin/classes",
  ADMIN_PDF_NOTES: "/admin/pdf-notes",
  ADMIN_MCQ_TESTS: "/admin/mcq-tests",
  ADMIN_MCQ_QUESTIONS: "/admin/mcq-tests/:testId/questions",
  ADMIN_COUPONS: "/admin/coupons",
  ADMIN_PAYMENTS: "/admin/payments",
  ADMIN_WEEKLY_WARRIOR: "/admin/weekly-warrior",
  ADMIN_WW_QUESTIONS: "/admin/weekly-warrior/:testId/questions",
  ADMIN_AUDIT_LOGS: "/admin/audit-logs",
  ADMIN_BRANDING: "/admin/branding",
} as const;
