import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Building, GraduationCap, Calendar, Users, Save, Plus, Trash2, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const initialDepartments = [
  { id: 1, name: 'Computer Technology', code: 'CT', semesters: 8 },
  { id: 2, name: 'Electrical Technology', code: 'ET', semesters: 8 },
  { id: 3, name: 'Civil Technology', code: 'CVT', semesters: 8 },
  { id: 4, name: 'Mechanical Technology', code: 'MT', semesters: 8 },
  { id: 5, name: 'Electronics Technology', code: 'ECT', semesters: 8 },
];

const initialSessions = ['2019-2020', '2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025'];

export default function Settings() {
  const [instituteName, setInstituteName] = useState('Sirajganj Polytechnic Institute');
  const [instituteCode, setInstituteCode] = useState('SPI');
  const [email, setEmail] = useState('info@sirajganjpoly.edu.bd');
  const [phone, setPhone] = useState('+880-751-62345');
  const [address, setAddress] = useState('Sirajganj Sadar, Sirajganj, Bangladesh');
  const [departments, setDepartments] = useState(initialDepartments);
  const [sessions, setSessions] = useState(initialSessions);
  const [newDepartment, setNewDepartment] = useState({ name: '', code: '' });
  const [newSession, setNewSession] = useState('');
  const { toast } = useToast();

  const handleSaveInstitute = () => {
    toast({
      title: "Settings Saved",
      description: "Institute information has been updated successfully.",
    });
  };

  const handleAddDepartment = () => {
    if (newDepartment.name && newDepartment.code) {
      setDepartments([...departments, { id: departments.length + 1, name: newDepartment.name, code: newDepartment.code, semesters: 8 }]);
      setNewDepartment({ name: '', code: '' });
      toast({
        title: "Department Added",
        description: `${newDepartment.name} has been added successfully.`,
      });
    }
  };

  const handleRemoveDepartment = (id: number) => {
    setDepartments(departments.filter(d => d.id !== id));
    toast({
      title: "Department Removed",
      description: "Department has been removed successfully.",
    });
  };

  const handleAddSession = () => {
    if (newSession && !sessions.includes(newSession)) {
      setSessions([...sessions, newSession]);
      setNewSession('');
      toast({
        title: "Session Added",
        description: `Session ${newSession} has been added successfully.`,
      });
    }
  };

  const handleRemoveSession = (session: string) => {
    setSessions(sessions.filter(s => s !== session));
    toast({
      title: "Session Removed",
      description: "Session has been removed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure system settings and preferences</p>
      </div>

      <Tabs defaultValue="institute" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="institute" className="gap-2">
            <Building className="w-4 h-4" />
            Institute
          </TabsTrigger>
          <TabsTrigger value="academic" className="gap-2">
            <GraduationCap className="w-4 h-4" />
            Academic
          </TabsTrigger>
        </TabsList>

        {/* Institute Settings */}
        <TabsContent value="institute" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Institute Information
                </CardTitle>
                <CardDescription>Basic information about your institute</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Upload */}
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="space-y-2">
                    <Label>Institute Logo</Label>
                    <div className="w-32 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/50 hover:border-primary/50 cursor-pointer transition-colors">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Upload Logo</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="instituteName">Institute Name</Label>
                      <Input
                        id="instituteName"
                        value={instituteName}
                        onChange={(e) => setInstituteName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instituteCode">Institute Code</Label>
                      <Input
                        id="instituteCode"
                        value={instituteCode}
                        onChange={(e) => setInstituteCode(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="gradient-primary text-primary-foreground" onClick={handleSaveInstitute}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-6">
          {/* Departments */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Departments
                </CardTitle>
                <CardDescription>Manage academic departments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Department */}
                <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
                  <Input
                    placeholder="Department Name"
                    value={newDepartment.name}
                    onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    placeholder="Code (e.g., CT)"
                    value={newDepartment.code}
                    onChange={(e) => setNewDepartment({ ...newDepartment, code: e.target.value })}
                    className="w-full sm:w-32"
                  />
                  <Button onClick={handleAddDepartment}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>

                {/* Department List */}
                <div className="space-y-2">
                  {departments.map((dept, index) => (
                    <motion.div
                      key={dept.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {dept.code}
                        </Badge>
                        <span className="font-medium">{dept.name}</span>
                        <span className="text-xs text-muted-foreground">({dept.semesters} semesters)</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRemoveDepartment(dept.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sessions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Academic Sessions
                </CardTitle>
                <CardDescription>Manage academic sessions/years</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Session */}
                <div className="flex flex-col sm:flex-row gap-4 p-4 bg-muted/50 rounded-lg">
                  <Input
                    placeholder="Session (e.g., 2024-2025)"
                    value={newSession}
                    onChange={(e) => setNewSession(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleAddSession}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Session
                  </Button>
                </div>

                {/* Session List */}
                <div className="flex flex-wrap gap-2">
                  {sessions.map((session, index) => (
                    <motion.div
                      key={session}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge
                        variant="outline"
                        className="bg-background py-2 px-3 text-sm flex items-center gap-2"
                      >
                        {session}
                        <button
                          onClick={() => handleRemoveSession(session)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
