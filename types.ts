export interface CourseOutline {
  title: string;
  description: string;
  topics: Topic[];
  deadlines: Deadline[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'link';
  url: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

export interface StudyRoutine {
  id: string;
  dayOfWeek: string;
  topics: string[];
  duration: number;
}

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string | null;
  isOverdue?: boolean;
}

export interface PomodoroSettings {
  focusTime: number;
  breakTime: number;
}