import { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Image as ImageIcon } from 'lucide-react';

const Dashboard = () => {
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/dashboard');
                setPredictions(res.data);
            } catch (err) {
                setError('Failed to fetch dashboard data');
            } finally {
                setLoading(false);
            }
        };

        fetchPredictions();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading your predictions...</div>;

    return (
        <div className="animate-fade-in">
            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Your Dashboard</h1>
                <span className="prediction-badge">{predictions.length} Total</span>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {predictions.length === 0 && !error ? (
                <div style={{ textAlign: 'center', padding: '4rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
                    <ImageIcon size={48} color="var(--surface-border)" style={{ marginBottom: '1rem' }} />
                    <h3>No predictions yet</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Upload an image to see results here.</p>
                </div>
            ) : (
                <div className="dashboard-grid">
                    {predictions.map((item) => (
                        <div key={item._id} className="prediction-card">
                            <img
                                src={`http://localhost:5000${item.image_url}`}
                                alt="Uploaded"
                                className="prediction-image"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Image+Missing' }}
                            />
                            <div className="prediction-info">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>AI Result</div>
                                        <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{item.prediction}</div>
                                    </div>
                                    <div className="prediction-badge">AI</div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <Clock size={14} />
                                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
