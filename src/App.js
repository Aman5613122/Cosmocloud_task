import "./styles.css";
import React, { useState } from "react";
import Field from "./Field";

export default function App() {
  const [fields, setFields] = useState([{ name: "", type: "string" }]);

  const handleFieldChange = (index, newField) => {
    setFields((fields) =>
      fields.map((field, i) => (i === index ? newField : field))
    );
  };

  const handleFieldAdd = () => {
    setFields([...fields, { name: "", type: "string" }]);
  };

  const handleFieldDelete = (index) => {
    setFields(fields.filter((field, i) => i !== index));
  };

  const handleNestedFieldAdd = (index) => {
    setFields((fields) => {
      const newFields = [...fields];
      const nestedFields = newFields[index].fields || [];
      nestedFields.push({ name: "", type: "string" });
      newFields[index].fields = nestedFields;
      return newFields;
    });
  };

  const handleNestedFieldChange = (parentIndex, nestedIndex, newField) => {
    setFields((fields) => {
      const newFields = [...fields];
      const nestedFields = newFields[parentIndex].fields || [];
      nestedFields[nestedIndex] = newField;
      newFields[parentIndex].fields = nestedFields;
      return newFields;
    });
  };

  const handleNestedFieldDelete = (parentIndex, nestedIndex) => {
    setFields((fields) => {
      const newFields = [...fields];
      const nestedFields = newFields[parentIndex].fields || [];
      newFields[parentIndex].fields = nestedFields.filter(
        (field, i) => i !== nestedIndex
      );
      return newFields;
    });
  };

  const handleSave = () => {
    console.log(fields);
  };

  return (
    <div>
      {fields.map((field, index) => (
        <div key={index}>
          <Field
            field={field}
            onChange={(newField) => handleFieldChange(index, newField)}
            onAddNestedField={() => handleNestedFieldAdd(index)}
            onDelete={() => handleFieldDelete(index)}
            onNestedFieldChange={(nestedIndex, newField) =>
              handleNestedFieldChange(index, nestedIndex, newField)
            }
            onNestedFieldDelete={(nestedIndex) =>
              handleNestedFieldDelete(index, nestedIndex)
            }
          />
        </div>
      ))}
      <button onClick={handleFieldAdd}>Add Field</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
