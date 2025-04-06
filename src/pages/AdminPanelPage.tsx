import { useShopContext } from "../hooks/useContext"

export default function AdminPanelPage() {
  const { products } = useShopContext();

  return (
    <section>
      <h2>Admin Panel</h2>
    </section>
  )
}