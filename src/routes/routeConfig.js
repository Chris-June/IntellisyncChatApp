import Dashboard from '../pages/Dashboard';
import GuidanceCouncilorAssistant from '../pages/GuidanceCouncilorAssistant';
import EnglishAssistant from '../pages/EnglishAssistant';
import FrenchLanguageAssistant from '../pages/FrenchLanguageAssistant';
import GeographyAssistant from '../pages/GeographyAssistant';
import HealthWellnessAssistant from '../pages/HealthWellnessAssistant';
import HistoryAssistant from '../pages/HistoryAssistant';
import MathAssistant from '../pages/MathAssistant';
import ScienceAssistant from '../pages/ScienceAssistant';
import SocialStudiesAssistant from '../pages/SocialStudiesAssistant';
//update routes and breadcrumbs as you add new assistants

export const routes = [
  {
    path: '/dashboard',
    component: Dashboard,
    breadcrumb: 'Dashboard',
  },
  {
    path: '/guidance-counselor',
    component: GuidanceCouncilorAssistant,
    breadcrumb: 'Guidance Counselor',
  },
  {
    path: '/english',
    component: EnglishAssistant,
    breadcrumb: 'English',
  },
  {
    path: '/french-language',
    component: FrenchLanguageAssistant,
    breadcrumb: 'French Language',
  },
  {
    path: '/geography',
    component: GeographyAssistant,
    breadcrumb: 'Geography',
  },
  {
    path: '/health-wellness',
    component: HealthWellnessAssistant,
    breadcrumb: 'Health & Wellness',
  },
  {
    path: '/history',
    component: HistoryAssistant,
    breadcrumb: 'History',
  },
  {
    path: '/math',
    component: MathAssistant,
    breadcrumb: 'Mathematics',
  },
  {
    path: '/science',
    component: ScienceAssistant,
    breadcrumb: 'Science',
  },
  {
    path: '/social-studies',
    component: SocialStudiesAssistant,
    breadcrumb: 'Social Studies',
  },
];

export const getBreadcrumbsForPath = (path) => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [];
  let currentPath = '';

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const route = routes.find(r => r.path === currentPath);
    
    if (route) {
      breadcrumbs.push({
        label: route.breadcrumb,
        path: currentPath,
      });
    }
  });

  return breadcrumbs;
};

export const findRouteByPath = (path) => {
  return routes.find(route => route.path === path);
};
