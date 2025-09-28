import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Cache for 1 week, serve stale content while revalidating for up to 1 month
export const revalidate = 604800; // 7 days in seconds

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract parameters from URL with proper fallbacks
    const title = searchParams.get('title')?.trim() || 'Roderick Hsiao';
    const subtitle = searchParams.get('subtitle')?.trim() || 'Software Architect';
    const description = searchParams.get('description')?.trim() || 'Building great products with modern technology.';
    const theme = searchParams.get('theme')?.trim() || 'default';

  // Define color schemes - low-poly geometric style (dark theme)
  const themes = {
    default: {
      background: '#0F172A',
      primary: '#FFFFFF',
      accent: '#3B82F6',
      geometric: '#1E293B',
      dark: '#334155',
    },
    activity: {
      background: '#0F172A',
      primary: '#FFFFFF',
      accent: '#EF4444',
      geometric: '#1E293B',
      dark: '#DC2626',
    },
    education: {
      background: '#0F172A',
      primary: '#FFFFFF',
      accent: '#8B5CF6',
      geometric: '#1E293B',
      dark: '#7C3AED',
    },
    travel: {
      background: '#0F172A',
      primary: '#FFFFFF',
      accent: '#10B981',
      geometric: '#1E293B',
      dark: '#059669',
    },
  };

    const currentTheme = themes[theme as keyof typeof themes] || themes.default;

    // Ensure title is safe for rendering
    const safeTitle = title.length > 50 ? title.substring(0, 50) + '...' : title;
    const safeSubtitle = subtitle.length > 80 ? subtitle.substring(0, 80) + '...' : subtitle;
    const safeDescription = description.length > 150 ? description.substring(0, 150) + '...' : description;

    const response = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            backgroundColor: currentTheme.background,
            position: 'relative',
            fontFamily: 'Arial Black, Arial, sans-serif',
          }}
        >
          {/* Abstract artistic background elements */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: `linear-gradient(135deg, ${currentTheme.background} 0%, ${currentTheme.geometric} 100%)`,
              display: 'flex',
            }}
          />
          
          {/* Bold artistic accent stripe */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '200px',
              width: '12px',
              height: '800px',
              backgroundColor: currentTheme.accent,
              transform: 'rotate(15deg)',
              display: 'flex',
            }}
          />
          
          {/* Additional bold stripe */}
          <div
            style={{
              position: 'absolute',
              top: '-50px',
              right: '220px',
              width: '4px',
              height: '800px',
              backgroundColor: currentTheme.accent,
              transform: 'rotate(15deg)',
              opacity: 0.7,
              display: 'flex',
            }}
          />
          
          {/* Large abstract shape */}
          <div
            style={{
              position: 'absolute',
              top: '100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50% 20% 50% 20%',
              backgroundColor: currentTheme.accent,
              opacity: 0.15,
              transform: 'rotate(-30deg)',
              display: 'flex',
            }}
          />
          
          {/* Bold geometric triangle */}
          <div
            style={{
              position: 'absolute',
              top: '50px',
              left: '50px',
              width: '0',
              height: '0',
              borderLeft: '80px solid transparent',
              borderRight: '80px solid transparent',
              borderBottom: '140px solid ' + currentTheme.accent,
              opacity: 0.12,
              transform: 'rotate(45deg)',
              display: 'flex',
            }}
          />
          
          {/* Dynamic accent blocks - bigger and bolder */}
          <div
            style={{
              position: 'absolute',
              bottom: '120px',
              right: '80px',
              width: '100px',
              height: '100px',
              backgroundColor: currentTheme.accent,
              transform: 'rotate(15deg)',
              display: 'flex',
            }}
          />
          
          <div
            style={{
              position: 'absolute',
              bottom: '150px',
              right: '200px',
              width: '30px',
              height: '180px',
              backgroundColor: currentTheme.accent,
              opacity: 0.8,
              transform: 'rotate(-10deg)',
              display: 'flex',
            }}
          />
          
          {/* Bold diagonal stripe across */}
          <div
            style={{
              position: 'absolute',
              top: '300px',
              left: '-100px',
              width: '600px',
              height: '8px',
              backgroundColor: currentTheme.accent,
              opacity: 0.3,
              transform: 'rotate(-15deg)',
              display: 'flex',
            }}
          />
          
          {/* Vertical site name on edge */}
          <div
            style={{
              position: 'absolute',
              right: '30px',
              top: '50%',
              transform: 'translateY(-50%) rotate(90deg)',
              transformOrigin: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: currentTheme.primary,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              opacity: 0.6,
              display: 'flex',
            }}
          >
            roderickhsiao.me
          </div>
          
          {/* Main content area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '100%',
              padding: '80px',
              paddingRight: '120px',
              position: 'relative',
            }}
          >
            {/* Magazine-style title */}
            <div
              style={{
                fontSize: '90px',
                fontWeight: 900,
                color: currentTheme.primary,
                lineHeight: 0.8,
                marginBottom: '10px',
                letterSpacing: '-4px',
                textTransform: 'uppercase',
                display: 'flex',
                maxWidth: '800px',
                fontFamily: 'Impact, Arial Black, Arial, sans-serif',
                filter: 'contrast(1.2)',
              }}
            >
              {safeTitle}
            </div>
            
            {/* Bold accent line under title */}
            <div
              style={{
                width: '120px',
                height: '6px',
                backgroundColor: currentTheme.accent,
                marginBottom: '30px',
                display: 'flex',
              }}
            />
            
            {/* Subtitle with magazine styling */}
            <div
              style={{
                fontSize: '28px',
                fontWeight: 600,
                color: currentTheme.accent,
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'flex',
                maxWidth: '600px',
              }}
            >
              {safeSubtitle}
            </div>
            
            {/* Description with editorial style */}
            <div
              style={{
                fontSize: '20px',
                fontWeight: 400,
                color: currentTheme.primary,
                lineHeight: 1.4,
                maxWidth: '550px',
                opacity: 0.9,
                marginTop: '20px',
                display: 'flex',
              }}
            >
              {safeDescription}
            </div>
          </div>
          
          {/* Abstract corner element - much bolder */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '300px',
              height: '8px',
              backgroundColor: currentTheme.accent,
              display: 'flex',
            }}
          />
          
          {/* Additional bold corner triangle */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '0',
              height: '0',
              borderTop: '120px solid transparent',
              borderRight: '200px solid ' + currentTheme.accent,
              opacity: 0.1,
              display: 'flex',
            }}
          />
        </div>
      ),
    {
      width: 1200,
      height: 630,
    }
  );

  // Add cache headers to reduce regeneration costs
  response.headers.set('Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=2592000');

  return response;
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // Return a simple fallback image
    const fallbackResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fontSize: '48px',
            fontWeight: 'bold',
          }}
        >
          <div>Roderick Hsiao</div>
          <div style={{ fontSize: '24px', marginTop: '20px' }}>
            Software Architect & Community Leader
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    fallbackResponse.headers.set('Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=2592000');
    return fallbackResponse;
  }
}
