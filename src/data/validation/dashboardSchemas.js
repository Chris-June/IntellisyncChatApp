/**
 * Validation schemas for dashboard data
 * To be used with a validation library (e.g., Yup, Joi, or Zod)
 * This is a setup file - implementation will be done later
 */

export const StudentDataSchemas = {
  progress: {
    type: 'object',
    required: ['subjectName', 'completionRate', 'score', 'lastUpdated'],
    properties: {
      subjectName: { type: 'string', minLength: 1 },
      completionRate: { type: 'number', minimum: 0, maximum: 100 },
      score: { type: 'number', minimum: 0, maximum: 100 },
      lastUpdated: { type: 'string', format: 'date-time' }
    }
  },
  
  performance: {
    type: 'object',
    required: ['subject', 'currentGrade', 'improvement'],
    properties: {
      subject: { type: 'string', minLength: 1 },
      currentGrade: { type: 'number', minimum: 0, maximum: 100 },
      improvement: { type: 'number' },
      assessments: { 
        type: 'array',
        items: { type: 'object' }
      }
    }
  }
};

export const TeacherDataSchemas = {
  classMetrics: {
    type: 'object',
    required: ['totalStudents', 'averageAttendance', 'averagePerformance'],
    properties: {
      totalStudents: { type: 'number', minimum: 0 },
      averageAttendance: { type: 'number', minimum: 0, maximum: 100 },
      averagePerformance: { type: 'number', minimum: 0, maximum: 100 },
      subjectBreakdown: { type: 'object' }
    }
  }
};

export const ParentDataSchemas = {
  childProgress: {
    type: 'object',
    required: ['childId', 'progressBySubject', 'overallProgress'],
    properties: {
      childId: { type: 'string', minLength: 1 },
      progressBySubject: { 
        type: 'array',
        items: { $ref: '#/definitions/studentProgress' }
      },
      overallProgress: { type: 'number', minimum: 0, maximum: 100 },
      lastUpdated: { type: 'string', format: 'date-time' }
    }
  }
};
