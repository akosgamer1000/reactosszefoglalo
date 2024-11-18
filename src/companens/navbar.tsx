export default function Navbar(){
    return<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item ">
        <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/tabletek-lista">listázás</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/tabletek-felvetel">telefonfelvétel</a>
      </li>
      <li className="nav-item">
        <a className="nav-link " href="/tabletek-torles">törlés</a>
      </li>
      <li className="nav-item">
        <a className="nav-link " href="/tabsearh">search</a>
      </li>
      <li className="nav-item">
        <a className="nav-link " href="/pagement">pagement</a>
      </li>
    </ul>
  </div>
</nav>
    
    </>
}