// LMS Course Types
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructor_name: string;
  instructor_title: string;
  instructor_avatar_url?: string;
  thumbnail_url?: string;
  intro_video_url?: string;
  price: number;
  discount_price?: number;
  is_free: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration_hours: number;
  language: string;
  category: string;
  tags: string[];
  enrollments_count: number;
  average_rating: number;
  reviews_count: number;
  is_published: boolean;
  is_featured: boolean;
  lifetime_access: boolean;
  certificate_available: boolean;
  requirements: string;
  what_you_will_learn: string;
  target_audience: string;
  created_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
}

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_number: number;
  created_at: string;
  updated_at: string;
}

export interface CourseLesson {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  video_url?: string;
  video_iframe_code?: string;
  video_type?: 'youtube' | 'vimeo' | 'drive' | 'other';
  video_duration_minutes?: number;
  content_text?: string;
  resources?: string;
  order_number: number;
  is_preview: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserEnrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  completed_at?: string;
  progress_percentage: number;
  payment_status: 'pending' | 'paid' | 'free';
  payment_amount?: number;
  certificate_issued_at?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at?: string;
  watch_time_seconds: number;
  last_position_seconds: number;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  certificate_number: string;
  issued_at: string;
  certificate_url: string;
  verification_url: string;
}

export interface CourseReview {
  id: string;
  course_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  review_text?: string;
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

// Extended types with relations
export interface CourseWithDetails extends Course {
  modules: (CourseModule & { lessons: CourseLesson[] })[];
}

export interface EnrollmentWithCourse extends UserEnrollment {
  course: Course;
}
