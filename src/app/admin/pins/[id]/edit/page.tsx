import { notFound } from "next/navigation";
import { PinForm } from "@/components/admin/PinForm";
import { MOCK_PINS } from "@/lib/mock-data";

interface EditPinPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPinPage({ params }: EditPinPageProps) {
  const { id } = await params;
  const pin = MOCK_PINS.find((p) => p.id === id);
  if (!pin) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Edit Pin</h1>
      <PinForm pin={pin} />
    </div>
  );
}
