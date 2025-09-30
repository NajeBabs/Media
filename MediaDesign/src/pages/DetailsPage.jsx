import { useParams } from "react-router-dom"

export default function DetailsPage() {
  const { id } = useParams()
  return <h2 className="text-2xl">Details Page (id: {id})</h2>
}
