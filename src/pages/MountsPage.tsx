import { useState, useEffect } from "react";
import { Mount } from "../types/types";
import { fetchMounts } from "../services/shopService";

export default function MountsPage() {
 const [mounts, setMounts] = useState<Mount[]>([])

 useEffect(() => {
  const fetchMountsData = async () => {

  }

  fetchMountsData();
 }, [])

 return (
  <section>
   <h3>Mounting types</h3>

  </section>
 )
}