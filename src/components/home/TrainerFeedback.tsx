import React, { useEffect, useState } from 'react';

interface FeedbackItem {
  id: string;
  instagramUrl: string;
  caption: string;
  author: string;
  role: string;
}

const feedbackData: FeedbackItem[] = [
  {
    id: '1',
    instagramUrl: 'https://www.instagram.com/reel/DZEmQ40SEE-/?igsh=Zzkzc2J5NmVqZ3J0',
    caption: 'An inspiring session that completely changed my perspective on building a perfume brand!',
    author: 'Priya Sharma',
    role: 'Aspiring Entrepreneur',
  },
  {
    id: '2',
    instagramUrl: 'https://www.instagram.com/reel/DYxCwbzT8s0/?igsh=MWJrcmY4dWRwdXRtNw==',
    caption: 'The 40-day framework is a game-changer. I now have a clear roadmap for my brand!',
    author: 'Amit Patel',
    role: 'Business Owner',
  },
  {
    id: '3',
    instagramUrl: 'https://www.instagram.com/reel/DXizSCVEaIx/?igsh=Znh5eHF4Mzhhd3Np',
    caption: 'Mayank\'s insights on packaging and positioning were absolutely priceless. Highly recommend!',
    author: 'Sneha Reddy',
    role: 'Startup Founder',
  },
];

const INSTAGRAM_EMBED_API = 'https://graph.facebook.com/v17.0/instagram_oembed';

const getInstagramEmbedUrl = (url: string): string => {
  return `${INSTAGRAM_EMBED_API}?url=${encodeURIComponent(url)}&omitscript=true`;
};

const TrainerFeedback: React.FC = () => {
  const [embeds, setEmbeds] = useState<Record<string, string>>({});

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.instagram.com/embed.js';
    document.body.appendChild(script);

    feedbackData.forEach(async (item) => {
      try {
        const response = await fetch(getInstagramEmbedUrl(item.instagramUrl));
        if (response.ok) {
          const data = await response.json();
          setEmbeds((prev) => ({
            ...prev,
            [item.id]: data.html,
          }));
        }
      } catch (error) {
        console.error(`Failed to fetch embed for ${item.id}:`, error);
      }
    });

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (Object.keys(embeds).length > 0 && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [embeds]);

  return (
    <section
      className="trainer-feedback-section"
      style={{
        padding: '70px 1rem',
        background: 'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(249,115,22,0.03) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-block',
              border: '1px solid #fed7aa',
              color: '#f97316',
              borderRadius: '9999px',
              padding: '0.375rem 1rem',
              fontSize: '14px',
              background: '#fef3c7',
              animation: 'pulseBadge 2s ease-in-out infinite',
            }}
          >
            ⭐ Real Stories from Real Learners
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              marginTop: '1rem',
              lineHeight: 1.2,
              color: '#111827',
            }}
          >
            What Our <span style={{ color: '#f97316' }}>Trainer's</span> Feedback
            <br />
            <span style={{ fontSize: 'clamp(18px, 2vw, 28px)', fontWeight: 600, color: '#4b5563' }}>
              Hear from those who've been through the workshop
            </span>
          </h2>
          <p
            style={{
              maxWidth: '600px',
              margin: '0.75rem auto 0',
              fontSize: '15px',
              color: '#6b7280',
              lineHeight: 1.7,
            }}
          >
            Real testimonials from participants who attended the BanegaBrand Perfume Business Workshop
            and launched their own brands.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {feedbackData.map((item, index) => (
            <div
              key={item.id}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                padding: '1.5rem 1.5rem 1.8rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.04)',
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                animation: `fadeInUp 0.6s ease ${index * 0.15}s both`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.06)';
              }}
            >
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#f3f4f6',
                  position: 'relative',
                  marginBottom: '1.25rem',
                }}
              >
                {embeds[item.id] ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: embeds[item.id] }}
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      gap: '12px',
                      color: '#9ca3af',
                      fontSize: '14px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #e5e7eb',
                        borderTop: '3px solid #f97316',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                    <span>Loading Reel...</span>
                  </div>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.7,
                    color: '#1f2937',
                    fontStyle: 'italic',
                    marginBottom: '1rem',
                    paddingLeft: '0.75rem',
                    borderLeft: '3px solid #f97316',
                  }}
                >
                  "{item.caption}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #f97316, #ea580c)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '18px',
                      flexShrink: 0,
                    }}
                  >
                    {item.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: '#111827' }}>
                      {item.author}
                    </div>
                    <div style={{ fontSize: '13px', color: '#6b7280' }}>{item.role}</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  color: '#6b7280',
                }}
              >
                <span style={{ fontSize: '16px' }}>📸</span>
                <span>View on Instagram</span>
                <a
                  href={item.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#f97316',
                    textDecoration: 'none',
                    fontWeight: 600,
                    marginLeft: 'auto',
                    fontSize: '12px',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ea580c')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#f97316')}
                >
                  Watch →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={() => {
              document.getElementById('registerModal')?.classList.add('open');
            }}
            style={{
              padding: '0.9rem 2.5rem',
              background: 'linear-gradient(135deg, #f97316, #ea580c)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 30px rgba(249,115,22,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(249,115,22,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(249,115,22,0.3)';
            }}
          >
            Join the Workshop Today 🚀
          </button>
          <p
            style={{
              fontSize: '13px',
              color: '#6b7280',
              marginTop: '0.75rem',
            }}
          >
            Limited seats available • 28 June 2025 • 11:00 AM – 1:00 PM IST
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulseBadge {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(249,115,22,0.2); }
          50% { transform: scale(1.03); box-shadow: 0 0 25px rgba(249,115,22,0.08); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .trainer-feedback-section .instagram-media {
          min-width: 100% !important;
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 12px !important;
        }
        .trainer-feedback-section iframe {
          width: 100% !important;
          height: 100% !important;
          min-height: 400px !important;
          border-radius: 12px !important;
        }
        @media (max-width: 640px) {
          .trainer-feedback-section {
            padding: 40px 0.75rem;
          }
          .trainer-feedback-section iframe {
            min-height: 320px !important;
          }
        }
      `}</style>
    </section>
  );
};

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default TrainerFeedback;
