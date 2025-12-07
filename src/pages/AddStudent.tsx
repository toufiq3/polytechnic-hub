import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload, User, GraduationCap, MapPin, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const departments = ['Computer Technology', 'Electrical Technology', 'Civil Technology', 'Mechanical Technology', 'Electronics Technology', 'Power Technology'];
const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const shifts = ['Morning', 'Day'];
const sessions = ['2024-2025', '2023-2024', '2022-2023', '2021-2022', '2020-2021'];
const statuses = ['Active', 'Discontinued', 'Alumni'];
const genders = ['Male', 'Female', 'Other'];

export default function AddStudent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameBangla: '',
    nameEnglish: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    roll: '',
    registration: '',
    department: '',
    semester: '',
    shift: '',
    session: '',
    address: '',
    status: 'Active',
    photo: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Student Added',
      description: 'The student has been successfully added to the system.',
    });
    navigate('/students');
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Add New Student</h1>
          <p className="text-muted-foreground mt-1">Fill in the details to register a new student</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Photo Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Profile Photo
          </h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center overflow-hidden">
              {formData.photo ? (
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-muted-foreground" />
              )}
            </div>
            <div>
              <input
                type="file"
                id="photo"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({ ...prev, photo: file }));
                  }
                }}
              />
              <Button type="button" variant="outline" asChild>
                <label htmlFor="photo" className="cursor-pointer">
                  Upload Photo
                </label>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
            </div>
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nameBangla">Full Name (Bangla)</Label>
              <Input
                id="nameBangla"
                placeholder="বাংলায় পূর্ণ নাম"
                value={formData.nameBangla}
                onChange={(e) => updateField('nameBangla', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nameEnglish">Full Name (English) *</Label>
              <Input
                id="nameEnglish"
                placeholder="Full name in English"
                value={formData.nameEnglish}
                onChange={(e) => updateField('nameEnglish', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="student@email.com"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input
                id="dob"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => updateField('dateOfBirth', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Gender *</Label>
              <Select value={formData.gender} onValueChange={(val) => updateField('gender', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Academic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Academic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="roll">Roll Number *</Label>
              <Input
                id="roll"
                placeholder="e.g. 123456"
                value={formData.roll}
                onChange={(e) => updateField('roll', e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration">Registration No.</Label>
              <Input
                id="registration"
                placeholder="e.g. REG-2024-001"
                value={formData.registration}
                onChange={(e) => updateField('registration', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Department *</Label>
              <Select value={formData.department} onValueChange={(val) => updateField('department', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
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
            <div className="space-y-2">
              <Label>Semester *</Label>
              <Select value={formData.semester} onValueChange={(val) => updateField('semester', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Shift *</Label>
              <Select value={formData.shift} onValueChange={(val) => updateField('shift', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map((shift) => (
                    <SelectItem key={shift} value={shift}>
                      {shift}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Session *</Label>
              <Select value={formData.session} onValueChange={(val) => updateField('session', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select session" />
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
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(val) => updateField('status', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Address
          </h2>
          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Input
              id="address"
              placeholder="Village, Post Office, Upazila, District"
              value={formData.address}
              onChange={(e) => updateField('address', e.target.value)}
            />
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-end"
        >
          <Button type="button" variant="outline" onClick={() => navigate('/students')}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" className="gradient-primary text-primary-foreground">
            <Save className="w-4 h-4 mr-2" />
            Save Student
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
