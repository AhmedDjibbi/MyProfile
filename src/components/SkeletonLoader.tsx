'use client';

export default function SkeletonLoader() {
    return (
        <div className="skeleton-container">
            {/* Hero Skeleton */}
            <section className="skeleton-hero">
                <div className="skeleton-greeting skeleton-pulse" />
                <div className="skeleton-name skeleton-pulse" />
                <div className="skeleton-title skeleton-pulse" />
                <div className="skeleton-description">
                    <div className="skeleton-line skeleton-pulse" />
                    <div className="skeleton-line skeleton-pulse" style={{ width: '80%' }} />
                    <div className="skeleton-line skeleton-pulse" style={{ width: '60%' }} />
                </div>
                <div className="skeleton-buttons">
                    <div className="skeleton-btn skeleton-pulse" />
                    <div className="skeleton-btn skeleton-pulse" />
                </div>
            </section>

            {/* Projects Skeleton */}
            <section className="skeleton-section">
                <div className="skeleton-section-title skeleton-pulse" />
                <div className="skeleton-section-subtitle skeleton-pulse" />
                <div className="skeleton-grid">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton-card skeleton-pulse" />
                    ))}
                </div>
            </section>
        </div>
    );
}
