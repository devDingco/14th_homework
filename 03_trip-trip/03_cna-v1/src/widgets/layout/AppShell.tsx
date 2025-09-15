import styles from './styles.module.css'

export type Props = {
  header?: React.ReactNode
  banner?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}

export default function AppShell({ header, banner, footer, children }: Props) {
  return (
    <section className={styles.layout}>
      {header}
      {banner}
      <main className={styles.pages}>{children}</main>
      {footer}
    </section>
  )
}
