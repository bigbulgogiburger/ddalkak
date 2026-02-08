export interface Course {
  id: string;
  name: string;
  region: string;
  dateType: string;
  estimatedBudget: number;
  rating: number;
  places: Place[];
  timeline: TimelineItem[];
}

export interface Place {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
}

export interface TimelineItem {
  time: string;
  place: string;
  duration: string;
}

export interface CourseRecommendationResponse {
  courses: Course[];
  requestId: string;
  generatedAt: string;
}
