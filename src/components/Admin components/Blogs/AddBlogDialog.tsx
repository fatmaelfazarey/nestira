import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAdminStore } from '@/store/Admin store/AdminStore';
import { X } from 'lucide-react';

interface BlogItem {
    id: number;
    title: string;
    description: string;
    content: string | null;
    category: string;
    secondary_category?: string;
    read_time: string;
    tags: string[];
    image_path: string | null;
    trending: number;
    created_at: string;
    is_published: number;
    time_ago: string;
}

interface AddBlogDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    edit?: BlogItem | null;
}

const AddBlogDialog: React.FC<AddBlogDialogProps> = ({
    open,
    onOpenChange,
    onSuccess,
    edit
}) => {
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast();
    const { AddBlog, updateBlog } = useAdminStore();
    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        content: '',
        category: '',
        secondary_category: '',
        read_time: '',
        tags: [] as string[],
        image_path: '',
        trending: false,
        is_published: false,
    });
    const [tagInput, setTagInput] = React.useState('');

    const categories = ['Technology', 'Business', 'Health', 'Education', 'Lifestyle', 'Finance', 'Entertainment'];

    // Add "None" option for secondary category
    const allCategories = ['', ...categories]; // Empty string for "None"

    React.useEffect(() => {
        if (edit) {
            setFormData({
                title: edit.title || '',
                description: edit.description || '',
                content: edit.content || '',
                category: edit.category || '',
                secondary_category: edit.secondary_category ? edit.secondary_category : "none",
                read_time: edit.read_time || '',
                tags: edit.tags || [],
                image_path: edit.image_path || '',
                trending: edit.trending === 1,
                is_published: edit.is_published === 1,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                content: '',
                category: '',
                secondary_category: '',
                read_time: '',
                tags: [],
                image_path: '',
                trending: false,
                is_published: false,
            });
        }
        setTagInput('');
    }, [edit, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!formData.title.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Title is required',
                variant: 'destructive',
            });
            setLoading(false);
            return;
        }

        if (!formData.category.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Primary category is required',
                variant: 'destructive',
            });
            setLoading(false);
            return;
        }

        try {
            // Clean data before sending
            const cleanData = {
                ...formData,
                secondary_category: formData.secondary_category || null, // Convert empty string to null
            };

            if (edit) {
                const result = await updateBlog(edit.id, cleanData);
                if (result.success) {
                    toast({
                        title: 'Success',
                        description: 'Blog updated successfully',
                    });
                    onSuccess();
                    onOpenChange(false);
                } else {
                    throw new Error(result.message || 'Failed to update blog');
                }
            } else {
                const result = await AddBlog(cleanData);
                if (result.success) {
                    toast({
                        title: 'Success',
                        description: 'Blog article added successfully',
                    });
                    onSuccess();
                    onOpenChange(false);
                } else {
                    throw new Error(result.message || 'Failed to add blog');
                }
            }
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || (edit ? 'Failed to update blog article' : 'Failed to add blog article'),
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const addTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !formData.tags.includes(trimmedTag)) {
            setFormData({
                ...formData,
                tags: [...formData.tags, trimmedTag],
            });
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove),
        });
    };

    const handleTagKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{edit ? 'Edit Blog Article' : 'Add New Blog Article'}</DialogTitle>
                    <DialogDescription>
                        {edit ? 'Update the blog article details.' : 'Fill in the details for the new blog article.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    placeholder="Enter blog title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="read_time">Read Time</Label>
                                <Input
                                    id="read_time"
                                    placeholder="e.g., 5 min"
                                    value={formData.read_time}
                                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                placeholder="Enter blog description"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                rows={6}
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Enter blog content in HTML or plain text..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Primary Category *</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="secondary_category">Secondary Category (Optional)</Label>
                                <Select
                                    value={formData.secondary_category}
                                    onValueChange={(value) => setFormData({ ...formData, secondary_category: value === "none" ? null : value, })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category (optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* <SelectItem value="">None</SelectItem> */}
                                        <SelectItem value="none">None</SelectItem>

                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image_path">Image URL</Label>
                            <Input
                                id="image_path"
                                placeholder="https://example.com/image.jpg"
                                value={formData.image_path}
                                onChange={(e) => setFormData({ ...formData, image_path: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground">
                                Leave empty to use default placeholder image
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="tags"
                                    placeholder="Add a tag and press Enter"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagKeyDown}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={addTag}
                                    disabled={!tagInput.trim()}
                                >
                                    Add
                                </Button>
                            </div>
                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-1 px-3 py-1 bg-secondary rounded-full text-sm"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 text-muted-foreground hover:text-foreground"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                            <div className="space-y-2">
                                <Label htmlFor="trending" className="flex items-center gap-2 cursor-pointer">
                                    <span>Trending</span>
                                    <Switch
                                        id="trending"
                                        checked={formData.trending}
                                        onCheckedChange={(checked) => setFormData({ ...formData, trending: checked })}
                                    />
                                </Label>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="is_published" className="flex items-center gap-2 cursor-pointer">
                                    <span>Publish Immediately</span>
                                    <Switch
                                        id="is_published"
                                        checked={formData.is_published}
                                        onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                                    />
                                </Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="pt-4 border-t">
                        <div className="flex items-center justify-between w-full">
                            <div className="text-sm text-muted-foreground">
                                * Required fields
                            </div>
                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="min-w-[120px]"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            {edit ? 'Updating...' : 'Adding...'}
                                        </>
                                    ) : (
                                        edit ? 'Update Blog' : 'Add Blog'
                                    )}
                                </Button>
                            </div>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddBlogDialog;