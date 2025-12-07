import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Upload, Eye, Download, FileText, File, Image, FileSpreadsheet, Trash2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const documentsData = [
  { id: 1, name: 'SSC Certificate', type: 'Certificate', student: 'Md. Rahim Uddin', studentRoll: '2001', date: '2024-01-15', size: '245 KB', format: 'pdf' },
  { id: 2, name: 'Birth Certificate', type: 'Identity', student: 'Fatima Akter', studentRoll: '2002', date: '2024-01-16', size: '180 KB', format: 'pdf' },
  { id: 3, name: 'Passport Photo', type: 'Photo', student: 'Kamal Hossain', studentRoll: '2003', date: '2024-01-17', size: '120 KB', format: 'jpg' },
  { id: 4, name: 'HSC Marksheet', type: 'Academic', student: 'Nusrat Jahan', studentRoll: '2004', date: '2024-01-18', size: '320 KB', format: 'pdf' },
  { id: 5, name: 'Admission Form', type: 'Application', student: 'Arif Ahmed', studentRoll: '2005', date: '2024-01-19', size: '450 KB', format: 'pdf' },
  { id: 6, name: 'NID Copy', type: 'Identity', student: 'Sumaiya Rahman', studentRoll: '2006', date: '2024-01-20', size: '200 KB', format: 'pdf' },
  { id: 7, name: 'Transfer Certificate', type: 'Certificate', student: 'Habibur Rahman', studentRoll: '2007', date: '2024-01-21', size: '280 KB', format: 'pdf' },
  { id: 8, name: 'Medical Certificate', type: 'Certificate', student: 'Tahmina Khatun', studentRoll: '2008', date: '2024-01-22', size: '150 KB', format: 'pdf' },
];

const documentTypes = ['All Types', 'Certificate', 'Identity', 'Photo', 'Academic', 'Application'];

const getFileIcon = (format: string) => {
  switch (format) {
    case 'pdf':
      return <FileText className="w-8 h-8 text-red-500" />;
    case 'jpg':
    case 'png':
      return <Image className="w-8 h-8 text-blue-500" />;
    case 'xlsx':
    case 'xls':
      return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
    default:
      return <File className="w-8 h-8 text-muted-foreground" />;
  }
};

export default function Documents() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<typeof documentsData[0] | null>(null);
  const { toast } = useToast();

  const filteredDocs = documentsData.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.student.toLowerCase().includes(search.toLowerCase()) || d.studentRoll.includes(search);
    const matchesType = typeFilter === 'All Types' || d.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleUpload = () => {
    toast({
      title: "Document Uploaded",
      description: "The document has been uploaded successfully.",
    });
    setIsUploadOpen(false);
  };

  const handleView = (doc: typeof documentsData[0]) => {
    setSelectedDoc(doc);
    setIsViewOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground">Manage and organize all student documents and certificates</p>
        </div>
        <Button className="gradient-primary text-primary-foreground" onClick={() => setIsUploadOpen(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{documentsData.length}</p>
              <p className="text-xs text-muted-foreground">Total Documents</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{documentsData.filter(d => d.type === 'Certificate').length}</p>
              <p className="text-xs text-muted-foreground">Certificates</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{documentsData.filter(d => d.type === 'Identity').length}</p>
              <p className="text-xs text-muted-foreground">Identity Docs</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-accent-foreground">2.5 MB</p>
              <p className="text-xs text-muted-foreground">Total Size</p>
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
                placeholder="Search by document name or student..."
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
                {documentTypes.map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card className="glass-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Document</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Student</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">Size</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc, index) => (
                  <motion.tr
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-muted/50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.format)}
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <p className="text-xs text-muted-foreground uppercase">{doc.format}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">{doc.type}</Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="text-sm font-medium">{doc.student}</p>
                        <p className="text-xs text-muted-foreground">Roll: {doc.studentRoll}</p>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{doc.date}</td>
                    <td className="p-4 text-sm text-muted-foreground">{doc.size}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleView(doc)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="docName">Document Name</Label>
              <Input id="docName" placeholder="Enter document name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="docType">Document Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.filter(t => t !== 'All Types').map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="student">Student Roll Number</Label>
              <Input id="student" placeholder="Enter student roll" />
            </div>
            <div className="space-y-2">
              <Label>Upload File</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG (Max 10MB)</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadOpen(false)}>Cancel</Button>
            <Button className="gradient-primary text-primary-foreground" onClick={handleUpload}>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          {selectedDoc && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {getFileIcon(selectedDoc.format)}
                  {selectedDoc.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{selectedDoc.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Format</p>
                    <p className="font-medium uppercase">{selectedDoc.format}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Student</p>
                    <p className="font-medium">{selectedDoc.student}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Roll Number</p>
                    <p className="font-medium">{selectedDoc.studentRoll}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Upload Date</p>
                    <p className="font-medium">{selectedDoc.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-medium">{selectedDoc.size}</p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-8 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Document Preview</p>
                  <p className="text-xs text-muted-foreground mt-1">(Preview not available in demo)</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
                <Button className="gradient-primary text-primary-foreground">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
