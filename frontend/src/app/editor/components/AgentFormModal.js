import React, { useState } from "react";
import { Icon } from "@mdi/react";
import { mdiClose } from "@mdi/js";
import {
  roleBasedFormFields,
  llmOptions,
  reactBasedFormFields,
} from "../../../public/data/formFields";

const AgentFormModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    agent_type: "",
    Backstory: "",
    description: "",
    Goal: "",
    id: "",
    LLM: "",
    Prompt_Template: "",
    Response_Template: "",
    Role: "",
    System_Template: "",
    Tools: "",
    save_memory: "",
    type: "agent",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    if (name === "id") {
      cleanedValue = value.replace(/\s+/g, "");

      cleanedValue = cleanedValue.replace(/[^a-zA-Z]/g, "");
    }

    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onCreate(formData);
  };

  const isAgentTypeSelected = () => {
    return formData.agent_type !== "";
  };

  const renderRoleBasedFields = () => (
    <>
      {roleBasedFormFields.map((field, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-gray-700">{field.name}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={field.rows}
              required
              placeholder={field.placeholder}
            />
          ) : (
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder={field.placeholder}
              required
            />
          )}
        </div>
      ))}

      <div className="mb-4">
        <label className="block text-gray-700">LLM</label>
        <div className="flex space-x-2">
          {llmOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  LLM: item.text,
                }));
              }}
              className={`relative cursor-pointer border rounded-lg overflow-hidden ${
                formData.LLM === item.text
                  ? "border-orange-500 shadow-lg shadow-orange-300"
                  : "border-gray-300"
              } hover:border-orange-400 hover:shadow-md hover:shadow-orange-300 transition-all duration-300`}
              style={{ width: "80px", height: "80px" }}
            >
              <img
                src={item.url}
                alt={`LLM ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Save Memory</label>
        <select
          name="save_memory"
          value={formData.save_memory}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </div>
    </>
  );

  const renderReactLegecyFields = () => (
    <>
      {reactBasedFormFields.map((field, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-gray-700">{field.name}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={field.rows}
              required={field.required}
              placeholder={field.placeholder}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder={field.placeholder}
              required={field.required}
            />
          )}
        </div>
      ))}
      <div className="mb-4">
        <label className="block text-gray-700">LLM</label>
        <div className="flex space-x-2">
          {llmOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  LLM: item.text,
                }));
              }}
              className={`relative cursor-pointer border rounded-lg overflow-hidden ${
                formData.LLM === item.text
                  ? "border-orange-500 shadow-lg shadow-orange-300"
                  : "border-gray-300"
              } hover:border-orange-400 hover:shadow-md hover:shadow-orange-300 transition-all duration-300`}
              style={{ width: "80px", height: "80px" }}
            >
              <img
                src={item.url}
                alt={`LLM ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Tools</label>

        <div className="flex flex-wrap gap-2 mb-2">
          {formData.Tools &&
            formData.Tools.split(",").map((tool, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-2 py-1 rounded-full shadow-md"
              >
                <span className="mr-2">{tool}</span>
                <button
                  type="button"
                  onClick={() => {
                    const updatedTools = formData.Tools.split(",")
                      .filter((t) => t !== tool)
                      .join(",");
                    setFormData((prev) => ({
                      ...prev,
                      Tools: updatedTools,
                    }));
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Icon path={mdiClose} size={0.8} />
                </button>
              </div>
            ))}
        </div>

        <select
          name="tools"
          multiple
          value={formData.Tools ? formData.Tools.split(",") : []}
          onChange={(e) => {
            const selectedTools = Array.from(e.target.selectedOptions).map(
              (option) => option.value
            );

            const existingTools = formData.Tools
              ? formData.Tools.split(",")
              : [];
            const updatedTools = Array.from(
              new Set([...existingTools, ...selectedTools])
            ); // Avoid duplicates

            setFormData((prev) => ({
              ...prev,
              Tools: updatedTools.join(","),
            }));
          }}
          className="w-full p-2 border rounded"
          size={5}
        >
          <option value="TavilySearchResults">TavilySearchResults</option>
          <option value="DuckDuckGo">DuckDuckGo</option>
          <option value="JiraToolkit">JiraToolkit</option>
          <option value="GmailToolkit(Still Testing)">
            GmailToolkit (Still Testing)
          </option>
          <option value="multiply">multiply</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Save Memory</label>
        <select
          name="save_memory"
          value={formData.save_memory}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto h-[90vh] relative custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <Icon path={mdiClose} size={1.2} />
        </button>
        <h2 className="text-xl font-bold mb-4 red-color">Create New Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4- flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700">Agent Type</label>
            <div className="flex space-x-4">
              {["Role-Based", "ReAct", "Legecy-ReAct"].map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      agent_type: type,
                      Backstory: type === "Role-Based" ? "" : prev.Backstory,
                      description:
                        type === "Role-Based" ? "" : prev.description,
                      Goal: type === "Role-Based" ? "" : prev.Goal,
                      id: "",
                      LLM:
                        type === "ReAct" || type === "Legecy-ReAct"
                          ? ""
                          : prev.LLM,
                      Prompt_Template:
                        type === "Role-Based" ? "" : prev.Prompt_Template,
                      Response_Template:
                        type === "Role-Based" ? "" : prev.Response_Template,
                      Role: "",
                      System_Template:
                        type === "Role-Based" ? "" : prev.System_Template,
                      Tools:
                        type === "ReAct" || type === "Legecy-ReAct"
                          ? ""
                          : prev.Tools,
                      save_memory: prev.save_memory,
                    }));
                  }}
                  className={
                    "cursor-pointer p-4 border rounded-lg text-center transition-all duration-300 editor-button"
                  }
                  style={{ padding: ".5rem" }}
                >
                  {type}
                </div>
              ))}
            </div>
          </div>

          {formData.agent_type === "Role-Based" && renderRoleBasedFields()}
          {(formData.agent_type === "ReAct" ||
            formData.agent_type === "Legecy-ReAct") &&
            renderReactLegecyFields()}

          <button
            type="submit"
            className="rounded-full shadow-md text-white hover:bg-sky-700 p-3 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl transition-all duration-300 m-auto disabled:cursor-not-allowed"
            disabled={!isAgentTypeSelected()}
          >
            Create Agent
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentFormModal;
