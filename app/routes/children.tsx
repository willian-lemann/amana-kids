import { useEffect, useState } from "react";
import { db } from "app/api/database";

export default function ChildrenPage() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Children List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {children.map((child: any) => (
            <li key={child.id} className="border p-3 rounded">
              <div className="font-semibold">{child.full_name}</div>
              <div>Age: {child.age}</div>
              <div>
                Parent: {child.parent_name} ({child.parent_phone})
              </div>
              <div>
                Bathroom Alone: {child.goes_to_bathroom_alone ? "Yes" : "No"}
              </div>
              <div>
                Bathroom Help Authorized:{" "}
                {child.authorize_bathroom_help ? "Yes" : "No"}
              </div>
              <div>Food Restrictions: {child.food_restrictions}</div>
              <div>Allergies: {child.known_allergies}</div>
              <div>
                Image Authorization: {child.image_authorization ? "Yes" : "No"}
              </div>
              <div>Notes: {child.additional_notes}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
