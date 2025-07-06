
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown, X, Folder, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AddToFolderModalProps {
  candidate: any;
  isOpen: boolean;
  onClose: () => void;
}

// Mock folders data - in a real app, this would come from a state management system or API
const mockFolders = [
  { id: '1', name: 'Logistics coordinator', count: 12 },
  { id: '2', name: 'Finance Managers', count: 8 },
  { id: '3', name: 'Senior Analysts', count: 15 },
  { id: '4', name: 'Remote Candidates', count: 23 },
  { id: '5', name: 'High Priority', count: 6 }
];

export const AddToFolderModal: React.FC<AddToFolderModalProps> = ({
  candidate,
  isOpen,
  onClose
}) => {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [folders, setFolders] = useState(mockFolders);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedFolders([]);
      setSearchValue('');
      setNewFolderName('');
    }
  }, [isOpen]);

  const handleCreateNewFolder = () => {
    if (newFolderName.trim() && !folders.find(f => f.name.toLowerCase() === newFolderName.toLowerCase())) {
      const newFolder = {
        id: Date.now().toString(),
        name: newFolderName.trim(),
        count: 0
      };
      setFolders(prev => [...prev, newFolder]);
      setSelectedFolders(prev => [...prev, newFolder.id]);
      setNewFolderName('');
      toast.success(`Created new folder: ${newFolder.name}`);
    }
  };

  const handleToggleFolder = (folderId: string) => {
    setSelectedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const handleRemoveFolder = (folderId: string) => {
    setSelectedFolders(prev => prev.filter(id => id !== folderId));
  };

  const handleSave = () => {
    if (selectedFolders.length === 0) {
      toast.error('Please select at least one folder');
      return;
    }

    const folderNames = selectedFolders.map(id => 
      folders.find(f => f.id === id)?.name
    ).filter(Boolean);

    // Mock save operation - in a real app, this would be an API call
    setTimeout(() => {
      if (folderNames.length === 1) {
        toast.success(`Candidate added to folder: ${folderNames[0]}`);
      } else {
        toast.success(`Candidate added to ${folderNames.length} folders`);
      }
      onClose();
    }, 300);
  };

  const filteredFolders = folders.filter(folder =>
    folder.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const canCreateNew = searchValue.trim() && 
    !folders.find(f => f.name.toLowerCase() === searchValue.toLowerCase());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Add candidate to folder
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Bookmark the candidate by adding him/her to a folder, for easier and faster tracking later.
          </p>

          {/* Selected Folders */}
          {selectedFolders.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Selected Folders</Label>
              <div className="flex flex-wrap gap-2">
                {selectedFolders.map(folderId => {
                  const folder = folders.find(f => f.id === folderId);
                  return folder ? (
                    <Badge
                      key={folderId}
                      variant="secondary"
                      className="flex items-center gap-1 pr-1"
                    >
                      {folder.name}
                      <button
                        onClick={() => handleRemoveFolder(folderId)}
                        className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Folder Search/Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Folders</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  Search folders...
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search folders..." 
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandList>
                    <CommandEmpty>
                      {canCreateNew ? (
                        <div className="p-2">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm"
                            onClick={() => {
                              setNewFolderName(searchValue);
                              setOpen(false);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Create "{searchValue}"
                          </Button>
                        </div>
                      ) : (
                        "No folders found."
                      )}
                    </CommandEmpty>
                    <CommandGroup>
                      {filteredFolders.map((folder) => (
                        <CommandItem
                          key={folder.id}
                          onSelect={() => {
                            handleToggleFolder(folder.id);
                            setOpen(false);
                            setSearchValue('');
                          }}
                          className="cursor-pointer"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedFolders.includes(folder.id) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex items-center justify-between w-full">
                            <span>{folder.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {folder.count}
                            </Badge>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Create New Folder */}
          {newFolderName && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Create New Folder</Label>
              <div className="flex gap-2">
                <Input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateNewFolder();
                    }
                  }}
                />
                <Button onClick={handleCreateNewFolder} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* No Options Message */}
          {selectedFolders.length === 0 && !newFolderName && (
            <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
              No options
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSave}
              disabled={selectedFolders.length === 0 && !newFolderName}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
