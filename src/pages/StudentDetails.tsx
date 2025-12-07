import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Edit, Download, Unplug, Trash2, ChevronDown, ChevronUp,
  User, Phone, Mail, MapPin, Calendar, GraduationCap, BookOpen, 
  FileText, AlertTriangle, CheckCircle, XCircle, Clock, Building2,
  Heart, Briefcase, Home, Shield, Award, TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';

// Sample student data
const studentData = {
  id: '1',
  photoUrl: '',
  nameEnglish: 'Md. Rahim Uddin',
  nameBangla: 'মো. রহিম উদ্দিন',
  fatherName: 'Md. Karim Uddin',
  fatherNameBangla: 'মো. করিম উদ্দিন',
  fatherNID: '1234567890123',
  motherName: 'Mrs. Fatima Begum',
  motherNameBangla: 'মিসেস ফাতেমা বেগম',
  motherNID: '9876543210987',
  dateOfBirth: '2005-03-15',
  birthCertificateNo: 'BC-2005-123456',
  nid: '1234567890',
  gender: 'Male',
  religion: 'Islam',
  bloodGroup: 'B+',
  maritalStatus: 'Single',
  studentMobile: '01712345678',
  guardianMobile: '01812345678',
  email: 'rahim.uddin@example.com',
  emergencyContact: '01912345678',
  presentDivision: 'Rajshahi',
  presentDistrict: 'Sirajganj',
  presentSubDistrict: 'Sirajganj Sadar',
  presentPoliceStation: 'Sirajganj Sadar',
  presentPostOffice: 'Sirajganj',
  presentMunicipality: 'Sirajganj Municipality',
  presentVillage: 'Ward No. 5',
  presentWard: '5',
  permanentDivision: 'Rajshahi',
  permanentDistrict: 'Sirajganj',
  permanentSubDistrict: 'Sirajganj Sadar',
  permanentPoliceStation: 'Sirajganj Sadar',
  permanentPostOffice: 'Sirajganj',
  permanentMunicipality: 'Sirajganj Municipality',
  permanentVillage: 'Ward No. 5',
  permanentWard: '5',
  highestExam: 'SSC',
  board: 'Rajshahi',
  group: 'Science',
  passingYear: '2022',
  previousGPA: '4.75',
  previousInstitution: 'Sirajganj Govt. High School',
  rollNumber: '2001',
  registrationNumber: 'REG-2022-001',
  semester: '4th',
  department: 'Computer Technology',
  session: '2022-2023',
  shift: 'Morning',
  academicGroup: 'Technology',
  enrollmentDate: '2022-08-01',
  status: 'Active',
  semesterResults: [
    { semester: '1st', gpa: 3.45, cgpa: 3.45, referredSubjects: [] },
    { semester: '2nd', gpa: 3.55, cgpa: 3.50, referredSubjects: [] },
    { semester: '3rd', gpa: 3.60, cgpa: 3.53, referredSubjects: ['Mathematics-II'] },
    { semester: '4th', gpa: 3.65, cgpa: 3.56, referredSubjects: [] },
  ],
  semesterAttendance: [
    { subject: 'Mathematics', present: 22, absent: 3, total: 25, percentage: 88 },
    { subject: 'Physics', present: 24, absent: 1, total: 25, percentage: 96 },
    { subject: 'Programming', present: 23, absent: 2, total: 25, percentage: 92 },
    { subject: 'Database', present: 20, absent: 5, total: 25, percentage: 80 },
    { subject: 'English', present: 21, absent: 4, total: 25, percentage: 84 },
    { subject: 'Electronics', present: 24, absent: 1, total: 25, percentage: 96 },
  ],
  documents: [
    { id: '1', name: 'SSC Certificate', category: 'Certificate', size: '245 KB', uploadDate: '2022-08-01', url: '#' },
    { id: '2', name: 'Birth Certificate', category: 'Identity', size: '180 KB', uploadDate: '2022-08-01', url: '#' },
    { id: '3', name: 'Passport Photo', category: 'Photo', size: '120 KB', uploadDate: '2022-08-01', url: '#' },
    { id: '4', name: 'NID Copy', category: 'Identity', size: '200 KB', uploadDate: '2022-08-15', url: '#' },
    { id: '5', name: 'Admission Form', category: 'Application', size: '450 KB', uploadDate: '2022-08-01', url: '#' },
  ],
};

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="glass-card overflow-hidden">
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="text-sm font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                {icon}
                {title}
              </div>
              {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function InfoRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value || '-'}</span>
    </div>
  );
}

export default function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [student] = useState(studentData);
  
  const [isMathDialogOpen, setIsMathDialogOpen] = useState(false);
  const [isDisconnectDialogOpen, setIsDisconnectDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, answer: '' });
  const [deleteMathProblem, setDeleteMathProblem] = useState({ num1: 0, num2: 0, answer: '' });
  const [disconnectForm, setDisconnectForm] = useState({
    reason: '',
    dropSemester: '',
    guardianContacted: false,
    additionalNotes: ''
  });

  const generateMathProblem = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    return { num1, num2, answer: '' };
  };

  const handleDisconnectClick = () => {
    setMathProblem(generateMathProblem());
    setIsMathDialogOpen(true);
  };

  const handleMathSubmit = () => {
    const correctAnswer = mathProblem.num1 + mathProblem.num2;
    if (parseInt(mathProblem.answer) === correctAnswer) {
      setIsMathDialogOpen(false);
      setIsDisconnectDialogOpen(true);
    } else {
      toast({
        title: "Incorrect Answer",
        description: "Please solve the math problem correctly to proceed.",
        variant: "destructive"
      });
      setMathProblem(generateMathProblem());
    }
  };

  const handleDisconnectSubmit = () => {
    if (!disconnectForm.reason) {
      toast({
        title: "Required Field",
        description: "Please select a reason for disconnection.",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Student Disconnected",
      description: "The student has been moved to discontinued list.",
    });
    setIsDisconnectDialogOpen(false);
    navigate('/discontinued-students');
  };

  const handleDeleteClick = () => {
    setDeleteMathProblem(generateMathProblem());
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubmit = () => {
    const correctAnswer = deleteMathProblem.num1 + deleteMathProblem.num2;
    if (parseInt(deleteMathProblem.answer) === correctAnswer) {
      toast({
        title: "Student Deleted",
        description: "The student record has been permanently deleted.",
      });
      setIsDeleteDialogOpen(false);
      navigate('/students');
    } else {
      toast({
        title: "Incorrect Answer",
        description: "Please solve the math problem correctly to confirm deletion.",
        variant: "destructive"
      });
      setDeleteMathProblem(generateMathProblem());
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success/20 text-success border-success/30';
      case 'Discontinued': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'Alumni': return 'bg-primary/20 text-primary border-primary/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const averageAttendance = Math.round(
    student.semesterAttendance.reduce((acc, s) => acc + s.percentage, 0) / student.semesterAttendance.length
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Student Details</h1>
          <p className="text-muted-foreground">Complete student information and records</p>
        </div>
      </div>

      {/* Hero Section - Profile Photo & Quick Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative">
                  <Avatar className="w-40 h-40 border-4 border-primary/20 ring-4 ring-primary/10">
                    <AvatarImage src={student.photoUrl} />
                    <AvatarFallback className="gradient-primary text-primary-foreground text-4xl">
                      {student.nameEnglish.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <Badge 
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${getStatusColor(student.status)}`}
                  >
                    {student.status}
                  </Badge>
                </div>
              </div>

              {/* Names & Info */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl font-bold text-foreground">{student.nameEnglish}</h2>
                <p className="text-lg text-muted-foreground font-medium">{student.nameBangla}</p>
                <p className="text-sm text-muted-foreground mt-1">{student.department}</p>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <Card className="bg-muted/50">
                    <CardContent className="p-3 text-center">
                      <p className="text-xs text-muted-foreground">Roll Number</p>
                      <p className="text-lg font-bold text-primary">{student.rollNumber}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-3 text-center">
                      <p className="text-xs text-muted-foreground">Semester</p>
                      <p className="text-lg font-bold text-foreground">{student.semester}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-3 text-center">
                      <p className="text-xs text-muted-foreground">CGPA</p>
                      <p className="text-lg font-bold text-success">{student.semesterResults[student.semesterResults.length - 1]?.cgpa}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-3 text-center">
                      <p className="text-xs text-muted-foreground">Attendance</p>
                      <p className={`text-lg font-bold ${getAttendanceColor(averageAttendance)}`}>{averageAttendance}%</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row lg:flex-col gap-2 justify-center">
                <Button onClick={() => navigate(`/students/${id}/edit`)} className="gradient-primary text-primary-foreground">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                {student.status === 'Active' && (
                  <Button variant="outline" className="text-warning border-warning/30 hover:bg-warning/10" onClick={handleDisconnectClick}>
                    <Unplug className="w-4 h-4 mr-2" />
                    Disconnect
                  </Button>
                )}
                <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10" onClick={handleDeleteClick}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Collapsible Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Personal Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <CollapsibleSection title="Personal Information" icon={<User className="w-4 h-4" />} defaultOpen>
            <div className="space-y-1">
              <InfoRow label="Full Name (English)" value={student.nameEnglish} />
              <InfoRow label="Full Name (Bangla)" value={student.nameBangla} />
              <InfoRow label="Father's Name" value={student.fatherName} />
              <InfoRow label="Father's NID" value={student.fatherNID} />
              <InfoRow label="Mother's Name" value={student.motherName} />
              <InfoRow label="Mother's NID" value={student.motherNID} />
              <InfoRow label="Date of Birth" value={student.dateOfBirth} />
              <InfoRow label="Birth Certificate No" value={student.birthCertificateNo} />
              <InfoRow label="NID" value={student.nid} />
              <InfoRow label="Gender" value={student.gender} />
              <InfoRow label="Religion" value={student.religion} />
              <InfoRow label="Blood Group" value={student.bloodGroup} />
              <InfoRow label="Marital Status" value={student.maritalStatus} />
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Contact Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <CollapsibleSection title="Contact Information" icon={<Phone className="w-4 h-4" />} defaultOpen>
            <div className="space-y-1">
              <InfoRow label="Student Mobile" value={student.studentMobile} />
              <InfoRow label="Guardian Mobile" value={student.guardianMobile} />
              <InfoRow label="Email" value={student.email} />
              <InfoRow label="Emergency Contact" value={student.emergencyContact} />
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Present Address */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <CollapsibleSection title="Present Address" icon={<MapPin className="w-4 h-4" />}>
            <div className="space-y-1">
              <InfoRow label="Division" value={student.presentDivision} />
              <InfoRow label="District" value={student.presentDistrict} />
              <InfoRow label="Sub-District" value={student.presentSubDistrict} />
              <InfoRow label="Police Station" value={student.presentPoliceStation} />
              <InfoRow label="Post Office" value={student.presentPostOffice} />
              <InfoRow label="Municipality/Union" value={student.presentMunicipality} />
              <InfoRow label="Village/Neighborhood" value={student.presentVillage} />
              <InfoRow label="Ward" value={student.presentWard} />
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Permanent Address */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <CollapsibleSection title="Permanent Address" icon={<Home className="w-4 h-4" />}>
            <div className="space-y-1">
              <InfoRow label="Division" value={student.permanentDivision} />
              <InfoRow label="District" value={student.permanentDistrict} />
              <InfoRow label="Sub-District" value={student.permanentSubDistrict} />
              <InfoRow label="Police Station" value={student.permanentPoliceStation} />
              <InfoRow label="Post Office" value={student.permanentPostOffice} />
              <InfoRow label="Municipality/Union" value={student.permanentMunicipality} />
              <InfoRow label="Village/Neighborhood" value={student.permanentVillage} />
              <InfoRow label="Ward" value={student.permanentWard} />
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Educational Background */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <CollapsibleSection title="Educational Background" icon={<GraduationCap className="w-4 h-4" />}>
            <div className="space-y-1">
              <InfoRow label="Highest Exam" value={student.highestExam} />
              <InfoRow label="Board" value={student.board} />
              <InfoRow label="Group" value={student.group} />
              <InfoRow label="Passing Year" value={student.passingYear} />
              <InfoRow label="GPA" value={student.previousGPA} />
              <InfoRow label="Institution Name" value={student.previousInstitution} />
            </div>
          </CollapsibleSection>
        </motion.div>

        {/* Current Academic Info */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <CollapsibleSection title="Current Academic Information" icon={<BookOpen className="w-4 h-4" />}>
            <div className="space-y-1">
              <InfoRow label="Roll Number" value={student.rollNumber} />
              <InfoRow label="Registration Number" value={student.registrationNumber} />
              <InfoRow label="Semester" value={student.semester} />
              <InfoRow label="Department" value={student.department} />
              <InfoRow label="Session" value={student.session} />
              <InfoRow label="Shift" value={student.shift} />
              <InfoRow label="Group" value={student.academicGroup} />
              <InfoRow label="Enrollment Date" value={student.enrollmentDate} />
              <InfoRow label="Status" value={student.status} />
            </div>
          </CollapsibleSection>
        </motion.div>
      </div>

      {/* Semester Results */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Semester Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {student.semesterResults.map((result, index) => (
                <Card key={index} className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{result.semester} Semester</span>
                      <Badge className="gradient-primary text-primary-foreground">GPA: {result.gpa}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">CGPA: {result.cgpa}</div>
                    {result.referredSubjects.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-destructive font-medium">Referred Subjects:</p>
                        {result.referredSubjects.map((sub, i) => (
                          <Badge key={i} variant="outline" className="text-xs mt-1 mr-1 bg-destructive/10 text-destructive border-destructive/30">
                            {sub}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Semester Attendance */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Semester Attendance
              <Badge variant="outline" className={`ml-auto ${getAttendanceColor(averageAttendance)}`}>
                Average: {averageAttendance}%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {student.semesterAttendance.map((att, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{att.subject}</span>
                    <span className={`text-sm font-bold ${getAttendanceColor(att.percentage)}`}>
                      {att.percentage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress value={att.percentage} className="flex-1" />
                    <span className="text-xs text-muted-foreground w-20">
                      {att.present}/{att.total} classes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Documents */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {student.documents.map((doc) => (
                <Card key={doc.id} className="bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.category} • {doc.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Math Challenge Dialog for Disconnect */}
      <Dialog open={isMathDialogOpen} onOpenChange={setIsMathDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Security Verification
            </DialogTitle>
            <DialogDescription>
              Solve this math problem to proceed with disconnecting the student.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center space-y-4">
              <p className="text-2xl font-bold text-foreground">
                {mathProblem.num1} + {mathProblem.num2} = ?
              </p>
              <Input
                type="number"
                placeholder="Enter your answer"
                value={mathProblem.answer}
                onChange={(e) => setMathProblem({ ...mathProblem, answer: e.target.value })}
                className="text-center text-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMathDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleMathSubmit} className="gradient-primary text-primary-foreground">Verify</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Disconnect Form Dialog */}
      <Dialog open={isDisconnectDialogOpen} onOpenChange={setIsDisconnectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Unplug className="w-5 h-5 text-warning" />
              Disconnect Student
            </DialogTitle>
            <DialogDescription>
              Please provide the reason for disconnecting this student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Reason *</Label>
              <Select value={disconnectForm.reason} onValueChange={(v) => setDisconnectForm({ ...disconnectForm, reason: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dropout">Dropout</SelectItem>
                  <SelectItem value="expelled">Expelled</SelectItem>
                  <SelectItem value="migrated">Migrated</SelectItem>
                  <SelectItem value="financial">Financial Issue</SelectItem>
                  <SelectItem value="medical">Medical Reason</SelectItem>
                  <SelectItem value="personal">Personal Reason</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dropSemester">Drop Semester</Label>
              <Select value={disconnectForm.dropSemester} onValueChange={(v) => setDisconnectForm({ ...disconnectForm, dropSemester: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st Semester</SelectItem>
                  <SelectItem value="2nd">2nd Semester</SelectItem>
                  <SelectItem value="3rd">3rd Semester</SelectItem>
                  <SelectItem value="4th">4th Semester</SelectItem>
                  <SelectItem value="5th">5th Semester</SelectItem>
                  <SelectItem value="6th">6th Semester</SelectItem>
                  <SelectItem value="7th">7th Semester</SelectItem>
                  <SelectItem value="8th">8th Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox 
                id="guardianContacted" 
                checked={disconnectForm.guardianContacted}
                onCheckedChange={(c) => setDisconnectForm({ ...disconnectForm, guardianContacted: c as boolean })}
              />
              <Label htmlFor="guardianContacted" className="text-sm">Guardian has been contacted</Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes"
                placeholder="Any additional information..."
                value={disconnectForm.additionalNotes}
                onChange={(e) => setDisconnectForm({ ...disconnectForm, additionalNotes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDisconnectDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDisconnectSubmit} className="bg-warning text-warning-foreground hover:bg-warning/90">
              Confirm Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Delete Student Permanently
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. Solve the math problem to confirm deletion.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center space-y-4">
              <p className="text-2xl font-bold text-foreground">
                {deleteMathProblem.num1} + {deleteMathProblem.num2} = ?
              </p>
              <Input
                type="number"
                placeholder="Enter your answer"
                value={deleteMathProblem.answer}
                onChange={(e) => setDeleteMathProblem({ ...deleteMathProblem, answer: e.target.value })}
                className="text-center text-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteSubmit}>
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
