import '../styles/Header.css'

export const Header = (props) => {
  const { title } = props
  return (
    <header>
      <h1 className="header-title">{title}</h1>
    </header>
  )
}
