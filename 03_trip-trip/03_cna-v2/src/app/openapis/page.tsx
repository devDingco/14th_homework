'use client'
import MapComponent from 'components/openapis-list/map'
import styles from './styles.module.css'

export default function OpenApiPage() {
  return (
    <main className={styles.apiLayout}>
      <div className={styles.apiFrame}>
        <MapComponent />
      </div>
    </main>
  )
}
