import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, GraduationCap, Mail, Phone, Briefcase, MapPin, Calendar, ExternalLink, Users, TrendingUp, Building2, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type AlumniCategory = 'all' | 'recent' | 'established' | 'jobHolder' | 'higherStudies' | 'business' | 'other';

interface Alumni {
  id: number;
  name: string;
  roll: string;
  department: string;
  graduationYear: string;
  email: string;
  phone: string;
  currentJob: string;
  company: string;
  location: string;
  gpa: number;
  avatar: string;
  category: AlumniCategory;
  higherStudiesInstitute?: string;
  businessName?: string;
}

const alumniData: Alumni[] = [
  { id: 1, name: 'Sumaiya Rahman', roll: '1801', department: 'Computer Technology', graduationYear: '2024', email: 'sumaiya@example.com', phone: '01712345678', currentJob: 'Software Engineer', company: 'Google Bangladesh', location: 'Dhaka', gpa: 3.92, avatar: '', category: 'recent' },
  { id: 2, name: 'Mohammad Ali', roll: '1802', department: 'Electrical Technology', graduationYear: '2023', email: 'ali@example.com', phone: '01812345678', currentJob: 'Electrical Engineer', company: 'PGCB', location: 'Dhaka', gpa: 3.78, avatar: '', category: 'jobHolder' },
  { id: 3, name: 'Rashida Begum', roll: '1701', department: 'Civil Technology', graduationYear: '2021', email: 'rashida@example.com', phone: '01912345678', currentJob: 'Site Engineer', company: 'BRAC Construction', location: 'Chittagong', gpa: 3.65, avatar: '', category: 'established' },
  { id: 4, name: 'Jahid Hasan', roll: '1702', department: 'Computer Technology', graduationYear: '2021', email: 'jahid@example.com', phone: '01612345678', currentJob: 'Full Stack Developer', company: 'Brain Station 23', location: 'Dhaka', gpa: 3.88, avatar: '', category: 'established' },
  { id: 5, name: 'Farida Akter', roll: '1601', department: 'Electronics Technology', graduationYear: '2020', email: 'farida@example.com', phone: '01512345678', currentJob: 'PhD Researcher', company: 'University of Tokyo', location: 'Japan', gpa: 3.95, avatar: '', category: 'higherStudies', higherStudiesInstitute: 'University of Tokyo' },
  { id: 6, name: 'Kamrul Islam', roll: '1602', department: 'Mechanical Technology', graduationYear: '2020', email: 'kamrul@example.com', phone: '01412345678', currentJob: 'Business Owner', company: 'Kamrul Engineering', location: 'Gazipur', gpa: 3.55, avatar: '', category: 'business', businessName: 'Kamrul Engineering Services' },
  { id: 7, name: 'Nasima Khatun', roll: '1501', department: 'Computer Technology', graduationYear: '2019', email: 'nasima@example.com', phone: '01312345678', currentJob: 'Data Analyst', company: 'Grameenphone', location: 'Dhaka', gpa: 3.82, avatar: '', category: 'established' },
  { id: 8, name: 'Shafiqul Islam', roll: '1502', department: 'Civil Technology', graduationYear: '2019', email: 'shafiq@example.com', phone: '01212345678', currentJob: 'Project Manager', company: 'Bashundhara Group', location: 'Dhaka', gpa: 3.68, avatar: '', category: 'established' },
  { id: 9, name: 'Rafiq Ahmed', roll: '1503', department: 'Electrical Technology', graduationYear: '2018', email: 'rafiq@example.com', phone: '01112345678', currentJob: 'Masters Student', company: 'BUET', location: 'Dhaka', gpa: 3.75, avatar: '', category: 'higherStudies', higherStudiesInstitute: 'BUET' },
  { id: 10, name: 'Tasnim Haque', roll: '1504', department: 'Computer Technology', graduationYear: '2023', email: 'tasnim@example.com', phone: '01012345678', currentJob: 'Freelancer', company: 'Self-employed', location: 'Sirajganj', gpa: 3.45, avatar: '', category: 'other' },
  { id: 11, name: 'Habib Rahman', roll: '1505', department: 'Mechanical Technology', graduationYear: '2024', email: 'habib@example.com', phone: '01912345679', currentJob: 'Junior Engineer', company: 'Walton', location: 'Dhaka', gpa: 3.60, avatar: '', category: 'recent' },
  { id: 12, name: 'Salma Begum', roll: '1506', department: 'Civil Technology', graduationYear: '2022', email: 'salma@example.com', phone: '01812345679', currentJob: 'Entrepreneur', company: 'Salma Interiors', location: 'Rajshahi', gpa: 3.52, avatar: '', category: 'business', businessName: 'Salma Interiors Ltd.' },
];

const categories = [
  { value: 'all', label: 'All Alumni', icon: Users },
  { value: 'recent', label: 'Recent Alumni', icon: Calendar },
  { value: 'established', label: 'Established', icon: TrendingUp },
  { value: 'jobHolder', label: 'Job Holders', icon: Briefcase },
  { value: 'higherStudies', label: 'Higher Studies', icon: BookOpen },
  { value: 'business', label: 'Business', icon: Building2 },
  { value: 'other', label: 'Other', icon: GraduationCap },
];

const departments = ['All Departments', 'Computer Technology', 'Electrical Technology', 'Civil Technology', 'Mechanical Technology', 'Electronics Technology'];
const years = ['All Years', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export default function Alumni() {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [year, setYear] = useState('All Years');
  const [category, setCategory] = useState<AlumniCategory>('all');
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredAlumni = alumniData.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.roll.includes(search) || a.company.toLowerCase().includes(search.toLowerCase());
    const matchesDept = department === 'All Departments' || a.department === department;
    const matchesYear = year === 'All Years' || a.graduationYear === year;
    const matchesCategory = category === 'all' || a.category === category;
    return matchesSearch && matchesDept && matchesYear && matchesCategory;
  });

  const getCategoryStats = (cat: AlumniCategory) => {
    if (cat === 'all') return alumniData.length;
    return alumniData.filter(a => a.category === cat).length;
  };

  const getCategoryColor = (cat: AlumniCategory) => {
    switch (cat) {
      case 'recent': return 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30';
      case 'established': return 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
      case 'jobHolder': return 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30';
      case 'higherStudies': return 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'business': return 'bg-pink-500/20 text-pink-700 dark:text-pink-300 border-pink-500/30';
      case 'other': return 'bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const openDetail = (alumni: Alumni) => {
    setSelectedAlumni(alumni);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Alumni</h1>
          <p className="text-muted-foreground">Manage alumni records and track graduates' career progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <GraduationCap className="w-3 h-3 mr-1" />
            {alumniData.length} Alumni
          </Badge>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((cat, index) => (
          <motion.div 
            key={cat.value}
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className={`glass-card cursor-pointer transition-all ${category === cat.value ? 'ring-2 ring-primary' : 'hover:bg-muted/50'}`}
              onClick={() => setCategory(cat.value as AlumniCategory)}
            >
              <CardContent className="p-3 text-center">
                <cat.icon className={`w-5 h-5 mx-auto mb-1 ${category === cat.value ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className="text-lg font-bold text-foreground">{getCategoryStats(cat.value as AlumniCategory)}</p>
                <p className="text-[10px] text-muted-foreground truncate">{cat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search & Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, roll, or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {departments.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => (
                  <SelectItem key={y} value={y}>{y === 'All Years' ? y : `Class of ${y}`}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAlumni.map((alumni, index) => (
          <motion.div
            key={alumni.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass-card hover:shadow-lg transition-all cursor-pointer group" onClick={() => openDetail(alumni)}>
              <CardContent className="p-4">
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto border-2 border-primary/20">
                    <AvatarImage src={alumni.avatar} />
                    <AvatarFallback className="gradient-primary text-primary-foreground text-lg">
                      {alumni.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-foreground mt-3 truncate">{alumni.name}</h3>
                  <p className="text-xs text-muted-foreground">Class of {alumni.graduationYear}</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {alumni.department.replace(' Technology', '')}
                    </Badge>
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(alumni.category)}`}>
                      {categories.find(c => c.value === alumni.category)?.label}
                    </Badge>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm font-medium text-primary truncate">{alumni.currentJob}</p>
                    <p className="text-xs text-muted-foreground truncate">{alumni.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredAlumni.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No alumni found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          {selectedAlumni && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">
                  <Avatar className="w-20 h-20 mx-auto border-2 border-primary/20 mb-4">
                    <AvatarImage src={selectedAlumni.avatar} />
                    <AvatarFallback className="gradient-primary text-primary-foreground text-2xl">
                      {selectedAlumni.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{selectedAlumni.name}</h2>
                  <p className="text-sm text-muted-foreground font-normal">Class of {selectedAlumni.graduationYear} | Roll: {selectedAlumni.roll}</p>
                  <Badge variant="outline" className={`mt-2 ${getCategoryColor(selectedAlumni.category)}`}>
                    {categories.find(c => c.value === selectedAlumni.category)?.label}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Current Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium">{selectedAlumni.currentJob}</p>
                        <p className="text-sm text-muted-foreground">{selectedAlumni.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedAlumni.location}</span>
                    </div>
                    {selectedAlumni.higherStudiesInstitute && (
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-amber-500" />
                        <span className="text-sm">{selectedAlumni.higherStudiesInstitute}</span>
                      </div>
                    )}
                    {selectedAlumni.businessName && (
                      <div className="flex items-center gap-3">
                        <Building2 className="w-4 h-4 text-pink-500" />
                        <span className="text-sm">{selectedAlumni.businessName}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Academic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Department</span>
                      <span className="text-sm font-medium">{selectedAlumni.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Graduation Year</span>
                      <span className="text-sm font-medium">{selectedAlumni.graduationYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Final GPA</span>
                      <Badge className="gradient-primary text-primary-foreground">{selectedAlumni.gpa}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedAlumni.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedAlumni.phone}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
