import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Eye,
  RotateCcw,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Calendar,
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const reasons = ['All', 'Dropout', 'Expelled', 'Migrated', 'Financial Issue', 'Health Issue', 'Personal Reasons'];
const departments = ['All', 'Computer', 'Electrical', 'Civil', 'Mechanical', 'Electronics', 'Power'];
const years = ['All', '2024', '2023', '2022', '2021', '2020'];

const mockDiscontinuedStudents = [
  { id: 1, name: 'Nasrin Sultana', roll: '123460', department: 'Electronics', semester: '5th', session: '2021-2022', reason: 'Financial Issue', discontinuedDate: '2023-06-15', previousStatus: 'Semester 5' },
  { id: 2, name: 'Habib Rahman', roll: '123470', department: 'Civil', semester: '3rd', session: '2022-2023', reason: 'Migrated', discontinuedDate: '2023-09-20', previousStatus: 'Semester 3' },
  { id: 3, name: 'Morium Begum', roll: '123475', department: 'Computer', semester: '4th', session: '2021-2022', reason: 'Dropout', discontinuedDate: '2022-12-10', previousStatus: 'Semester 4' },
  { id: 4, name: 'Saiful Islam', roll: '123480', department: 'Electrical', semester: '2nd', session: '2023-2024', reason: 'Health Issue', discontinuedDate: '2024-02-28', previousStatus: 'Semester 2' },
  { id: 5, name: 'Rashida Khatun', roll: '123485', department: 'Mechanical', semester: '6th', session: '2020-2021', reason: 'Personal Reasons', discontinuedDate: '2022-08-05', previousStatus: 'Semester 6' },
];

const getReasonColor = (reason: string) => {
  switch (reason) {
    case 'Dropout':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'Expelled':
      return 'bg-destructive/10 text-destructive border-destructive/20';
    case 'Migrated':
      return 'bg-info/10 text-info border-info/20';
    case 'Financial Issue':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'Health Issue':
      return 'bg-accent/10 text-accent border-accent/20';
    case 'Personal Reasons':
      return 'bg-muted text-muted-foreground border-muted-foreground/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function DiscontinuedStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedReason, setSelectedReason] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [reAdmitDialogOpen, setReAdmitDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof mockDiscontinuedStudents[0] | null>(null);
  const [reAdmitData, setReAdmitData] = useState({
    semester: '',
    remarks: '',
  });

  const filteredStudents = mockDiscontinuedStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll.includes(searchQuery);
    const matchesDept = selectedDept === 'All' || student.department === selectedDept;
    const matchesReason = selectedReason === 'All' || student.reason === selectedReason;
    const matchesYear = selectedYear === 'All' || student.discontinuedDate.startsWith(selectedYear);
    return matchesSearch && matchesDept && matchesReason && matchesYear;
  });

  const totalPages = Math.ceil(filteredStudents.length / pageSize);
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleReAdmit = () => {
    toast({
      title: 'Student Re-admitted',
      description: `${selectedStudent?.name} has been successfully re-admitted.`,
    });
    setReAdmitDialogOpen(false);
    setSelectedStudent(null);
    setReAdmitData({ semester: '', remarks: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            Discontinued Students
          </h1>
          <p className="text-muted-foreground mt-1">Manage students whose studies have been discontinued</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export List
        </Button>
      </div>

      {/* Warning Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-warning/10 border border-warning/20 rounded-2xl p-4 flex items-start gap-4"
      >
        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-foreground">Discontinued Students Section</p>
          <p className="text-sm text-muted-foreground mt-1">
            This section contains students who are no longer actively enrolled. You can re-admit students or add notes to their records.
          </p>
        </div>
      </motion.div>

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
              placeholder="Search by name or roll..."
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
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

                <Select value={selectedReason} onValueChange={setSelectedReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {reasons.map((reason) => (
                      <SelectItem key={reason} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl overflow-hidden border-l-4 border-l-warning"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-warning/5">
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Roll</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden md:table-cell">Department</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden lg:table-cell">Session</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Reason</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden xl:table-cell">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Discontinued
                  </div>
                </th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden xl:table-cell">Previous Status</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/50 hover:bg-warning/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warning to-accent flex items-center justify-center text-warning-foreground font-semibold">
                        {student.name.charAt(0)}
                      </div>
                      <p className="font-medium text-foreground">{student.name}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-muted-foreground font-mono text-sm">{student.roll}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-muted-foreground">{student.department}</p>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <p className="text-muted-foreground text-sm">{student.session}</p>
                  </td>
                  <td className="p-4">
                    <Badge className={cn('border', getReasonColor(student.reason))}>
                      {student.reason}
                    </Badge>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <p className="text-muted-foreground text-sm">{student.discontinuedDate}</p>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <p className="text-muted-foreground text-sm">{student.previousStatus}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-success hover:text-success"
                        title="Re-admit"
                        onClick={() => {
                          setSelectedStudent(student);
                          setReAdmitDialogOpen(true);
                        }}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Add Note">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-warning/5">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <Select value={pageSize.toString()} onValueChange={(val) => setPageSize(Number(val))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

      {/* Re-admit Dialog */}
      <Dialog open={reAdmitDialogOpen} onOpenChange={setReAdmitDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Re-admit Student</DialogTitle>
            <DialogDescription>
              Re-admit {selectedStudent?.name} back to active status.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New Semester *</Label>
              <Select value={reAdmitData.semester} onValueChange={(val) => setReAdmitData((prev) => ({ ...prev, semester: val }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Remarks</Label>
              <Textarea
                placeholder="Add any notes about this re-admission..."
                value={reAdmitData.remarks}
                onChange={(e) => setReAdmitData((prev) => ({ ...prev, remarks: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReAdmitDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReAdmit} className="gradient-success text-success-foreground">
              <RotateCcw className="w-4 h-4 mr-2" />
              Re-admit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
