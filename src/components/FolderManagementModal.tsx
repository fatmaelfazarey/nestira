import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Folder, Plus, Edit, Trash2, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useEmployerStore } from '@/store/employer store/EmployerStore';

interface Folder {
  id: string;
  name: string;
  count: number;
  createdAt: Date;
}

interface FolderManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock folders data - in a real app, this would come from a state management system or API
const mockFolders = [
  { id: '1', name: 'Logistics coordinator', count: 12, createdAt: new Date('2024-01-15') },
  { id: '2', name: 'Finance Managers', count: 8, createdAt: new Date('2024-01-20') },
  { id: '3', name: 'Senior Analysts', count: 15, createdAt: new Date('2024-02-01') },
  { id: '4', name: 'Remote Candidates', count: 23, createdAt: new Date('2024-02-10') },
  { id: '5', name: 'High Priority', count: 6, createdAt: new Date('2024-02-15') }
];

export const FolderManagementModal: React.FC<FolderManagementModalProps> = ({
  isOpen,
  onClose
}) => {
  const [folders, setFolders] = useState<Folder[]>();
  const [newFolderName, setNewFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState('');
  const { gatAllFolders, createNewFolder, deleteFolder, updateFolderName } = useEmployerStore();

  useEffect(() => {
    fetchFoldrs()
    if (!isOpen) {
      setNewFolderName('');
      setEditingFolder(null);
      setEditFolderName('');
    }
  }, [isOpen]);

  const fetchFoldrs = async () => {
    await gatAllFolders(setFolders);
  }

  const handleCreateFolder = async () => {


    if (newFolderName.trim() && !folders.find(f => f.name.toLowerCase() === newFolderName.toLowerCase())) {
      const created = await createNewFolder(newFolderName.trim());
      if (created.success) {
        const newFolder: Folder = {
          id: Date.now().toString(),
          name: newFolderName.trim(),
          count: 0,
          createdAt: new Date()
        };
        setFolders(prev => [...prev, newFolder]);
        setNewFolderName('');
        toast.success(`Created folder: ${newFolder.name}`);
      }

    } else if (folders.find(f => f.name.toLowerCase() === newFolderName.toLowerCase())) {
      toast.error('A folder with this name already exists');
    }
  };

  const handleStartEdit = (folder: Folder) => {
    setEditingFolder(folder.id);
    setEditFolderName(folder.name);
  };

  //   const handleSaveEdit = () => {
  //     if (editFolderName.trim() && editingFolder) {
  //       const existingFolder = folders.find(f => f.id !== editingFolder && f.name.toLowerCase() === editFolderName.toLowerCase());
  //       if (existingFolder) {
  //         toast.error('A folder with this name already exists');
  //         return;
  //       }

  //       setFolders(prev => prev.map(folder =>
  //         folder.id === editingFolder
  //           ? {
  //             await updateFolderName(editingFolder, editFolderName.trim())
  //             { ...folder, name: editFolderName.trim() }}
  //           : folder
  //       ));
  // toast.success('Folder renamed successfully');
  // setEditingFolder(null);
  // setEditFolderName('');
  //     }
  //   };

  const handleSaveEdit = async () => {
    if (editFolderName.trim() && editingFolder) {

      const existingFolder = folders.find(
        f => f.id !== editingFolder && f.name.toLowerCase() === editFolderName.toLowerCase()
      );

      if (existingFolder) {
        toast.error("A folder with this name already exists");
        return;
      }

      try {

        const result = await updateFolderName(editingFolder, editFolderName.trim());

        if (!result.success) {
          toast.error(result.message || "Failed to update folder name");
          return;
        }


        setFolders(prev =>
          prev.map(folder =>
            folder.id === editingFolder
              ? { ...folder, name: editFolderName.trim() }
              : folder
          )
        );

        toast.success("Folder renamed successfully");
        setEditingFolder(null);
        setEditFolderName("");
      } catch (error) {
        console.error("Error updating folder name:", error);
        toast.error("An unexpected error occurred while renaming the folder");
      }
    }
  };


  const handleCancelEdit = () => {
    setEditingFolder(null);
    setEditFolderName('');
  };

  const handleDeleteFolder = async (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      if (folder.count > 0) {
        const confirmed = window.confirm(`This folder contains ${folder.count} candidates. Are you sure you want to delete it?`);
        if (!confirmed) return;
      }
      const isDeleted = await deleteFolder(folderId)
      if (isDeleted.success) {
        setFolders(prev => prev.filter(f => f.id !== folderId));
        toast.success(`Deleted folder: ${folder.name}`);
      }

    }
  };

  const handleDoneButton = async () => {

    onClose();
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Manage Folders
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Create New Folder */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Create New Folder</Label>
            <div className="flex gap-2">
              <Input
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateFolder();
                  }
                }}
              />
              <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()} className='text-secondary-c border-2 border-secondary-c hover:text-white hover:bg-secondary-c'>
                <Plus className="w-4 h-4 mr-2" />
                Create
              </Button>
            </div>
          </div>

          {/* Existing Folders */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Your Folders ({folders?.length})</Label>

            {folders?.length === 0 ? (
              <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                <Folder className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No folders created yet</p>
                <p className="text-xs">Create your first folder above</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {folders?.map((folder) => (
                  <div
                    key={folder.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Folder className="w-4 h-4 text-blue-600" />
                      {editingFolder === folder.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <Input
                            value={editFolderName}
                            onChange={(e) => setEditFolderName(e.target.value)}
                            className="flex-1"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveEdit();
                              } else if (e.key === 'Escape') {
                                handleCancelEdit();
                              }
                            }}
                            autoFocus
                          />
                          <Button size="sm" onClick={handleSaveEdit} disabled={!editFolderName.trim()} className='bg-secondary-c'>
                            Save
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex-1">
                            <div className="font-medium">{folder.name}</div>
                            <div className="text-xs text-gray-500">
                              Created {new Date(folder?.createdAt).toLocaleString()}
                            </div>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {folder.count}
                          </Badge>
                        </>
                      )}
                    </div>

                    {editingFolder !== folder.id && (
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStartEdit(folder)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteFolder(folder.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleDoneButton} variant="outline">
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
