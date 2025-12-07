import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, Eye, CheckCircle, XCircle, Clock, FileText, 
  Calendar, User, Inbox, Download, MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Application {
  id: string;
  studentName: string;
  studentRoll: string;
  department: string;
  type: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
  description: string;
  attachments: number;
}

const applicationsData: Application[] = [
  { id: 'APP001', studentName: 'Md. Rahim Uddin', studentRoll: '2001', department: 'Computer Technology', type: 'Leave Application', status: 'Pending', date: '2024-01-20', description: 'Requesting leave for 5 days due to family emergency. My grandmother is ill and needs medical attention.', attachments: 2 },
  { id: 'APP002', studentName: 'Fatima Akter', studentRoll: '2002', department: 'Computer Technology', type: 'Scholarship', status: 'Approved', date: '2024-01-18', description: 'Application for merit-based scholarship for the current semester based on academic performance.', attachments: 4 },
  { id: 'APP003', studentName: 'Kamal Hossain', studentRoll: '2003', department: 'Electrical Technology', type: 'Certificate Request', status: 'Pending', date: '2024-01-19', description: 'Request for character certificate for job application purpose.', attachments: 1 },
  { id: 'APP004', studentName: 'Nusrat Jahan', studentRoll: '2004', department: 'Civil Technology', type: 'Transfer', status: 'Rejected', date: '2024-01-15', description: 'Application for transfer to another polytechnic institute due to family relocation.', attachments: 3 },
  { id: 'APP005', studentName: 'Arif Ahmed', studentRoll: '2005', department: 'Mechanical Technology', type: 'Leave Application', status: 'Approved', date: '2024-01-17', description: 'Medical leave application for surgery recovery period of 2 weeks.', attachments: 2 },
  { id: 'APP006', studentName: 'Sumaiya Rahman', studentRoll: '2006', department: 'Computer Technology', type: 'Testimonial', status: 'Pending', date: '2024-01-21', description: 'Request for testimonial certificate for higher education admission.', attachments: 1 },
  { id: 'APP007', studentName: 'Habibur Rahman', studentRoll: '2007', department: 'Electrical Technology', type: 'Fee Waiver', status: 'Pending', date: '2024-01-22', description: 'Application for partial fee waiver due to financial difficulties in the family.', attachments: 5 },
  { id: 'APP008', studentName: 'Tahmina Khatun', studentRoll: '2008', department: 'Civil Technology', type: 'Scholarship', status: 'Pending', date: '2024-01-20', description: 'Application for need-based scholarship for the upcoming semester.', attachments: 3 },
];

const applicationTypes = ['All Types', 'Leave Application', 'Scholarship', 'Certificate Request', 'Transfer', 'Testimonial', 'Fee Waiver'];
const statusOptions = ['All Status', 'Pending', 'Approved', 'Rejected'];

export default function Applications() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [adminRemarks, setAdminRemarks] = useState('');
  const { toast } = useToast();

  const filteredApplications = applicationsData.filter(a => {
    const matchesSearch = a.studentName.toLowerCase().includes(search.toLowerCase()) || 
                          a.studentRoll.includes(search) || 
                          a.id.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'All Types' || a.type === typeFilter;
    const matchesStatus = statusFilter === 'All Status' || a.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: applicationsData.length,
    pending: applicationsData.filter(a => a.status === 'Pending').length,
    approved: applicationsData.filter(a => a.status === 'Approved').length,
    rejected: applicationsData.filter(a => a.status === 'Rejected').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-success/20 text-success border-success/30';
      case 'Rejected': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'Pending': return 'bg-warning/20 text-warning border-warning/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const handleView = (app: Application) => {
    setSelectedApp(app);
    setAdminRemarks('');
    setIsDetailOpen(true);
  };

  const handleApprove = () => {
    toast({ title: "Application Approved", description: `Application ${selectedApp?.id} has been approved.` });
    setIsDetailOpen(false);
  };

  const handleReject = () => {
    toast({ title: "Application Rejected", description: `Application ${selectedApp?.id} has been rejected.`, variant: "destructive" });
    setIsDetailOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Applications</h1>
          <p className="text-muted-foreground">Review and process student applications</p>
        </div>
        <Button className="gradient-primary text-primary-foreground">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Inbox className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-xs text-muted-foreground">Total Applications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.approved}</p>
                  <p className="text-xs text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.rejected}</p>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search & Filters */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID, student name, or roll..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {applicationTypes.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app, index) => (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleView(app)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="font-medium">{app.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.studentName}</p>
                      <p className="text-xs text-muted-foreground">Roll: {app.studentRoll} • {app.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{app.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(app.status)}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1">{app.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{app.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleView(app); }}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        {app.status === 'Pending' && (
                          <>
                            <DropdownMenuItem className="text-success" onClick={(e) => { e.stopPropagation(); setSelectedApp(app); handleApprove(); }}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={(e) => { e.stopPropagation(); setSelectedApp(app); handleReject(); }}>
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredApplications.length === 0 && (
        <Card className="glass-card">
          <CardContent className="p-8 text-center">
            <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No applications found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          {selectedApp && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  Application {selectedApp.id}
                </DialogTitle>
                <DialogDescription>
                  {selectedApp.type} from {selectedApp.studentName}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getStatusColor(selectedApp.status)}>
                    {getStatusIcon(selectedApp.status)}
                    <span className="ml-1">{selectedApp.status}</span>
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedApp.date}
                  </span>
                </div>

                <Card className="bg-muted/50">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedApp.studentName}</p>
                        <p className="text-sm text-muted-foreground">Roll: {selectedApp.studentRoll} • {selectedApp.department}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <p className="text-sm font-medium mb-2">Application Description</p>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="text-sm">{selectedApp.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Attachments</span>
                  <Badge variant="outline">{selectedApp.attachments} files</Badge>
                </div>

                {selectedApp.status === 'Pending' && (
                  <div className="space-y-2">
                    <Label>Admin Remarks (Optional)</Label>
                    <Textarea 
                      placeholder="Add remarks for approval/rejection..."
                      value={adminRemarks}
                      onChange={(e) => setAdminRemarks(e.target.value)}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                {selectedApp.status === 'Pending' && (
                  <>
                    <Button variant="destructive" onClick={handleReject}>
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button onClick={handleApprove} className="bg-success text-success-foreground hover:bg-success/90">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
