// backend/src/services/coverLetter.service.ts

type CoverLetterInput = {
  name: string;
  skills: string[];
  experienceLevel: string;
  jobRole: string;
};

export const generateCoverLetter = (data: CoverLetterInput) => {
  const { name, skills, experienceLevel, jobRole } = data;

  const topSkills = skills.slice(0, 6).join(", ");

  let tone = "";

  if (experienceLevel === "Senior") {
    tone = "With extensive experience in building scalable systems and leading technical solutions";
  } else if (experienceLevel === "Fresher") {
    tone = "As a motivated computer science graduate eager to contribute to real-world projects";
  } else {
    tone = "With hands-on experience in software development and a strong technical foundation";
  }

  const letter = `
Dear Hiring Manager,

I am writing to express my interest in the ${jobRole} position.

${tone}, I have developed strong expertise in ${topSkills}, which align closely with the requirements of this role.

Throughout my academic and project experience, I have focused on building practical and scalable applications that solve real-world problems. I am particularly passionate about leveraging technology to create efficient and impactful solutions.

I am confident that my background in software development and my ability to quickly adapt to new technologies will allow me to contribute effectively to your team.

I would welcome the opportunity to further discuss how my skills and experience align with your needs.

Sincerely,  
${name}
  `.trim();

  return {
    coverLetter: letter,
    jobRole,
  };
};