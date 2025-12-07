import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  GraduationCap,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const statuses = ['All', 'Pending', 'Approved', 'Rejected'];
const departments = ['All', 'Computer', 'Electrical', 'Civil', 'Mechanical', 'Electronics', 'Power'];

const mockAdmissions = [
  { id: 1, name: 'Aminul Haque', email: 'aminul@email.com', phone: '+880 1712345678', department: 'Computer Technology', session: '2024-2025', status: 'Pending', submittedAt: '2024-03-15', ssc: 4.5, photo: null },
  { id: 2, name: 'Khadija Akter', email: 'khadija@email.com', phone: '+880 1812345678', department: 'Electrical Technology', session: '2024-2025', status: 'Approved', submittedAt: '2024-03-14', ssc: 4.8, photo: null },
  { id: 3, name: 'Rafiq Ahmed', email: 'rafiq@email.com', phone: '+880 1912345678', department: 'Civil Technology', session: '2024-2025', status: 'Pending', submittedAt: '2024-03-14', ssc: 4.2, photo: null },
  { id: 4, name: 'Salma Begum', email: 'salma@email.com', phone: '+880 1612345678', department: 'Mechanical Technology', session: '2024-2025', status: 'Rejected', submittedAt: '2024-03-13', ssc: 3.5, photo: null },
  { id: 5, name: 'Jamal Uddin', email: 'jamal@email.com', phone: '+880 1512345678', department: 'Electronics Technology', session: '2024-2025', status: 'Pending', submittedAt: '2024-03-12', ssc: 4.0, photo: null },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'Approved':
      return 'bg-success/10 text-success border-success/20';
    case 'Rejected':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function Admissions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState<typeof mockAdmissions[0] | null>(null);

  const filteredAdmissions = mockAdmissions.filter((admission) => {
    const matchesSearch =
      admission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admission.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || admission.status === selectedStatus;
    const matchesDept = selectedDept === 'All' || admission.department.includes(selectedDept);
    return matchesSearch && matchesStatus && matchesDept;
  });

  const totalPages = Math.ceil(filteredAdmissions.length / pageSize);
  const paginatedAdmissions = filteredAdmissions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const pendingCount = mockAdmissions.filter((a) => a.status === 'Pending').length;
  const approvedCount = mockAdmissions.filter((a) => a.status === 'Approved').length;
  const rejectedCount = mockAdmissions.filter((a) => a.status === 'Rejected').length;

  const handleApprove = (id: number) => {
    toast({
      title: 'Admission Approved',
      description: 'The admission request has been approved successfully.',
    });
  };

  const handleReject = (id: number) => {
    toast({
      title: 'Admission Rejected',
      description: 'The admission request has been rejected.',
      variant: 'destructive',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            Admissions
          </h1>
          <p className="text-muted-foreground mt-1">Review and manage student admission requests</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-4 border-l-4 border-l-warning"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-4 border-l-4 border-l-success"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{approvedCount}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-4 border-l-4 border-l-destructive"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <X className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{rejectedCount}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && 'border-primary text-primary')}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDept} onValueChange={setSelectedDept}>
                  <SelectTrigger>
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Admissions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Applicant</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden md:table-cell">Contact</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden lg:table-cell">Department</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden xl:table-cell">SSC GPA</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden xl:table-cell">Submitted</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAdmissions.map((admission, index) => (
                <motion.tr
                  key={admission.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                        {admission.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{admission.name}</p>
                        <p className="text-xs text-muted-foreground">{admission.session}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-sm text-muted-foreground">{admission.email}</p>
                    <p className="text-xs text-muted-foreground">{admission.phone}</p>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <p className="text-sm text-muted-foreground">{admission.department}</p>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <p className="text-sm font-medium text-foreground">{admission.ssc}</p>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <p className="text-sm text-muted-foreground">{admission.submittedAt}</p>
                  </td>
                  <td className="p-4">
                    <Badge className={cn('border', getStatusColor(admission.status))}>
                      {admission.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="View Details"
                        onClick={() => {
                          setSelectedAdmission(admission);
                          setViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {admission.status === 'Pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                            title="Approve"
                            onClick={() => handleApprove(admission.id)}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Reject"
                            onClick={() => handleReject(admission.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Download Form">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">
            Showing {paginatedAdmissions.length} of {filteredAdmissions.length} admissions
          </span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages || 1}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Admission Details</DialogTitle>
            <DialogDescription>
              Review the admission request details
            </DialogDescription>
          </DialogHeader>
          {selectedAdmission && (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                    {selectedAdmission.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">{selectedAdmission.name}</p>
                    <Badge className={cn('border mt-1', getStatusColor(selectedAdmission.status))}>
                      {selectedAdmission.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{selectedAdmission.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{selectedAdmission.phone}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="academic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Department</p>
                    <p className="font-medium text-foreground">{selectedAdmission.department}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Session</p>
                    <p className="font-medium text-foreground">{selectedAdmission.session}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SSC GPA</p>
                    <p className="font-medium text-foreground">{selectedAdmission.ssc}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submitted</p>
                    <p className="font-medium text-foreground">{selectedAdmission.submittedAt}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4">
                <div className="text-center text-muted-foreground py-8">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Documents will be displayed here</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            {selectedAdmission?.status === 'Pending' && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleReject(selectedAdmission.id);
                    setViewDialogOpen(false);
                  }}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => {
                    handleApprove(selectedAdmission.id);
                    setViewDialogOpen(false);
                  }}
                  className="gradient-success text-success-foreground"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
