import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Download, Clock, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const departments = ['Computer Technology', 'Electrical Technology', 'Civil Technology', 'Mechanical Technology', 'Electronics Technology'];
const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const shifts = ['Morning', 'Day'];
const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
const timeSlots = ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '1:00-2:00', '2:00-3:00', '3:00-4:00'];

interface ClassSlot {
  subject: string;
  teacher: string;
  room: string;
}

type RoutineData = Record<string, Record<string, ClassSlot | null>>;

const initialRoutine: RoutineData = {
  'Saturday': {
    '8:00-9:00': { subject: 'Mathematics', teacher: 'Mr. Rahman', room: '101' },
    '9:00-10:00': { subject: 'Physics', teacher: 'Mr. Karim', room: '102' },
    '10:00-11:00': { subject: 'Programming', teacher: 'Ms. Fatima', room: 'Lab 1' },
    '11:00-12:00': { subject: 'Programming', teacher: 'Ms. Fatima', room: 'Lab 1' },
    '12:00-1:00': null,
    '1:00-2:00': { subject: 'English', teacher: 'Mr. Hasan', room: '103' },
    '2:00-3:00': { subject: 'Electronics', teacher: 'Mr. Ali', room: '104' },
    '3:00-4:00': null,
  },
  'Sunday': {
    '8:00-9:00': { subject: 'Database', teacher: 'Ms. Nasreen', room: 'Lab 2' },
    '9:00-10:00': { subject: 'Database', teacher: 'Ms. Nasreen', room: 'Lab 2' },
    '10:00-11:00': { subject: 'Chemistry', teacher: 'Mr. Kabir', room: '105' },
    '11:00-12:00': { subject: 'Workshop', teacher: 'Mr. Salam', room: 'Workshop' },
    '12:00-1:00': null,
    '1:00-2:00': { subject: 'Mathematics', teacher: 'Mr. Rahman', room: '101' },
    '2:00-3:00': { subject: 'Physics Lab', teacher: 'Mr. Karim', room: 'Physics Lab' },
    '3:00-4:00': { subject: 'Physics Lab', teacher: 'Mr. Karim', room: 'Physics Lab' },
  },
  'Monday': {
    '8:00-9:00': { subject: 'Programming', teacher: 'Ms. Fatima', room: 'Lab 1' },
    '9:00-10:00': { subject: 'Programming', teacher: 'Ms. Fatima', room: 'Lab 1' },
    '10:00-11:00': { subject: 'English', teacher: 'Mr. Hasan', room: '103' },
    '11:00-12:00': { subject: 'Electronics', teacher: 'Mr. Ali', room: '104' },
    '12:00-1:00': null,
    '1:00-2:00': { subject: 'Chemistry Lab', teacher: 'Mr. Kabir', room: 'Chem Lab' },
    '2:00-3:00': { subject: 'Chemistry Lab', teacher: 'Mr. Kabir', room: 'Chem Lab' },
    '3:00-4:00': null,
  },
  'Tuesday': {
    '8:00-9:00': { subject: 'Mathematics', teacher: 'Mr. Rahman', room: '101' },
    '9:00-10:00': { subject: 'Database', teacher: 'Ms. Nasreen', room: 'Lab 2' },
    '10:00-11:00': { subject: 'Physics', teacher: 'Mr. Karim', room: '102' },
    '11:00-12:00': { subject: 'Workshop', teacher: 'Mr. Salam', room: 'Workshop' },
    '12:00-1:00': null,
    '1:00-2:00': { subject: 'English', teacher: 'Mr. Hasan', room: '103' },
    '2:00-3:00': { subject: 'Electronics Lab', teacher: 'Mr. Ali', room: 'Electronics Lab' },
    '3:00-4:00': { subject: 'Electronics Lab', teacher: 'Mr. Ali', room: 'Electronics Lab' },
  },
  'Wednesday': {
    '8:00-9:00': { subject: 'Chemistry', teacher: 'Mr. Kabir', room: '105' },
    '9:00-10:00': { subject: 'Mathematics', teacher: 'Mr. Rahman', room: '101' },
    '10:00-11:00': { subject: 'Programming', teacher: 'Ms. Fatima', room: 'Lab 1' },
    '11:00-12:00': { subject: 'Programming', teacher: 'Ms. Fatima', room: 'Lab 1' },
    '12:00-1:00': null,
    '1:00-2:00': { subject: 'Physics', teacher: 'Mr. Karim', room: '102' },
    '2:00-3:00': { subject: 'Workshop', teacher: 'Mr. Salam', room: 'Workshop' },
    '3:00-4:00': { subject: 'Workshop', teacher: 'Mr. Salam', room: 'Workshop' },
  },
  'Thursday': {
    '8:00-9:00': { subject: 'Electronics', teacher: 'Mr. Ali', room: '104' },
    '9:00-10:00': { subject: 'English', teacher: 'Mr. Hasan', room: '103' },
    '10:00-11:00': { subject: 'Database', teacher: 'Ms. Nasreen', room: 'Lab 2' },
    '11:00-12:00': { subject: 'Chemistry', teacher: 'Mr. Kabir', room: '105' },
    '12:00-1:00': null,
    '1:00-2:00': null,
    '2:00-3:00': null,
    '3:00-4:00': null,
  },
};

const subjectColors: Record<string, string> = {
  'Mathematics': 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30',
  'Physics': 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30',
  'Physics Lab': 'bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30',
  'Programming': 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
  'English': 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30',
  'Electronics': 'bg-pink-500/20 text-pink-700 dark:text-pink-300 border-pink-500/30',
  'Electronics Lab': 'bg-pink-500/20 text-pink-700 dark:text-pink-300 border-pink-500/30',
  'Database': 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
  'Chemistry': 'bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30',
  'Chemistry Lab': 'bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30',
  'Workshop': 'bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-500/30',
};

export default function ClassRoutine() {
  const [department, setDepartment] = useState('Computer Technology');
  const [semester, setSemester] = useState('4th');
  const [shift, setShift] = useState('Morning');
  const [routine, setRoutine] = useState<RoutineData>(initialRoutine);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const [slotForm, setSlotForm] = useState({ subject: '', teacher: '', room: '' });
  const { toast } = useToast();

  const handleSlotClick = (day: string, time: string) => {
    if (!isEditMode) return;
    setSelectedSlot({ day, time });
    const existing = routine[day]?.[time];
    if (existing) {
      setSlotForm({ subject: existing.subject, teacher: existing.teacher, room: existing.room });
    } else {
      setSlotForm({ subject: '', teacher: '', room: '' });
    }
    setIsAddDialogOpen(true);
  };

  const handleSaveSlot = () => {
    if (!selectedSlot) return;
    const { day, time } = selectedSlot;
    
    if (!slotForm.subject) {
      // Remove the slot (set to null/break)
      setRoutine(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [time]: null
        }
      }));
    } else {
      setRoutine(prev => ({
        ...prev,
        [day]: {
          ...prev[day],
          [time]: { subject: slotForm.subject, teacher: slotForm.teacher, room: slotForm.room }
        }
      }));
    }
    
    setIsAddDialogOpen(false);
    toast({ title: "Slot Updated", description: "Class routine has been updated." });
  };

  const handleDeleteSlot = () => {
    if (!selectedSlot) return;
    const { day, time } = selectedSlot;
    setRoutine(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [time]: null
      }
    }));
    setIsAddDialogOpen(false);
    toast({ title: "Slot Removed", description: "The class has been removed from the routine." });
  };

  const handleSaveRoutine = () => {
    setIsEditMode(false);
    toast({ title: "Routine Saved", description: "Class routine has been saved successfully." });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Class Routine</h1>
          <p className="text-muted-foreground">Manage department-wise weekly class schedules</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditMode ? (
            <>
              <Button variant="outline" onClick={() => setIsEditMode(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveRoutine} className="gradient-primary text-primary-foreground">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditMode(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Routine
              </Button>
              <Button className="gradient-primary text-primary-foreground">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Semester</label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map(sem => (
                    <SelectItem key={sem} value={sem}>{sem} Semester</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Shift</label>
              <Select value={shift} onValueChange={setShift}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Badge */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
          <Calendar className="w-3 h-3 mr-1" />
          {department}
        </Badge>
        <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
          {semester} Semester
        </Badge>
        <Badge variant="outline" className="bg-secondary/50 border-secondary">
          <Clock className="w-3 h-3 mr-1" />
          {shift} Shift
        </Badge>
        {isEditMode && (
          <Badge className="bg-warning/20 text-warning border-warning/30">
            <Edit className="w-3 h-3 mr-1" />
            Edit Mode - Click on slots to modify
          </Badge>
        )}
      </div>

      {/* Routine Grid */}
      <Card className="glass-card overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-3 text-left text-sm font-semibold text-muted-foreground w-24">
                    Day / Time
                  </th>
                  {timeSlots.map(slot => (
                    <th key={slot} className="p-3 text-center text-sm font-semibold text-muted-foreground">
                      {slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day, dayIndex) => (
                  <motion.tr
                    key={day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dayIndex * 0.05 }}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-3 font-medium text-foreground bg-muted/30">
                      {day}
                    </td>
                    {timeSlots.map(slot => {
                      const classInfo = routine[day]?.[slot];
                      if (!classInfo) {
                        return (
                          <td key={slot} className="p-2 text-center">
                            <div 
                              onClick={() => handleSlotClick(day, slot)}
                              className={`h-16 rounded-lg bg-muted/20 border border-dashed border-border/50 flex items-center justify-center ${isEditMode ? 'cursor-pointer hover:bg-muted/40 hover:border-primary/50' : ''}`}
                            >
                              {isEditMode ? (
                                <Plus className="w-4 h-4 text-muted-foreground" />
                              ) : (
                                <span className="text-xs text-muted-foreground">Break</span>
                              )}
                            </div>
                          </td>
                        );
                      }
                      return (
                        <td key={slot} className="p-2">
                          <motion.div
                            whileHover={{ scale: isEditMode ? 1.02 : 1 }}
                            onClick={() => handleSlotClick(day, slot)}
                            className={`h-16 rounded-lg border p-2 transition-all ${subjectColors[classInfo.subject] || 'bg-muted/50'} ${isEditMode ? 'cursor-pointer hover:ring-2 hover:ring-primary/50' : ''}`}
                          >
                            <p className="font-medium text-xs truncate">{classInfo.subject}</p>
                            <p className="text-[10px] opacity-80 truncate">{classInfo.teacher}</p>
                            <p className="text-[10px] opacity-60">{classInfo.room}</p>
                          </motion.div>
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Subject Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(subjectColors).slice(0, 8).map(([subject, color]) => (
              <Badge key={subject} variant="outline" className={`${color} text-xs`}>
                {subject}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Slot Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedSlot && routine[selectedSlot.day]?.[selectedSlot.time] ? 'Edit Class Slot' : 'Add Class Slot'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedSlot && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{selectedSlot.day}, {selectedSlot.time}</span>
              </div>
            )}
            <div className="space-y-2">
              <Label>Subject Name</Label>
              <Input 
                placeholder="e.g., Mathematics"
                value={slotForm.subject}
                onChange={(e) => setSlotForm({ ...slotForm, subject: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Teacher Name</Label>
              <Input 
                placeholder="e.g., Mr. Rahman"
                value={slotForm.teacher}
                onChange={(e) => setSlotForm({ ...slotForm, teacher: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Room</Label>
              <Input 
                placeholder="e.g., Room 101 or Lab 1"
                value={slotForm.room}
                onChange={(e) => setSlotForm({ ...slotForm, room: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            {selectedSlot && routine[selectedSlot.day]?.[selectedSlot.time] && (
              <Button variant="destructive" onClick={handleDeleteSlot} className="mr-auto">
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            )}
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSlot} className="gradient-primary text-primary-foreground">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
