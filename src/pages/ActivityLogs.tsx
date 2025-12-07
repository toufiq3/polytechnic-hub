import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Activity, Filter, User, FileText, Users, GraduationCap, Settings, Check, X, Edit, Trash2, Plus, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const logsData = [
  { id: 1, time: '2024-02-15 14:32:15', user: 'Admin User', action: 'Updated', target: 'Student Profile', targetName: 'Md. Rahim Uddin', icon: Edit, color: 'text-primary' },
  { id: 2, time: '2024-02-15 14:28:45', user: 'Admin User', action: 'Approved', target: 'Application', targetName: 'APP-2024-002', icon: Check, color: 'text-success' },
  { id: 3, time: '2024-02-15 13:55:20', user: 'Admin User', action: 'Created', target: 'Student', targetName: 'New Student Registration', icon: Plus, color: 'text-info' },
  { id: 4, time: '2024-02-15 13:45:10', user: 'Admin User', action: 'Rejected', target: 'Correction Request', targetName: 'CR-2024-005', icon: X, color: 'text-destructive' },
  { id: 5, time: '2024-02-15 12:30:00', user: 'Admin User', action: 'Viewed', target: 'Document', targetName: 'SSC Certificate', icon: Eye, color: 'text-muted-foreground' },
  { id: 6, time: '2024-02-15 11:22:35', user: 'Admin User', action: 'Updated', target: 'Settings', targetName: 'Institute Information', icon: Settings, color: 'text-primary' },
  { id: 7, time: '2024-02-15 10:15:40', user: 'Admin User', action: 'Approved', target: 'Admission', targetName: 'Fatima Akter', icon: GraduationCap, color: 'text-success' },
  { id: 8, time: '2024-02-15 09:45:25', user: 'Admin User', action: 'Deleted', target: 'Document', targetName: 'Old Certificate', icon: Trash2, color: 'text-destructive' },
  { id: 9, time: '2024-02-14 16:30:15', user: 'Admin User', action: 'Created', target: 'Class Routine', targetName: 'Computer Technology - 4th Sem', icon: Plus, color: 'text-info' },
  { id: 10, time: '2024-02-14 15:20:00', user: 'Admin User', action: 'Updated', target: 'Attendance', targetName: 'March 2024 Records', icon: Edit, color: 'text-primary' },
  { id: 11, time: '2024-02-14 14:10:30', user: 'Admin User', action: 'Approved', target: 'Scholarship', targetName: 'Merit Scholarship 2024', icon: Check, color: 'text-success' },
  { id: 12, time: '2024-02-14 11:45:20', user: 'Admin User', action: 'Updated', target: 'Marks', targetName: 'Mid Term Results', icon: Edit, color: 'text-primary' },
  { id: 13, time: '2024-02-14 10:30:00', user: 'Admin User', action: 'Created', target: 'Alumni', targetName: 'Batch 2023 Graduates', icon: GraduationCap, color: 'text-info' },
  { id: 14, time: '2024-02-14 09:15:45', user: 'Admin User', action: 'Viewed', target: 'Analytics', targetName: 'Monthly Report', icon: Eye, color: 'text-muted-foreground' },
  { id: 15, time: '2024-02-13 17:00:00', user: 'Admin User', action: 'Updated', target: 'Department', targetName: 'Added Electronics Technology', icon: Plus, color: 'text-info' },
];

const actionFilters = ['All Actions', 'Created', 'Updated', 'Approved', 'Rejected', 'Deleted', 'Viewed'];
const targetFilters = ['All Targets', 'Student', 'Application', 'Admission', 'Document', 'Settings', 'Attendance', 'Marks'];

const getActionColor = (action: string) => {
  switch (action) {
    case 'Created': return 'bg-info/20 text-info border-info/30';
    case 'Updated': return 'bg-primary/20 text-primary border-primary/30';
    case 'Approved': return 'bg-success/20 text-success border-success/30';
    case 'Rejected': return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'Deleted': return 'bg-destructive/20 text-destructive border-destructive/30';
    case 'Viewed': return 'bg-muted text-muted-foreground border-muted';
    default: return 'bg-muted text-muted-foreground';
  }
};

export default function ActivityLogs() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All Actions');
  const [targetFilter, setTargetFilter] = useState('All Targets');

  const filteredLogs = logsData.filter(log => {
    const matchesSearch = log.targetName.toLowerCase().includes(search.toLowerCase()) || log.user.toLowerCase().includes(search.toLowerCase()) || log.target.toLowerCase().includes(search.toLowerCase());
    const matchesAction = actionFilter === 'All Actions' || log.action === actionFilter;
    const matchesTarget = targetFilter === 'All Targets' || log.target === targetFilter;
    return matchesSearch && matchesAction && matchesTarget;
  });

  const todayLogs = filteredLogs.filter(log => log.time.startsWith('2024-02-15'));
  const yesterdayLogs = filteredLogs.filter(log => log.time.startsWith('2024-02-14'));
  const olderLogs = filteredLogs.filter(log => log.time.startsWith('2024-02-13'));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Activity Logs</h1>
        <p className="text-muted-foreground">View audit logs and track all system activities</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{logsData.length}</p>
              <p className="text-xs text-muted-foreground">Total Activities</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{logsData.filter(l => l.action === 'Approved').length}</p>
              <p className="text-xs text-muted-foreground">Approvals</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{logsData.filter(l => l.action === 'Updated').length}</p>
              <p className="text-xs text-muted-foreground">Updates</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-info">{logsData.filter(l => l.action === 'Created').length}</p>
              <p className="text-xs text-muted-foreground">Creations</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {actionFilters.map(a => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={targetFilter} onValueChange={setTargetFilter}>
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {targetFilters.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Timeline */}
      <div className="space-y-6">
        {/* Today */}
        {todayLogs.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Today
            </h3>
            <Card className="glass-card">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {todayLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50 ${log.color}`}>
                        <log.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">{log.user}</span>
                          <Badge variant="outline" className={getActionColor(log.action)}>
                            {log.action}
                          </Badge>
                          <span className="text-muted-foreground">{log.target}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{log.targetName}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {log.time.split(' ')[1]}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Yesterday */}
        {yesterdayLogs.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Yesterday
            </h3>
            <Card className="glass-card">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {yesterdayLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50 ${log.color}`}>
                        <log.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">{log.user}</span>
                          <Badge variant="outline" className={getActionColor(log.action)}>
                            {log.action}
                          </Badge>
                          <span className="text-muted-foreground">{log.target}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{log.targetName}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {log.time.split(' ')[1]}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Older */}
        {olderLogs.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              February 13, 2024
            </h3>
            <Card className="glass-card">
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {olderLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50 ${log.color}`}>
                        <log.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">{log.user}</span>
                          <Badge variant="outline" className={getActionColor(log.action)}>
                            {log.action}
                          </Badge>
                          <span className="text-muted-foreground">{log.target}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{log.targetName}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {log.time.split(' ')[1]}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {filteredLogs.length === 0 && (
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No activity logs found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
