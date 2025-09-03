import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_MAP_API_KEY_SERVER;
  console.log('API 키 존재 여부:', !!apiKey);
  console.log('API 키 길이:', apiKey?.length);

  if (!apiKey) {
    return NextResponse.json({ error: 'Google Maps API key not configured' }, { status: 500 });
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  console.log('Google Geocode API 요청 URL:', url);

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Google API 응답:', data);

    if (data.error_message) {
      console.error('Google API 에러:', data.error_message);
      return NextResponse.json(
        {
          error: 'Google API Error',
          details: data.error_message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Geocoding API 요청 실패:', error);
    return NextResponse.json({ error: 'Failed to fetch geocode' }, { status: 500 });
  }
}
