import React, { useState } from "react";

export default function Field({ field, onChange, onDelete }) {
  const [nestedFields, setNestedFields] = useState([]);

  const handleNameChange = (event) => {
    onChange({ ...field, name: event.target.value });
  };

  const handleTypeChange = (event) => {
    const newType = event.target.value;
    if (newType === "object") {
      setNestedFields([{ name: "", type: "string" }]);
    } else {
      setNestedFields([]);
    }
    onChange({ ...field, type: newType, fields: nestedFields });
  };

  const handleNestedFieldChange = (index, newField) => {
    setNestedFields((fields) =>
      fields.map((field, i) => (i === index ? newField : field))
    );
    onChange({ ...field, fields: nestedFields });
  };

  const handleNestedFieldAdd = () => {
    setNestedFields([...nestedFields, { name: "", type: "string" }]);
    onChange({ ...field, fields: nestedFields });
  };

  const handleNestedFieldDelete = (index) => {
    setNestedFields(nestedFields.filter((field, i) => i !== index));
    onChange({ ...field, fields: nestedFields });
  };

  return (
    <div>
      <input type="text" value={field.name} onChange={handleNameChange} />
      <select value={field.type} onChange={handleTypeChange}>
        <option value="string">String</option>
        <option value="number">Number</option>
        <option value="boolean">Boolean</option>
        <option value="object">Object</option>
      </select>
      <button onClick={onDelete}>x</button>
      {field.type === "object" && (
        <button onClick={handleNestedFieldAdd}>Add Nested Field</button>
      )}
      {field.type === "object" &&
        nestedFields.map((nestedField, index) => (
          <div key={index} style={{ marginLeft: "1em" }}>
            <Field
              field={nestedField}
              onChange={(newField) => handleNestedFieldChange(index, newField)}
              onDelete={() => handleNestedFieldDelete(index)}
            />
          </div>
        ))}
    </div>
  );
}
