import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      
      {/* Header */}
      <header
        className="text-center mb-8 pb-6 border-b-2"
        style={{ borderColor: accentColor }}
      >
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="size-4" />
              <span className="break-all">
                {data.personal_info.linkedin}
              </span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="size-4" />
              <span className="break-all">
                {data.personal_info.website}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: accentColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700">
            {data.professional_summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
  <section className="mb-6">
    
    {/* Heading */}
    <h2
      className="text-xl font-semibold mb-4"
      style={{ color: accentColor }}
    >
      PROFESSIONAL EXPERIENCE
    </h2>

    {/* Experience List */}
    <div className="space-y-6">
      {data.experience.map((exp, index) => (
        <div key={index} className="flex gap-4">
          
          {/* Left Line */}
          <div
            className="w-[3px] rounded"
            style={{ backgroundColor: accentColor }}
          ></div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {exp.position}
                </h3>
                <p className="text-gray-600">
                  {exp.company}
                </p>
              </div>

              <p className="text-sm text-gray-500">
                {formatDate(exp.start_date)} -{" "}
                {exp.is_current ? "Present" : formatDate(exp.end_date)}
              </p>
            </div>

            {exp.description && (
              <p className="mt-2 text-gray-700 whitespace-pre-line">
                {exp.description}
              </p>
            )}
          </div>

        </div>
      ))}
    </div>
  </section>
)}

      {/* Projects */}
      {data.project?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          <div className="space-y-3">
            {data.project.map((proj, index) => (
              <div key={index} className="flex gap-2 items-start">
                <span style={{ color: accentColor }}>•</span>
                <div>
                  <p className="font-semibold">{proj.name}</p>
                  <p className="text-gray-600">
                    {proj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <h3 className="font-semibold">
                    {edu.degree}{" "}
                    {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">
                    {edu.institution}
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                  {formatDate(edu.graduation_date)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: accentColor }}
          >
            CORE SKILLS
          </h2>

          <div className="flex flex-wrap gap-3">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: accentColor + "20",
                  color: accentColor,
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;