// Sample "Principal's Desk" content, shown until each principal sends their own message.
import type { School } from "../types/school";

export function samplePrincipalMessage(s: School): string[] {
  if (s.story) {
    return [
      `Johar! A warm welcome to ${s.name}.`,
      `Our school started in ${s.established} with classes 1 to 5 and has grown step by step into a full +2 school, with Intermediate classes since 2017. In 2026 it was selected as a CM School of Excellence, and we are proud to carry this responsibility.`,
      `${s.story.objective} ${s.story.commitment}`,
      "I request parents to stay in touch with the class teachers, attend parent-teacher meetings and visit the school whenever needed. Together we can build a bright future for our children.",
    ];
  }
  return [
    `Johar! A warm welcome to ${s.name}.`,
    `As a CM School of Excellence, our aim is to give every child of ${s.block} and the nearby villages quality education, free of cost, with good classrooms, labs, a library and caring teachers.`,
    "We want our students to do well in studies and also grow in sports, culture, discipline and good values. Every child matters to us, and we work to make sure no child is left behind.",
    "I request parents to stay in touch with the class teachers, attend parent-teacher meetings and visit the school whenever needed. Together we can build a bright future for our children.",
  ];
}

export const PRINCIPAL_PRIORITIES = [
  { icon: "📖", title: "Learning in every class", text: "Strong basics in reading and maths, and regular practice for board classes." },
  { icon: "🛡️", title: "Safe, clean campus", text: "A safe, clean and inclusive school for every girl and boy." },
  { icon: "🏑", title: "Sports & culture", text: "Hockey, football, athletics, music and Jharkhand's folk traditions." },
  { icon: "🤝", title: "Parents as partners", text: "Regular PTMs and open communication with families." },
];
