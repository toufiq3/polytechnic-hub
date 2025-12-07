import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, BookOpen, Filter, Save, Download, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const departments = ['Computer Technology', 'Electrical Technology', 'Civil Technology', 'Mechanical Technology'];
const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const subjects = ['Mathematics', 'Physics', 'Programming', 'Database', 'Electronics', 'English'];
const months = ['January', 'February', 'March', 'April', 'May', 'June'];
const examTypes = ['Class Test', 'Mid Term', 'Final Exam', 'Assignment'];

const attendanceData = [
  { id: 1, roll: '2001', name: 'Md. Rahim Uddin', present: 22, absent: 3, percentage: 88 },
  { id: 2, roll: '2002', name: 'Fatima Akter', present: 24, absent: 1, percentage: 96 },
  { id: 3, roll: '2003', name: 'Kamal Hossain', present: 20, absent: 5, percentage: 80 },
  { id: 4, roll: '2004', name: 'Nusrat Jahan', present: 23, absent: 2, percentage: 92 },
  { id: 5, roll: '2005', name: 'Arif Ahmed', present: 18, absent: 7, percentage: 72 },
  { id: 6, roll: '2006', name: 'Sumaiya Rahman', present: 25, absent: 0, percentage: 100 },
  { id: 7, roll: '2007', name: 'Habibur Rahman', present: 21, absent: 4, percentage: 84 },
  { id: 8, roll: '2008', name: 'Tahmina Khatun', present: 23, absent: 2, percentage: 92 },
];

const marksData = [
  { id: 1, roll: '2001', name: 'Md. Rahim Uddin', classTest: 18, midTerm: 35, assignment: 8, total: 61 },
  { id: 2, roll: '2002', name: 'Fatima Akter', classTest: 20, midTerm: 42, assignment: 10, total: 72 },
  { id: 3, roll: '2003', name: 'Kamal Hossain', classTest: 15, midTerm: 30, assignment: 7, total: 52 },
  { id: 4, roll: '2004', name: 'Nusrat Jahan', classTest: 19, midTerm: 38, assignment: 9, total: 66 },
  { id: 5, roll: '2005', name: 'Arif Ahmed', classTest: 12, midTerm: 25, assignment: 6, total: 43 },
  { id: 6, roll: '2006', name: 'Sumaiya Rahman', classTest: 20, midTerm: 45, assignment: 10, total: 75 },
  { id: 7, roll: '2007', name: 'Habibur Rahman', classTest: 16, midTerm: 32, assignment: 8, total: 56 },
  { id: 8, roll: '2008', name: 'Tahmina Khatun', classTest: 18, midTerm: 40, assignment: 9, total: 67 },
];

const chartData = [
  { month: 'Jan', attendance: 85, avgMarks: 65 },
  { month: 'Feb', attendance: 88, avgMarks: 68 },
  { month: 'Mar', attendance: 82, avgMarks: 62 },
  { month: 'Apr', attendance: 90, avgMarks: 72 },
  { month: 'May', attendance: 87, avgMarks: 70 },
  { month: 'Jun', attendance: 92, avgMarks: 75 },
];

export default function AttendanceMarks() {
  const [department, setDepartment] = useState('Computer Technology');
  const [semester, setSemester] = useState('4th');
  const [subject, setSubject] = useState('Programming');
  const [month, setMonth] = useState('March');
  const [examType, setExamType] = useState('Mid Term');
  const [marks, setMarks] = useState(marksData);
  const { toast } = useToast();

  const handleMarksChange = (id: number, field: string, value: string) => {
    setMarks(prev => prev.map(m => 
      m.id === id ? { ...m, [field]: parseInt(value) || 0 } : m
    ));
  };

  const handleSaveMarks = () => {
    toast({
      title: "Marks Saved",
      description: "All marks have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance & Marks</h1>
          <p className="text-muted-foreground">Track student attendance and manage examination marks</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">48</p>
                  <p className="text-xs text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                  <p className="text-xs text-muted-foreground">Avg Attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">68%</p>
                  <p className="text-xs text-muted-foreground">Avg Marks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">25</p>
                  <p className="text-xs text-muted-foreground">Classes This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="attendance" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="attendance" className="gap-2">
            <ClipboardCheck className="w-4 h-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="marks" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Marks
          </TabsTrigger>
        </TabsList>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          {/* Filters */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map(s => <SelectItem key={s} value={s}>{s} Semester</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="attendance" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Attendance Records</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Roll</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-center p-3 text-sm font-medium text-muted-foreground">Present</th>
                      <th className="text-center p-3 text-sm font-medium text-muted-foreground">Absent</th>
                      <th className="text-center p-3 text-sm font-medium text-muted-foreground">Percentage</th>
                      <th className="text-center p-3 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border last:border-0 hover:bg-muted/50"
                      >
                        <td className="p-3 text-sm font-medium">{student.roll}</td>
                        <td className="p-3 text-sm">{student.name}</td>
                        <td className="p-3 text-sm text-center text-success">{student.present}</td>
                        <td className="p-3 text-sm text-center text-destructive">{student.absent}</td>
                        <td className="p-3 text-sm text-center font-medium">{student.percentage}%</td>
                        <td className="p-3 text-center">
                          <Badge variant={student.percentage >= 75 ? 'default' : 'destructive'}>
                            {student.percentage >= 75 ? 'Good' : 'Low'}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Marks Tab */}
        <TabsContent value="marks" className="space-y-6">
          {/* Filters */}
          <Card className="glass-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map(s => <SelectItem key={s} value={s}>{s} Semester</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={examType} onValueChange={setExamType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Exam Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Marks Table */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">Marks Entry</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" className="gradient-primary text-primary-foreground" onClick={handleSaveMarks}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Marks
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Roll</th>
                      <th className="text-left p-3 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-center p-3 text-sm font-medium text-muted-foreground">Class Test (20)</th>
                      <th className="text-center p-3 text-sm font-medium text-muted-foreground">Mid Term (50)</th>
                      <th className="text-center p-3 text-sm font-medium text-muted-foreground">Assignment (10)</th>
                      <th className="text-center p-3 text-sm font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-border last:border-0 hover:bg-muted/50"
                      >
                        <td className="p-3 text-sm font-medium">{student.roll}</td>
                        <td className="p-3 text-sm">{student.name}</td>
                        <td className="p-3">
                          <Input
                            type="number"
                            min="0"
                            max="20"
                            value={student.classTest}
                            onChange={(e) => handleMarksChange(student.id, 'classTest', e.target.value)}
                            className="w-16 text-center mx-auto"
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            min="0"
                            max="50"
                            value={student.midTerm}
                            onChange={(e) => handleMarksChange(student.id, 'midTerm', e.target.value)}
                            className="w-16 text-center mx-auto"
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            value={student.assignment}
                            onChange={(e) => handleMarksChange(student.id, 'assignment', e.target.value)}
                            className="w-16 text-center mx-auto"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <Badge variant={student.total >= 40 ? 'default' : 'destructive'} className="font-bold">
                            {student.classTest + student.midTerm + student.assignment}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
