import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'GFM Training Academy'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              letterSpacing: '-0.05em',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            GFM
            <span style={{ color: '#DC2626', marginLeft: 10 }}>⚾</span>
          </div>
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#DC2626',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 20,
          }}
        >
          Training Academy
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#666',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Elite Baseball & Softball Development
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#888',
            marginTop: 30,
          }}
        >
          📍 Sanford, FL | 📞 407-519-0984
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}