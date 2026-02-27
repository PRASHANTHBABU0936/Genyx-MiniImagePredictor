import { useState } from 'react';
import axios from 'axios';
import { UploadCloud, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile) => {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        setResult(null);
        setError('');
    };

    const onSubmit = async () => {
        if (!file) return;

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('http://localhost:5000/api/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || 'Error processing image');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto' }} className="glass-panel animate-fade-in">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>AI Image Prediction</h2>
                <p style={{ color: 'var(--text-muted)' }}>Upload an image to get a mock AI prediction</p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {!preview ? (
                <div
                    className="upload-area"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('fileInput').click()}
                >
                    <UploadCloud size={60} color="#818cf8" style={{ marginBottom: '1rem' }} />
                    <h3>Drag & Drop your image here</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>or click to browse from your computer</p>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                        <img
                            src={preview}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}
                        />
                        {result && (
                            <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--surface)', borderRadius: '50%', padding: '0.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
                                <CheckCircle size={30} color="#10b981" />
                            </div>
                        )}
                    </div>

                    {result ? (
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                            <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>Prediction Complete!</h3>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{result.prediction}</div>
                        </div>
                    ) : (
                        <button
                            onClick={onSubmit}
                            className="btn-primary"
                            style={{ marginBottom: '1rem' }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Generate Prediction'}
                        </button>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button
                            onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                            style={{ background: 'transparent', border: '1px solid var(--surface-border)', color: 'var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                        >
                            Upload Another
                        </button>
                        {result && (
                            <button
                                onClick={() => navigate('/dashboard')}
                                style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}
                            >
                                View Dashboard
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Upload;
