import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, GraduationCap, Mail, Phone, Calendar, MapPin, BookOpen, ClipboardCheck, FileText, Inbox, FileEdit, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const students = [
  { id: 1, name: 'Md. Rahim Uddin', roll: '2001', department: 'Computer Technology', semester: '4th', status: 'Active', email: 'rahim@example.com', phone: '01712345678', session: '2022-2023', avatar: '', dob: '2005-03-15', address: 'Sirajganj, Bangladesh', gpa: 3.65 },
  { id: 2, name: 'Fatima Akter', roll: '2002', department: 'Computer Technology', semester: '4th', status: 'Active', email: 'fatima@example.com', phone: '01812345678', session: '2022-2023', avatar: '', dob: '2005-06-22', address: 'Bogra, Bangladesh', gpa: 3.85 },
  { id: 3, name: 'Kamal Hossain', roll: '2003', department: 'Electrical Technology', semester: '3rd', status: 'Active', email: 'kamal@example.com', phone: '01912345678', session: '2023-2024', avatar: '', dob: '2006-01-10', address: 'Pabna, Bangladesh', gpa: 3.45 },
  { id: 4, name: 'Nusrat Jahan', roll: '2004', department: 'Civil Technology', semester: '5th', status: 'Active', email: 'nusrat@example.com', phone: '01612345678', session: '2021-2022', avatar: '', dob: '2004-09-05', address: 'Rajshahi, Bangladesh', gpa: 3.72 },
  { id: 5, name: 'Arif Ahmed', roll: '2005', department: 'Mechanical Technology', semester: '2nd', status: 'Discontinued', email: 'arif@example.com', phone: '01512345678', session: '2023-2024', avatar: '', dob: '2006-11-28', address: 'Dhaka, Bangladesh', gpa: 2.95 },
  { id: 6, name: 'Sumaiya Rahman', roll: '2006', department: 'Computer Technology', semester: 'Alumni', status: 'Alumni', email: 'sumaiya@example.com', phone: '01412345678', session: '2019-2020', avatar: '', dob: '2002-04-18', address: 'Sirajganj, Bangladesh', gpa: 3.92 },
];

const academicHistory = [
  { semester: '1st', gpa: 3.45, credits: 18, year: '2022' },
  { semester: '2nd', gpa: 3.55, credits: 19, year: '2022' },
  { semester: '3rd', gpa: 3.60, credits: 20, year: '2023' },
  { semester: '4th', gpa: 3.65, credits: 21, year: '2023' },
];

const attendanceHistory = [
  { subject: 'Mathematics', present: 22, absent: 3, percentage: 88 },
  { subject: 'Physics', present: 24, absent: 1, percentage: 96 },
  { subject: 'Programming', present: 23, absent: 2, percentage: 92 },
  { subject: 'Database', present: 20, absent: 5, percentage: 80 },
];

const documents = [
  { name: 'SSC Certificate', type: 'Certificate', date: '2022-01-15', status: 'Verified' },
  { name: 'Birth Certificate', type: 'Identity', date: '2022-01-15', status: 'Verified' },
  { name: 'Admission Form', type: 'Application', date: '2022-02-20', status: 'Verified' },
];

const applications = [
  { id: 'APP001', type: 'Leave Application', status: 'Approved', date: '2024-01-15' },
  { id: 'APP002', type: 'Scholarship', status: 'Pending', date: '2024-02-20' },
];

const corrections = [
  { id: 'CR001', field: 'Name', current: 'Md. Rahim', requested: 'Md. Rahim Uddin', status: 'Approved', date: '2023-06-15' },
];

const timeline = [
  { event: 'Enrolled', date: '2022-01-15', description: 'Started 1st Semester' },
  { event: 'Semester Completed', date: '2022-06-30', description: 'Completed 1st Semester with GPA 3.45' },
  { event: 'Name Correction', date: '2023-06-15', description: 'Name updated from Md. Rahim to Md. Rahim Uddin' },
  { event: 'Current', date: '2024-01-01', description: 'Studying in 4th Semester' },
];

export default function StudentProfiles() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search);
    const matchesDept = department === 'all' || s.department === department;
    return matchesSearch && matchesDept;
  });

  const openProfile = (student: typeof students[0]) => {
    setSelectedStudent(student);
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/20 text-success border-success/30';
      case 'Discontinued': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'Alumni': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Student Profiles</h1>
        <p className="text-muted-foreground">View detailed profiles of all students</p>
      </div>

      {/* Search & Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or roll..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Technology">Computer Technology</SelectItem>
                <SelectItem value="Electrical Technology">Electrical Technology</SelectItem>
                <SelectItem value="Civil Technology">Civil Technology</SelectItem>
                <SelectItem value="Mechanical Technology">Mechanical Technology</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student, index) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass-card hover:shadow-lg transition-all cursor-pointer group" onClick={() => openProfile(student)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14 border-2 border-primary/20">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback className="gradient-primary text-primary-foreground">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">Roll: {student.roll}</p>
                    <p className="text-xs text-muted-foreground truncate">{student.department}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={getStatusColor(student.status)}>
                        {student.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{student.semester}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Profile Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={selectedStudent.avatar} />
                    <AvatarFallback className="gradient-primary text-primary-foreground text-xl">
                      {selectedStudent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                    <p className="text-sm text-muted-foreground font-normal">Roll: {selectedStudent.roll} | {selectedStudent.department}</p>
                    <Badge variant="outline" className={`mt-1 ${getStatusColor(selectedStudent.status)}`}>
                      {selectedStudent.status}
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
                  <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                  <TabsTrigger value="academic" className="text-xs">Academic</TabsTrigger>
                  <TabsTrigger value="attendance" className="text-xs">Attendance</TabsTrigger>
                  <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
                  <TabsTrigger value="applications" className="text-xs">Applications</TabsTrigger>
                  <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="glass-card">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Personal Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedStudent.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedStudent.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedStudent.dob}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{selectedStudent.address}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="glass-card">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Academic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Department</span>
                          <span className="text-sm font-medium">{selectedStudent.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Semester</span>
                          <span className="text-sm font-medium">{selectedStudent.semester}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Session</span>
                          <span className="text-sm font-medium">{selectedStudent.session}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Current GPA</span>
                          <span className="text-sm font-bold text-primary">{selectedStudent.gpa}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="academic" className="mt-4">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Academic History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {academicHistory.map((sem, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <p className="font-medium">{sem.semester} Semester</p>
                              <p className="text-xs text-muted-foreground">{sem.year} | {sem.credits} Credits</p>
                            </div>
                            <Badge className="gradient-primary text-primary-foreground">GPA: {sem.gpa}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="attendance" className="mt-4">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4" />
                        Attendance Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {attendanceHistory.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <p className="font-medium">{item.subject}</p>
                              <p className="text-xs text-muted-foreground">Present: {item.present} | Absent: {item.absent}</p>
                            </div>
                            <Badge variant={item.percentage >= 75 ? 'default' : 'destructive'}>
                              {item.percentage}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="mt-4">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Documents
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {documents.map((doc, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">{doc.type} | {doc.date}</p>
                            </div>
                            <Badge variant="outline" className="bg-success/20 text-success border-success/30">
                              {doc.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="applications" className="mt-4">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Inbox className="w-4 h-4" />
                        Applications & Correction Requests
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Applications</h4>
                        <div className="space-y-2">
                          {applications.map((app, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <div>
                                <p className="font-medium">{app.type}</p>
                                <p className="text-xs text-muted-foreground">{app.id} | {app.date}</p>
                              </div>
                              <Badge variant={app.status === 'Approved' ? 'default' : 'secondary'}>
                                {app.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Correction Requests</h4>
                        <div className="space-y-2">
                          {corrections.map((cr, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <div>
                                <p className="font-medium">{cr.field} Correction</p>
                                <p className="text-xs text-muted-foreground">{cr.current} → {cr.requested}</p>
                              </div>
                              <Badge variant={cr.status === 'Approved' ? 'default' : 'secondary'}>
                                {cr.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="mt-4">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <History className="w-4 h-4" />
                        Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {timeline.map((item, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-3 h-3 rounded-full bg-primary" />
                              {i < timeline.length - 1 && <div className="w-0.5 h-full bg-border" />}
                            </div>
                            <div className="pb-4">
                              <p className="font-medium">{item.event}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
