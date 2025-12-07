import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Download,
  UserPlus,
  Eye,
  Edit,
  FileText,
  UserX,
  Award,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
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
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const departments = ['All', 'Computer', 'Electrical', 'Civil', 'Mechanical', 'Electronics', 'Power'];
const semesters = ['All', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const statuses = ['All', 'Active', 'Discontinued', 'Alumni'];
const sessions = ['All', '2023-2024', '2022-2023', '2021-2022', '2020-2021'];

const mockStudents = [
  { id: 1, name: 'Rakib Hasan', roll: '123456', department: 'Computer', semester: '6th', status: 'Active', session: '2022-2023', photo: null },
  { id: 2, name: 'Fatima Akter', roll: '123457', department: 'Electrical', semester: '4th', status: 'Active', session: '2022-2023', photo: null },
  { id: 3, name: 'Kamal Uddin', roll: '123458', department: 'Civil', semester: '8th', status: 'Alumni', session: '2020-2021', photo: null },
  { id: 4, name: 'Sumon Mia', roll: '123459', department: 'Mechanical', semester: '3rd', status: 'Active', session: '2023-2024', photo: null },
  { id: 5, name: 'Nasrin Sultana', roll: '123460', department: 'Electronics', semester: '5th', status: 'Discontinued', session: '2021-2022', photo: null },
  { id: 6, name: 'Abdul Karim', roll: '123461', department: 'Power', semester: '7th', status: 'Active', session: '2021-2022', photo: null },
  { id: 7, name: 'Rima Begum', roll: '123462', department: 'Computer', semester: '2nd', status: 'Active', session: '2023-2024', photo: null },
  { id: 8, name: 'Jahid Hossain', roll: '123463', department: 'Electrical', semester: '6th', status: 'Active', session: '2022-2023', photo: null },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-success/10 text-success border-success/20';
    case 'Discontinued':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'Alumni':
      return 'bg-info/10 text-info border-info/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function StudentsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedSession, setSelectedSession] = useState('All');
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'roll'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll.includes(searchQuery);
    const matchesDept = selectedDept === 'All' || student.department === selectedDept;
    const matchesSemester = selectedSemester === 'All' || student.semester === selectedSemester;
    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;
    const matchesSession = selectedSession === 'All' || student.session === selectedSession;
    return matchesSearch && matchesDept && matchesSemester && matchesStatus && matchesSession;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const aVal = sortBy === 'name' ? a.name : a.roll;
    const bVal = sortBy === 'name' ? b.name : b.roll;
    return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
  });

  const totalPages = Math.ceil(sortedStudents.length / pageSize);
  const paginatedStudents = sortedStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSelectAll = () => {
    if (selectedStudents.length === paginatedStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(paginatedStudents.map((s) => s.id));
    }
  };

  const toggleSelectStudent = (id: number) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground mt-1">Manage all students in the institution</p>
        </div>
        <Link to="/add-student">
          <Button className="gradient-primary text-primary-foreground gap-2">
            <UserPlus className="w-4 h-4" />
            Add Student
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(showFilters && 'border-primary text-primary')}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Expandable Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
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

                <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem} value={sem}>
                        {sem}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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

                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger>
                    <SelectValue placeholder="Session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((session) => (
                      <SelectItem key={session} value={session}>
                        {session}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bulk Actions */}
      <AnimatePresence>
        {selectedStudents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card rounded-xl p-4 flex items-center justify-between"
          >
            <p className="text-sm text-foreground">
              <span className="font-semibold">{selectedStudents.length}</span> students selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Change Status
              </Button>
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Students Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedStudents.length === paginatedStudents.length && paginatedStudents.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Photo</th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => {
                      if (sortBy === 'name') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy('name');
                        setSortOrder('asc');
                      }
                    }}
                    className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Name
                    {sortBy === 'name' && (sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
                  </button>
                </th>
                <th className="p-4 text-left">
                  <button
                    onClick={() => {
                      if (sortBy === 'roll') {
                        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                      } else {
                        setSortBy('roll');
                        setSortOrder('asc');
                      }
                    }}
                    className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Roll
                    {sortBy === 'roll' && (sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />)}
                  </button>
                </th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden md:table-cell">Department</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden lg:table-cell">Semester</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-muted-foreground hidden xl:table-cell">Session</th>
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
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="p-4">
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={() => toggleSelectStudent(student.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center text-primary-foreground font-semibold">
                      {student.name.charAt(0)}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{student.name}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-muted-foreground font-mono text-sm">{student.roll}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-muted-foreground">{student.department}</p>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <p className="text-muted-foreground">{student.semester}</p>
                  </td>
                  <td className="p-4">
                    <Badge className={cn('border', getStatusColor(student.status))}>
                      {student.status}
                    </Badge>
                  </td>
                  <td className="p-4 hidden xl:table-cell">
                    <p className="text-muted-foreground text-sm">{student.session}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="View Profile">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:inline-flex" title="Documents">
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:inline-flex text-warning hover:text-warning" title="Discontinue">
                        <UserX className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:inline-flex text-info hover:text-info" title="Move to Alumni">
                        <Award className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 sm:hidden">
                        <MoreHorizontal className="w-4 h-4" />
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
                <SelectItem value="50">50</SelectItem>
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
    </div>
  );
}
