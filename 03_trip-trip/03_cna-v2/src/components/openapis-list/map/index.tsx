'use client'
import { CustomOverlayMap, Map, Polygon, useKakaoLoader } from 'react-kakao-maps-sdk'
import geo from 'commons/map/SIDO_MAP_2022.json'
import { useState } from 'react'

const COLORS = [
  '#7F5A83',
  '#2E9CCA',
  '#D90429',
  '#5A3921',
  '#89ABE3',
  '#aa9030',
  '#A3628B',
  '#6A0572',
  '#F95700',
  '#1e7d74',
  '#3A89C9',
  '#194440',
  '#D00000',
  '#FF61A6',
  '#5C2751',
  '#00798C',
  '#5ce433',
  '#FFD523',
  '#7B2C3F',
  '#ADBDFF',
]

export default function KoreaMap() {
  useKakaoLoader({ appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_APPKEY!, libraries: [] })
  const [hoverId, setHoverId] = useState<string | null>(null)

  // [lng, lat] → { lat, lng }
  const toLatLng = ([lng, lat]: number[]) => ({ lat, lng })

  // 폴리곤/멀티폴리곤을 "한 폴리곤 단위"로 반환 (각 폴리곤은 [outer, hole1, ...])
  const geomToPolygons = (geom: any) => {
    if (!geom) return []
    if (geom.type === 'Polygon') {
      // [[ring1],[ring2]...] → [[{lat,lng}[], {lat,lng}[], ...]]
      return [geom.coordinates.map((ring: number[][]) => ring.map(toLatLng))]
    }
    if (geom.type === 'MultiPolygon') {
      // [[[ring...]], [[ring...]], ...]
      return geom.coordinates.map((poly: number[][][]) =>
        poly.map((ring: number[][]) => ring.map(toLatLng))
      )
    }
    return []
  }

  return (
    <div className="w-screen h-screen">
      <Map center={{ lat: 36.5, lng: 127.8 }} level={11} className="w-full h-full">
        {(geo as any).features.map((f: any, idx: number) => {
          const id = f.properties.CTPRVN_CD
          const en_name = f.properties.CTP_ENG_NM
          const k_name = f.properties.CTP_KOR_NM
          const polys = geomToPolygons(f.geometry)
          const color = COLORS[idx % COLORS.length]
          const hovered = hoverId === id

          const position =
            polys.length > 0 && polys[0].length > 0 ? polys[0][0][0] : { lat: 0, lng: 0 }
          return (
            <div key={id}>
              {polys.map((ring: any, pIdx: number) => {
                return (
                  <>
                    <Polygon
                      key={`${id}-${pIdx}`}
                      path={ring}
                      strokeWeight={2}
                      strokeColor={color}
                      strokeOpacity={0.9}
                      fillColor={hovered ? color : '#ffffff'}
                      fillOpacity={hovered ? 0.55 : 0.35}
                      onMouseover={() => setHoverId(id)}
                      onMouseout={() => setHoverId((cur) => (cur === id ? null : cur))}
                    />
                    {hovered && (
                      <CustomOverlayMap position={position}>
                        <div
                          style={{
                            padding: '5px 10px',
                            backgroundColor: 'white',
                            border: '1px solid black',
                            borderRadius: '5px',
                          }}
                        >
                          {k_name}
                        </div>
                      </CustomOverlayMap>
                    )}
                  </>
                )
              })}
            </div>
          )
        })}
      </Map>
    </div>
  )
}
