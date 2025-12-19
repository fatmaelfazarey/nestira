import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAdminStore } from '@/store/Admin store/AdminStore';

interface ArticleItem {
    id: number;
    type: string;
    title: string;
    excerpt: string;
    content: string | null;
    image_path: string | null;
    read_time: string | null;
    views: number;
    is_new: number;
    is_trending: number;
    target_audience: string[];
    topics: string[];
    created_at: string;
    is_published: number;
    time_ago: string;
    admin_uid?: string;
}

interface AddReportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
    edit?: ArticleItem | null;
}

const AddReportDialog: React.FC<AddReportDialogProps> = ({
    open,
    onOpenChange,
    onSuccess,
    edit
}) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { AddReport, updateReport } = useAdminStore();

    const [formData, setFormData] = useState({
        type: 'article',
        title: '',
        excerpt: '',
        content: '',
        readTime: '',
        isNew: false,
        isTrending: false,
        isPublished: false,
        image: '',
        targetAudience: [] as string[],
        topics: [] as string[],
    });

    const [customAudience, setCustomAudience] = useState('');
    const [customTopic, setCustomTopic] = useState('');
    const [customType, setCustomType] = useState('');

    const [allTypes, setAllTypes] = useState([
        { value: 'article', label: 'Article' },
        { value: 'report', label: 'Report' },
        { value: 'survey', label: 'Survey' },
        { value: 'case-study', label: 'Case Study' },
        { value: 'white-paper', label: 'White Paper' },
        { value: 'technical-paper', label: 'Technical Paper' },
        { value: 'research-paper', label: 'Research Paper' },
        { value: 'industry-analysis', label: 'Industry Analysis' },
        { value: 'market-report', label: 'Market Report' },
        { value: 'trend-report', label: 'Trend Report' },
    ]);

    const audienceOptions = [
        'Hiring Manager',
        'HR Professional',
        'Recruiter',
        'Business Executive',
        'Team Lead',
        'Department Head',
        'CEO/CFO',
        'Finance Professional',
        'IT Manager',
        'Operations Manager',
        'Marketing Manager',
        'Sales Manager',
        'Student',
        'Academic',
        'Researcher',
        'Consultant',
        'Entrepreneur',
        'Investor',
    ];

    const topicOptions = [
        'Salary Trends',
        'MENA/GCC Focus',
        'Remote Work',
        'AI in Finance',
        'Skill Development',
        'Career Growth',
        'Industry Insights',
        'Market Analysis',
        'Hiring Trends',
        'Workforce Planning',
        'Employee Retention',
        'Performance Management',
        'Digital Transformation',
        'Sustainability',
        'Diversity & Inclusion',
        'Leadership Development',
        'Economic Outlook',
        'Technology Trends',
        'Healthcare Industry',
        'Education Sector',
        'Retail Market',
        'Real Estate Trends',
        'Startup Ecosystem',
        'Investment Opportunities',
    ];

    // Populate form when edit data changes or dialog opens
    useEffect(() => {
        if (open) {
            if (edit) {
                // Populate form with edit data
                setFormData({
                    type: edit.type || 'article',
                    title: edit.title || '',
                    excerpt: edit.excerpt || '',
                    content: edit.content || '',
                    readTime: edit.read_time || '',
                    isNew: edit.is_new === 1,
                    isTrending: edit.is_trending === 1,
                    isPublished: edit.is_published === 1,
                    image: edit.image_path || '',
                    targetAudience: edit.target_audience || [],
                    topics: edit.topics || [],
                });

                // Add custom type if it doesn't exist in allTypes
                if (edit.type && !allTypes.some(t => t.value === edit.type)) {
                    const label = edit.type.split('-').map(word =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ');
                    setAllTypes(prev => [...prev, { value: edit.type, label }]);
                }
            } else {
                // Reset form for new report
                setFormData({
                    type: 'article',
                    title: '',
                    excerpt: '',
                    content: '',
                    readTime: '',
                    isNew: false,
                    isTrending: false,
                    isPublished: false,
                    image: '',
                    targetAudience: [],
                    topics: [],
                });
            }
            setCustomAudience('');
            setCustomTopic('');
            setCustomType('');
        }
    }, [open, edit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.type.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Report type is required',
                variant: 'destructive',
            });
            return;
        }

        if (!formData.title.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Title is required',
                variant: 'destructive',
            });
            return;
        }

        if (!formData.excerpt.trim()) {
            toast({
                title: 'Validation Error',
                description: 'Excerpt/Summary is required',
                variant: 'destructive',
            });
            return;
        }

        // Prepare data for API
        const payload = {
            type: formData.type,
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            read_time: formData.readTime,
            is_new: formData.isNew ? 1 : 0,
            is_trending: formData.isTrending ? 1 : 0,
            is_published: formData.isPublished ? 1 : 0,
            target_audience: formData.targetAudience,
            topics: formData.topics,
            image: formData.image,
        };

        console.log(`${edit ? 'Updating' : 'Adding'} report data:`, payload);

        setLoading(true);
        try {
            if (edit) {
                // Update existing report
                const result = await updateReport(edit.id, payload);
                if (result.success) {
                    toast({
                        title: 'Success',
                        description: 'Report updated successfully',
                    });
                    onSuccess();
                    onOpenChange(false);
                } else {
                    throw new Error(result.message || 'Failed to update report');
                }
            } else {
                // Add new report
                const result = await AddReport(payload);
                if (result.success) {
                    toast({
                        title: 'Success',
                        description: 'Report added successfully',
                    });
                    onSuccess();
                    onOpenChange(false);
                } else {
                    throw new Error(result.message || 'Failed to add report');
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
            toast({
                title: 'Error',
                description: error.message || `Failed to ${edit ? 'update' : 'add'} report. Please try again.`,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddCustomAudience = () => {
        const trimmed = customAudience.trim();
        if (trimmed && !formData.targetAudience.includes(trimmed)) {
            setFormData({
                ...formData,
                targetAudience: [...formData.targetAudience, trimmed],
            });
            setCustomAudience('');
        }
    };

    const handleAddCustomTopic = () => {
        const trimmed = customTopic.trim();
        if (trimmed && !formData.topics.includes(trimmed)) {
            setFormData({
                ...formData,
                topics: [...formData.topics, trimmed],
            });
            setCustomTopic('');
        }
    };

    const handleAddCustomType = () => {
        const trimmed = customType.trim();
        if (trimmed) {
            const typeValue = trimmed.toLowerCase().replace(/\s+/g, '-');
            const typeExists = allTypes.some(type => type.value === typeValue);

            if (!typeExists) {
                const newType = { value: typeValue, label: trimmed };
                setAllTypes([...allTypes, newType]);
            }

            setFormData({
                ...formData,
                type: typeValue,
            });
            setCustomType('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent, type: 'audience' | 'topic' | 'type') => {
        if (e.key === 'Enter') {
            e.preventDefault();
            switch (type) {
                case 'audience':
                    handleAddCustomAudience();
                    break;
                case 'topic':
                    handleAddCustomTopic();
                    break;
                case 'type':
                    handleAddCustomType();
                    break;
            }
        }
    };

    const removeAudience = (audienceToRemove: string) => {
        setFormData({
            ...formData,
            targetAudience: formData.targetAudience.filter(audience => audience !== audienceToRemove),
        });
    };

    const removeTopic = (topicToRemove: string) => {
        setFormData({
            ...formData,
            topics: formData.topics.filter(topic => topic !== topicToRemove),
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {edit ? 'Edit Report' : 'Add New Report'}
                    </DialogTitle>
                    <DialogDescription>
                        {edit
                            ? 'Update the report details. All changes will be saved immediately.'
                            : 'Create a new research report or article. Fill in all required fields marked with *.'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <ScrollArea className="h-[calc(90vh-200px)] pr-4">
                        <div className="space-y-6 py-2">
                            {/* Report Type with Custom Input */}
                            <div className="space-y-3">
                                <Label htmlFor="type" className="text-sm font-medium">
                                    Report Type *
                                </Label>

                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select report type">
                                            {allTypes.find(t => t.value === formData.type)?.label ||
                                                formData.type.split('-').map(word =>
                                                    word.charAt(0).toUpperCase() + word.slice(1)
                                                ).join(' ')}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {allTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}

                                        <div className="border-t pt-2 mt-2">
                                            <div className="px-2 py-1">
                                                <Label className="text-xs text-muted-foreground mb-1 block">
                                                    Add Custom Type
                                                </Label>
                                            </div>
                                        </div>
                                    </SelectContent>
                                </Select>

                                {/* Custom Type Input */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">
                                        Or enter custom type:
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={customType}
                                            onChange={(e) => setCustomType(e.target.value)}
                                            placeholder="Enter custom report type (e.g., Industry Analysis)"
                                            className="flex-1"
                                            onKeyPress={(e) => handleKeyPress(e, 'type')}
                                        />
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={handleAddCustomType}
                                            disabled={!customType.trim()}
                                            variant="outline"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Current Type Display */}
                                <div className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span>Current type:</span>
                                    <Badge variant="secondary" className="font-medium">
                                        {formData.type}
                                    </Badge>
                                    {allTypes.find(t => t.value === formData.type)?.label && (
                                        <span className="text-xs">
                                            ({allTypes.find(t => t.value === formData.type)?.label})
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-medium">
                                    Title *
                                </Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter report title"
                                    className="w-full"
                                    required
                                />
                            </div>

                            {/* Excerpt */}
                            <div className="space-y-2">
                                <Label htmlFor="excerpt" className="text-sm font-medium">
                                    Excerpt/Summary *
                                </Label>
                                <Textarea
                                    id="excerpt"
                                    rows={3}
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief summary of the report (max 200 characters)"
                                    className="resize-none"
                                    required
                                    maxLength={200}
                                />
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-muted-foreground">
                                        A concise summary that will appear in the report listing.
                                    </p>
                                    <span className="text-xs text-muted-foreground">
                                        {formData.excerpt.length}/200
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <Label htmlFor="content" className="text-sm font-medium">
                                    Full Content
                                </Label>
                                <Textarea
                                    id="content"
                                    rows={8}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Full report content (HTML supported)"
                                    className="resize-none font-mono text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Enter the complete article content. You can use HTML formatting for rich text.
                                </p>
                            </div>

                            {/* Read Time & Image URL */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="readTime" className="text-sm font-medium">
                                        Read Time (Optional)
                                    </Label>
                                    <Input
                                        id="readTime"
                                        placeholder="e.g., 8 min"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image" className="text-sm font-medium">
                                        Image URL (Optional)
                                    </Label>
                                    <Input
                                        id="image"
                                        placeholder="https://example.com/image.jpg"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Leave empty to use default placeholder image
                                    </p>
                                </div>
                            </div>

                            {/* Target Audience */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">Target Audience</Label>
                                    <span className="text-xs text-muted-foreground">
                                        {formData.targetAudience.length} selected
                                    </span>
                                </div>

                                {/* Audience Options Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {audienceOptions.map((audience) => {
                                        const isSelected = formData.targetAudience.includes(audience);
                                        return (
                                            <button
                                                key={audience}
                                                type="button"
                                                onClick={() => {
                                                    if (isSelected) {
                                                        removeAudience(audience);
                                                    } else {
                                                        setFormData({
                                                            ...formData,
                                                            targetAudience: [...formData.targetAudience, audience],
                                                        });
                                                    }
                                                }}
                                                className={cn(
                                                    "flex items-center justify-center p-2 rounded-md border text-sm transition-colors",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-background hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                {audience}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Custom Audience Input */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">
                                        Add custom audience:
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={customAudience}
                                            onChange={(e) => setCustomAudience(e.target.value)}
                                            placeholder="Enter custom audience..."
                                            className="flex-1"
                                            onKeyPress={(e) => handleKeyPress(e, 'audience')}
                                        />
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={handleAddCustomAudience}
                                            disabled={!customAudience.trim()}
                                            variant="outline"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Selected Audiences */}
                                {formData.targetAudience.length > 0 && (
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">
                                            Selected audiences:
                                        </Label>
                                        <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-md">
                                            {formData.targetAudience.map((audience, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className="pl-3 pr-1 py-1 flex items-center gap-1"
                                                >
                                                    {audience}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeAudience(audience)}
                                                        className="ml-1 hover:bg-muted rounded-full p-0.5"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Topics */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-medium">Topics</Label>
                                    <span className="text-xs text-muted-foreground">
                                        {formData.topics.length} selected
                                    </span>
                                </div>

                                {/* Topic Options Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {topicOptions.map((topic) => {
                                        const isSelected = formData.topics.includes(topic);
                                        return (
                                            <button
                                                key={topic}
                                                type="button"
                                                onClick={() => {
                                                    if (isSelected) {
                                                        removeTopic(topic);
                                                    } else {
                                                        setFormData({
                                                            ...formData,
                                                            topics: [...formData.topics, topic],
                                                        });
                                                    }
                                                }}
                                                className={cn(
                                                    "flex items-center justify-center p-2 rounded-md border text-sm transition-colors",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-background hover:bg-accent hover:text-accent-foreground"
                                                )}
                                            >
                                                {topic}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Custom Topic Input */}
                                <div className="space-y-2">
                                    <Label className="text-xs text-muted-foreground">
                                        Add custom topic:
                                    </Label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={customTopic}
                                            onChange={(e) => setCustomTopic(e.target.value)}
                                            placeholder="Enter custom topic..."
                                            className="flex-1"
                                            onKeyPress={(e) => handleKeyPress(e, 'topic')}
                                        />
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={handleAddCustomTopic}
                                            disabled={!customTopic.trim()}
                                            variant="outline"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Selected Topics */}
                                {formData.topics.length > 0 && (
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">
                                            Selected topics:
                                        </Label>
                                        <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-md">
                                            {formData.topics.map((topic, index) => (
                                                <Badge
                                                    key={index}
                                                    variant="secondary"
                                                    className="pl-3 pr-1 py-1 flex items-center gap-1"
                                                >
                                                    {topic}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeTopic(topic)}
                                                        className="ml-1 hover:bg-muted rounded-full p-0.5"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Toggles */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-muted/20 rounded-lg">
                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="isNew" className="text-sm font-medium cursor-pointer">
                                        Mark as New
                                    </Label>
                                    <Switch
                                        id="isNew"
                                        checked={formData.isNew}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isNew: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="isTrending" className="text-sm font-medium cursor-pointer">
                                        Mark as Trending
                                    </Label>
                                    <Switch
                                        id="isTrending"
                                        checked={formData.isTrending}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isTrending: checked })}
                                    />
                                </div>

                                <div className="flex items-center justify-between space-x-2">
                                    <Label htmlFor="isPublished" className="text-sm font-medium cursor-pointer">
                                        Publish Immediately
                                    </Label>
                                    <Switch
                                        id="isPublished"
                                        checked={formData.isPublished}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                                    />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>

                    <DialogFooter className="pt-6 border-t">
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
                                        edit ? 'Update Report' : 'Add Report'
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

export default AddReportDialog;