import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Users, GraduationCap, BookOpen, Building2, 
  Search, MoreVertical, ChevronRight, TrendingUp, Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
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

interface Department {
  id: string;
  name: string;
  shortName: string;
  head: string;
  totalStudents: number;
  activeStudents: number;
  faculty: number;
  established: string;
  description: string;
  status: 'Active' | 'Inactive';
}

const initialDepartments: Department[] = [
  { id: '1', name: 'Computer Technology', shortName: 'CT', head: 'Mr. Rahman Hossain', totalStudents: 320, activeStudents: 285, faculty: 12, established: '1995', description: 'Department focused on computer science and technology.', status: 'Active' },
  { id: '2', name: 'Electrical Technology', shortName: 'ET', head: 'Mr. Karim Ahmed', totalStudents: 280, activeStudents: 250, faculty: 10, established: '1995', description: 'Department focused on electrical engineering.', status: 'Active' },
  { id: '3', name: 'Civil Technology', shortName: 'CVT', head: 'Mr. Jahid Hasan', totalStudents: 240, activeStudents: 210, faculty: 9, established: '1998', description: 'Department focused on civil engineering and construction.', status: 'Active' },
  { id: '4', name: 'Mechanical Technology', shortName: 'MT', head: 'Mr. Salam Uddin', totalStudents: 200, activeStudents: 180, faculty: 8, established: '2000', description: 'Department focused on mechanical engineering.', status: 'Active' },
  { id: '5', name: 'Electronics Technology', shortName: 'ENT', head: 'Ms. Nasreen Akter', totalStudents: 180, activeStudents: 160, faculty: 7, established: '2005', description: 'Department focused on electronics and communication.', status: 'Active' },
  { id: '6', name: 'Power Technology', shortName: 'PT', head: 'Mr. Kabir Islam', totalStudents: 120, activeStudents: 100, faculty: 5, established: '2010', description: 'Department focused on power engineering.', status: 'Inactive' },
];

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    head: '',
    description: '',
    established: '',
  });
  const { toast } = useToast();

  const filteredDepartments = departments.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.shortName.toLowerCase().includes(search.toLowerCase()) ||
    d.head.toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = departments.reduce((acc, d) => acc + d.totalStudents, 0);
  const totalFaculty = departments.reduce((acc, d) => acc + d.faculty, 0);
  const activeDepartments = departments.filter(d => d.status === 'Active').length;

  const handleAdd = () => {
    if (!formData.name || !formData.shortName) {
      toast({ title: "Error", description: "Name and Short Name are required.", variant: "destructive" });
      return;
    }
    const newDept: Department = {
      id: Date.now().toString(),
      name: formData.name,
      shortName: formData.shortName,
      head: formData.head,
      description: formData.description,
      established: formData.established || new Date().getFullYear().toString(),
      totalStudents: 0,
      activeStudents: 0,
      faculty: 0,
      status: 'Active',
    };
    setDepartments([...departments, newDept]);
    setFormData({ name: '', shortName: '', head: '', description: '', established: '' });
    setIsAddOpen(false);
    toast({ title: "Department Added", description: `${formData.name} has been added successfully.` });
  };

  const handleEdit = () => {
    if (!selectedDept) return;
    setDepartments(departments.map(d => 
      d.id === selectedDept.id 
        ? { ...d, name: formData.name, shortName: formData.shortName, head: formData.head, description: formData.description }
        : d
    ));
    setIsEditOpen(false);
    toast({ title: "Department Updated", description: "Department details have been updated." });
  };

  const handleDelete = () => {
    if (!selectedDept) return;
    setDepartments(departments.filter(d => d.id !== selectedDept.id));
    setIsDeleteOpen(false);
    toast({ title: "Department Deleted", description: `${selectedDept.name} has been deleted.` });
  };

  const openEdit = (dept: Department) => {
    setSelectedDept(dept);
    setFormData({
      name: dept.name,
      shortName: dept.shortName,
      head: dept.head,
      description: dept.description,
      established: dept.established,
    });
    setIsEditOpen(true);
  };

  const openView = (dept: Department) => {
    setSelectedDept(dept);
    setIsViewOpen(true);
  };

  const openDelete = (dept: Department) => {
    setSelectedDept(dept);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Department Management</h1>
          <p className="text-muted-foreground">Manage academic departments and their resources</p>
        </div>
        <Button onClick={() => setIsAddOpen(true)} className="gradient-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{departments.length}</p>
                  <p className="text-xs text-muted-foreground">Total Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
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
                <div className="w-10 h-10 rounded-lg bg-info/20 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{totalFaculty}</p>
                  <p className="text-xs text-muted-foreground">Total Faculty</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{activeDepartments}</p>
                  <p className="text-xs text-muted-foreground">Active Departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments Table */}
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Department</TableHead>
                <TableHead>Head</TableHead>
                <TableHead className="text-center">Students</TableHead>
                <TableHead className="text-center">Faculty</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((dept, index) => (
                <motion.tr
                  key={dept.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => openView(dept)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">{dept.shortName}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{dept.name}</p>
                        <p className="text-xs text-muted-foreground">Est. {dept.established}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{dept.head || '-'}</TableCell>
                  <TableCell className="text-center">
                    <div>
                      <p className="font-medium">{dept.activeStudents}</p>
                      <p className="text-xs text-muted-foreground">of {dept.totalStudents}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{dept.faculty}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={dept.status === 'Active' ? 'default' : 'secondary'}>
                      {dept.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openView(dept); }}>
                          <ChevronRight className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openEdit(dept); }}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={(e) => { e.stopPropagation(); openDelete(dept); }}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Department</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department Name *</Label>
                <Input 
                  placeholder="e.g., Computer Technology" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Short Name *</Label>
                <Input 
                  placeholder="e.g., CT" 
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department Head</Label>
                <Input 
                  placeholder="Enter name" 
                  value={formData.head}
                  onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Established Year</Label>
                <Input 
                  placeholder="e.g., 2020" 
                  value={formData.established}
                  onChange={(e) => setFormData({ ...formData, established: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                placeholder="Brief description of the department..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} className="gradient-primary text-primary-foreground">Add Department</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department Name *</Label>
                <Input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Short Name *</Label>
                <Input 
                  value={formData.shortName}
                  onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Department Head</Label>
              <Input 
                value={formData.head}
                onChange={(e) => setFormData({ ...formData, head: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit} className="gradient-primary text-primary-foreground">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          {selectedDept && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">{selectedDept.shortName}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedDept.name}</h2>
                    <p className="text-sm text-muted-foreground font-normal">Established {selectedDept.established}</p>
                  </div>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 text-center">
                      <Users className="w-6 h-6 mx-auto text-primary mb-2" />
                      <p className="text-2xl font-bold">{selectedDept.activeStudents}</p>
                      <p className="text-xs text-muted-foreground">Active Students</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 text-center">
                      <GraduationCap className="w-6 h-6 mx-auto text-success mb-2" />
                      <p className="text-2xl font-bold">{selectedDept.faculty}</p>
                      <p className="text-xs text-muted-foreground">Faculty Members</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4 text-center">
                      <Award className="w-6 h-6 mx-auto text-warning mb-2" />
                      <p className="text-2xl font-bold">{selectedDept.totalStudents - selectedDept.activeStudents}</p>
                      <p className="text-xs text-muted-foreground">Alumni</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-muted/50">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Department Head</span>
                      <span className="text-sm font-medium">{selectedDept.head || 'Not Assigned'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge variant={selectedDept.status === 'Active' ? 'default' : 'secondary'}>{selectedDept.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Students (All Time)</span>
                      <span className="text-sm font-medium">{selectedDept.totalStudents}</span>
                    </div>
                  </CardContent>
                </Card>
                {selectedDept.description && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p className="text-sm">{selectedDept.description}</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
                <Button onClick={() => { setIsViewOpen(false); openEdit(selectedDept); }} className="gradient-primary text-primary-foreground">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Department
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete Department</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedDept?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete Department</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
