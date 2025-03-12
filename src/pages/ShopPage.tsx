import { NavLink } from "react-router";

export default function ShopPage() {
  return (
    <section>
      <div>
      <NavLink to='/telescopes' >telescopes</NavLink>
      </div>
      <NavLink to='/mounts' >mounts</NavLink>
    </section>
  )
}