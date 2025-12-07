import { Users, UserCheck, UserX, Award, GraduationCap, Inbox } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { AdmissionChart } from '@/components/dashboard/AdmissionChart';
import { AttendanceChart } from '@/components/dashboard/AttendanceChart';
import { PerformanceChart } from '@/components/dashboard/PerformanceChart';

const kpiData = [
  {
    title: 'Total Students',
    value: 2548,
    trend: { value: 12, isPositive: true },
    icon: Users,
    gradient: 'primary' as const,
  },
  {
    title: 'Active Students',
    value: 2186,
    trend: { value: 8, isPositive: true },
    icon: UserCheck,
    gradient: 'success' as const,
  },
  {
    title: 'Discontinued Students',
    value: 124,
    trend: { value: 3, isPositive: false },
    icon: UserX,
    gradient: 'warning' as const,
  },
  {
    title: 'Alumni',
    value: 856,
    trend: { value: 15, isPositive: true },
    icon: Award,
    gradient: 'info' as const,
  },
  {
    title: 'Pending Admissions',
    value: 89,
    trend: { value: 22, isPositive: true },
    icon: GraduationCap,
    gradient: 'accent' as const,
  },
  {
    title: 'Total Applications',
    value: 156,
    trend: { value: 5, isPositive: true },
    icon: Inbox,
    gradient: 'primary' as const,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back, <span className="gradient-text">Admin</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening at Sirajganj Polytechnic Institute today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={kpi.title}
            {...kpi}
            delay={index * 0.1}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentChart />
        <AdmissionChart />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceChart />
        <PerformanceChart />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}
