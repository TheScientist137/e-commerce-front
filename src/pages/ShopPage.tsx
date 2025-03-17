import { NavLink } from "react-router";

export default function ShopPage() {
  return (
    <section>
      <div>
        <NavLink to="/telescopes">telescopes</NavLink>
        <NavLink to="/mounts">mounts</NavLink>
      </div>
    </section>
  );
}
