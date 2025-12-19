// components/HelpArticleForm.tsx
import { useState } from 'react';
import { X, Link, FileText, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface HelpArticleFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (article: HelpArticle) => void;
}

export interface HelpArticle {
    id?: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;

}

const CATEGORIES = [
    'Getting Started',
    'Account Management',
    'Billing & Payments',
    'Job Posting',
    'Candidate Management',
    'Platform Features',
    'Troubleshooting',
    'Best Practices'
];

const HelpArticleForm: React.FC<HelpArticleFormProps> = ({ isOpen, onClose, onSave }) => {
    const [article, setArticle] = useState<HelpArticle>({
        title: '',
        description: '',
        category: '',
        imageUrl: '',
        content: '',

    });

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!article.title || !article.description || !article.category || !article.content) {
            alert('Please fill in all required fields');
            return;
        }

        onSave(article);
        handleClose();
    };

    const handleClose = () => {
        setArticle({
            title: '',
            description: '',
            category: '',
            imageUrl: '',
            content: '',

        });
        onClose();
    };

    const handleChange = (field: keyof HelpArticle, value: string | boolean) => {
        setArticle(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-secondary-c to-secondary-c/90 text-white">
                    <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6" />
                        <h2 className="text-xl font-semibold">Create Help Article</h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="text-white hover:bg-white/20"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Form Content */}
                <ScrollArea className="h-[calc(90vh-200px)]">
                    <div className="p-6 space-y-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-secondary-c" />
                                    Article Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Title *
                                        </label>
                                        <Input
                                            value={article.title}
                                            onChange={(e) => handleChange('title', e.target.value)}
                                            placeholder="Enter article title..."
                                            className="w-full"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Category *
                                        </label>
                                        <select
                                            value={article.category}
                                            onChange={(e) => handleChange('category', e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-c focus:border-transparent"
                                        >
                                            <option value="">Select a category</option>
                                            {CATEGORIES.map(category => (
                                                <option key={category} value={category}>
                                                    {category}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Short Description *
                                        </label>
                                        <Textarea
                                            value={article.description}
                                            onChange={(e) => handleChange('description', e.target.value)}
                                            placeholder="Brief description of the article..."
                                            rows={3}
                                            className="w-full resize-none"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Image URL */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Link className="w-5 h-5 text-secondary-c" />
                                    Featured Image URL
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <Input
                                            value={article.imageUrl}
                                            onChange={(e) => handleChange('imageUrl', e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full pl-12 py-3"
                                        />
                                    </div>

                                    {/* Image Preview */}
                                    {article.imageUrl && (
                                        <div className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-3">
                                                <Image className="w-5 h-5 text-secondary-c" />
                                                <span className="text-sm font-medium text-gray-700">Image Preview</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20 bg-gray-100 rounded-lg border flex items-center justify-center overflow-hidden">
                                                    <img
                                                        src={article.imageUrl}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-600 break-all">
                                                        {article.imageUrl}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Image will be displayed in the article
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Article Content */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-secondary-c" />
                                    Article Content *
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={article.content}
                                    onChange={(e) => handleChange('content', e.target.value)}
                                    placeholder="Write the full article content here. You can use markdown formatting..."
                                    rows={12}
                                    className="w-full resize-none font-mono text-sm"
                                />

                            </CardContent>
                        </Card>


                    </div>
                </ScrollArea>

                {/* Footer Actions */}
                <div className="flex items-center justify-between p-6 border-t bg-gray-50">
                    <div className="text-sm text-gray-500">
                        * Required fields
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={handleClose}
                            className="border-gray-300 px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-secondary-c hover:bg-secondary-c/90 px-6"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Create Article
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpArticleForm;