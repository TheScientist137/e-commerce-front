import { Link } from "react-router";

export default function ShopPage() {
  return (
    <section>
      <Link to='/telescopes' >telescopes</Link>
      <Link to='/mounts' >mounts</Link>
    </section>
  )
}