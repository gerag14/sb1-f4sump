import React from 'react';
import { GraduationCap, Play, Book, Users, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  instructor: string;
  rating: number;
  enrolled: number;
  image: string;
}

export default function Training() {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Fundamentos de Lubricación',
      description: 'Aprende los conceptos básicos de lubricación y mantenimiento de vehículos.',
      duration: '2 horas',
      level: 'Básico',
      instructor: 'Carlos Rodríguez',
      rating: 4.8,
      enrolled: 156,
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: '2',
      title: 'Diagnóstico Avanzado',
      description: 'Técnicas avanzadas de diagnóstico y solución de problemas.',
      duration: '4 horas',
      level: 'Avanzado',
      instructor: 'Ana Martínez',
      rating: 4.9,
      enrolled: 89,
      image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Centro de Capacitación</h2>
          <p className="text-gray-600 mt-1">Mejora tus habilidades y conocimientos</p>
        </div>
        <GraduationCap className="w-8 h-8 text-blue-600" />
      </div>

      {/* Course Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <Play className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Cursos en Video</h3>
          <p className="text-gray-600">Aprende a tu propio ritmo con nuestros cursos en video</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <Book className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Documentación</h3>
          <p className="text-gray-600">Accede a guías técnicas y manuales detallados</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <Users className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="font-semibold text-lg mb-2">Comunidad</h3>
          <p className="text-gray-600">Comparte experiencias con otros profesionales</p>
        </div>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium
                  ${course.level === 'Básico' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                  {course.level}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{course.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{course.duration}</span>
                <span>{course.enrolled} estudiantes</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
                <button className="btn btn-primary text-sm">
                  Comenzar Curso
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}