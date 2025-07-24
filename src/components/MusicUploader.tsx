'use client';

import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function MusicUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [metadata, setMetadata] = useState({
    title: '',
    artist: '',
    genre: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('music', file);
    formData.append('title', metadata.title);
    formData.append('artist', metadata.artist);
    formData.append('genre', metadata.genre);

    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(percentComplete);
        }
      });

      xhr.open('POST', '/api/music/upload');
      xhr.send(formData);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Upload Your Music</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={metadata.title}
            onChange={(e) => setMetadata({...metadata, title: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="artist">Artist</Label>
          <Input
            id="artist"
            value={metadata.artist}
            onChange={(e) => setMetadata({...metadata, artist: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            value={metadata.genre}
            onChange={(e) => setMetadata({...metadata, genre: e.target.value})}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="music-file">Music File</Label>
          <Input
            id="music-file"
            type="file"
            accept="audio/*"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="cursor-pointer"
          />
        </div>
        
        {progress > 0 && progress < 100 && (
          <Progress value={progress} className="h-2" />
        )}
        
        <Button
          onClick={handleUpload}
          disabled={!file || progress > 0}
          className="w-full"
        >
          {progress > 0 ? `Uploading... ${Math.round(progress)}%` : 'Upload'}
        </Button>
      </CardContent>
    </Card>
  );
}