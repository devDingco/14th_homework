"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import useOpenApis from "./hook";
import styles from "./styles.module.css";

export default function OpenApis() {
  useOpenApis();

  return (
    <div className={styles.page}>
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }}
        style={{ width: "800px", height: "500px" }}
        level={10}
      >
        <MapMarker position={{ lat: 33.450701, lng: 126.570667 }}>
          <div>카카오 본사</div>
        </MapMarker>
      </Map>
    </div>
  );
}
