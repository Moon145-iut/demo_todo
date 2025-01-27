import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { Pomodoro } from './components/Pomodoro';
import { TodoList } from './components/TodoList';
import type { CourseOutline, StudyRoutine, PomodoroSettings, TodoItem } from './types';
import { GraduationCap, Menu, Search, Plus, Bell, Moon, Sun, Timer, ListTodo, X } from 'lucide-react';

function App() {
  const [courseOutline, setCourseOutline] = useState<CourseOutline | null>(null);
  const [studyRoutine, setStudyRoutine] = useState<StudyRoutine[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [pomodoroSettings, setPomodoroSettings] = useState<PomodoroSettings>({
    focusTime: 25,
    breakTime: 5
  });
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleFileUpload = async (file: File) => {
    // Mock data implementation remains the same
    const mockOutline: CourseOutline = {
      title: "Introduction to Computer Science",
      description: "Fundamental concepts of programming and computer science",
      topics: [
        {
          id: "1",
          title: "Variables and Data Types",
          description: "Understanding basic programming concepts",
          completed: true,
          resources: [
            {
              id: "1",
              title: "Introduction to Variables",
              type: "video",
              url: "https://example.com/video1"
            }
          ]
        },
        {
          id: "2",
          title: "Control Structures",
          description: "Loops and conditional statements",
          completed: false,
          resources: [
            {
              id: "2",
              title: "Control Flow in Programming",
              type: "pdf",
              url: "https://example.com/pdf1"
            }
          ]
        }
      ],
      deadlines: [
        {
          id: "1",
          title: "Assignment 1",
          date: "2024-03-20",
          completed: false
        },
        {
          id: "2",
          title: "Midterm Exam",
          date: "2024-04-15",
          completed: false
        }
      ]
    };

    const mockRoutine: StudyRoutine[] = [
      { id: "1", dayOfWeek: "Monday", topics: ["1"], duration: 2 },
      { id: "2", dayOfWeek: "Wednesday", topics: ["2"], duration: 2 },
      { id: "3", dayOfWeek: "Friday", topics: ["1", "2"], duration: 3 }
    ];

    setCourseOutline(mockOutline);
    setStudyRoutine(mockRoutine);
  };

  const getDueTasks = () => {
    return todos.filter(todo => 
      !todo.completed && 
      todo.dueDate && 
      new Date(todo.dueDate) < new Date()
    );
  };

  const mainContent = () => {
    if (showPomodoro) {
      return <Pomodoro settings={pomodoroSettings} onSettingsChange={setPomodoroSettings} />;
    }
    if (showTodoList) {
      return <TodoList todos={todos} setTodos={setTodos} />;
    }
    if (!courseOutline) {
      return (
        <div className="max-w-xl mx-auto mt-8">
          <FileUpload onFileSelect={handleFileUpload} />
        </div>
      );
    }
    return <Dashboard courseOutline={courseOutline} studyRoutine={studyRoutine} />;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-[#fafafa]'}`}>
      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 right-0 h-14 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b z-50`}>
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-md`}
            >
              <Menu className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <div className="flex items-center">
              <GraduationCap className="h-6 w-6 text-[#db4c3f]" />
              <span className={`ml-2 text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>StudyRoutine</span>
            </div>
          </div>
          
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className={`w-full pl-10 pr-4 py-1.5 text-sm ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-100 border-transparent text-gray-900'
                } border rounded-md focus:border-[#db4c3f] focus:ring-0 transition-colors`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-md`}>
              <Plus className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-md relative`}
              >
                <Bell className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                {getDueTasks().length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {getDueTasks().length}
                  </span>
                )}
              </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg ${
                  darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border p-4 z-50`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Overdue Tasks
                    </h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className={`p-1 rounded-md ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {getDueTasks().length > 0 ? (
                      getDueTasks().map(task => (
                        <div
                          key={task.id}
                          className={`p-2 rounded-md ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className={`text-sm font-medium ${
                            darkMode ? 'text-gray-200' : 'text-gray-700'
                          }`}>
                            {task.title}
                          </div>
                          <div className="text-xs text-red-500 mt-1">
                            Due {new Date(task.dueDate!).toLocaleString()}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No overdue tasks
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-14 flex">
        {/* Sidebar */}
        <aside className={`fixed left-0 top-14 bottom-0 w-[300px] ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-r transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4">
            <div className="space-y-1">
              {[
                { name: 'Today', onClick: () => { setShowPomodoro(false); setShowTodoList(false); } },
                { name: 'Upcoming', onClick: () => { setShowPomodoro(false); setShowTodoList(false); } },
                { name: 'All Topics', onClick: () => { setShowPomodoro(false); setShowTodoList(false); } },
                { name: 'Resources', onClick: () => { setShowPomodoro(false); setShowTodoList(false); } }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`w-full px-4 py-2 text-left text-sm ${
                    darkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  } rounded-md transition-colors`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className={`px-4 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Tools
                </h3>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => { setShowPomodoro(true); setShowTodoList(false); }}
                    className={`w-full px-4 py-2 text-left text-sm ${
                      darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    } rounded-md transition-colors flex items-center`}
                  >
                    <Timer className="h-4 w-4 mr-2" />
                    Pomodoro Timer
                  </button>
                  <button
                    onClick={() => { setShowPomodoro(false); setShowTodoList(true); }}
                    className={`w-full px-4 py-2 text-left text-sm ${
                      darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    } rounded-md transition-colors flex items-center`}
                  >
                    <ListTodo className="h-4 w-4 mr-2" />
                    Todo List
                  </button>
                </div>
              </div>

              <div>
                <h3 className={`px-4 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Settings
                </h3>
                <div className="mt-2 space-y-1">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-full px-4 py-2 text-left text-sm ${
                      darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    } rounded-md transition-colors flex items-center`}
                  >
                    {darkMode ? (
                      <Sun className="h-4 w-4 mr-2" />
                    ) : (
                      <Moon className="h-4 w-4 mr-2" />
                    )}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                </div>
              </div>

              <div>
                <h3 className={`px-4 text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                  Courses
                </h3>
                <div className="mt-2 space-y-1">
                  {courseOutline ? (
                    <button className={`w-full px-4 py-2 text-left text-sm ${
                      darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    } rounded-md transition-colors`}>
                      {courseOutline.title}
                    </button>
                  ) : (
                    <p className={`px-4 text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>No courses yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-200 ease-in-out ${sidebarOpen ? 'ml-[300px]' : 'ml-0'}`}>
          <div className="max-w-5xl mx-auto p-6">
            {mainContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;