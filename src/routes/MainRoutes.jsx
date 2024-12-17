import { lazy } from "react";

// project-imports
import Loadable from "../components/Loadable";
import DashboardLayout from '../layout/Dashboard';
import PagesLayout from '../layout/Pages';
import ProtectedRoute from './ProtectedRoute';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/default')));

// render - academic information
const Infrastructure = Loadable(lazy(() => import('../pages/infrastructure/infrastructure-list')));
const StudyPlan = Loadable(lazy(() => import('../pages/study-plan/study-plan-list')));
const TeachingStaff = Loadable(lazy(() => import('../pages/teaching-staff/teaching-staff-list')));

// render - schedule planning
const TeachingUnit = Loadable(lazy(() => import('../pages/teaching-unit/teaching-unit-list')));
const ClassSessionList = Loadable(lazy(() => import('../pages/class-session/class-session-list')));
const ClassSessionCalendar = Loadable(lazy(() => import('../pages/class-session/class-session-calendar')));

// render - file Management
const FileManagementStudyPlan = Loadable(lazy(() => import('../pages/file-management/fm-study-plan')));
const FileManagementTeachingStaff = Loadable(lazy(() => import('../pages/file-management/fm-teaching-staff')));
const FileManagementInfrastructure = Loadable(lazy(() => import('../pages/file-management/fm-infrastructure')));

// render - profile personal
const UserProfile = Loadable(lazy(() => import('../pages/profile/user')));
const UserTabPersonal = Loadable(lazy(() => import('../sections/profile/TabPersonal')));

// render - auth
const AuthLogin = Loadable(lazy(() => import('../pages/auth/login')));
const AuthRegister = Loadable(lazy(() => import('../pages/auth/register')));

// render - error
const MaintenanceError = Loadable(lazy(() => import('../pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazy(() => import('../pages/maintenance/error/500')));
const MaintenanceErrorUnauthorized= Loadable(lazy(() => import('../pages/maintenance/error/Unauthorized')))

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '/',
          element: <DashboardDefault />
        },
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },

        {
          path: 'study-plan',
          element: <StudyPlan />
        },

        {
          path: 'teaching-staff',
          element: <TeachingStaff />
        },

        {
          path: 'infrastructure',
          element: <Infrastructure />
        },

        {
          path: 'teaching-unit',
          element: <TeachingUnit />
        },

        {
          path: 'class-session-list',
          element: <ClassSessionList />
        },

        {
          path: 'class-session-calendar',
          element: <ClassSessionCalendar />
        },

        {
          path: 'studyplan-management',
          element: (
            <ProtectedRoute roleRequired={1}>
              <FileManagementStudyPlan />
            </ProtectedRoute>
          )
        },

        {
          path: 'teachingstaff-management',
          element: (
            <ProtectedRoute roleRequired={1}>
              <FileManagementTeachingStaff />
            </ProtectedRoute>
          )
        },

        {
          path: 'infrastructure-management',
          element: (
            <ProtectedRoute roleRequired={1}>
              <FileManagementInfrastructure />
            </ProtectedRoute>
          )
        },

        {
          path: 'profile',
          children: [
            {
              path: 'user',
              element: <UserProfile />,
              children: [
                {
                  path: 'personal',
                  element: <UserTabPersonal />
                }
              ]
            }
          ]
        },
        
      ]
    },
    {
      path: '/auth',
      element: <PagesLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        }
      ]
    },
    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        {
          path: '500',
          element: <MaintenanceError500 />
        }
      ]
    },
    {
      path: '/unauthorized',
      element: <MaintenanceErrorUnauthorized />
    },
    {
      path: '*',
      element: <MaintenanceError />
    }
  ]
};

export default MainRoutes;